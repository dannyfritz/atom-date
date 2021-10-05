const { CompositeDisposable } = require('atom');
const moment = require('moment');

module.exports = {
  subscriptions: null,

  activate: function() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add(
        'atom-workspace',
        {
          'date:date': function(event) {
            var editor = atom.workspace.getActiveTextEditor();
            insert(getOutput(getConfig('dateFormat')), editor);
          },
          'date:time': function(event) {
            var editor = atom.workspace.getActiveTextEditor();
            insert(getOutput(getConfig('timeFormat')), editor);
          },
          'date:datetime': function(event) {
            var format = getConfig('dateTimeFormat');
            if (!format) {
              var date = getConfig('dateFormat');
              var time = getConfig('timeFormat');
              format = `${date} ${time}`
            }
            var editor = atom.workspace.getActiveTextEditor();
            insert(getOutput(format), editor);
          },
        },
      ),
    );
  },

  deactivate: function () {
    this.subscriptions.dispose();
  },

  config: {
    timeFormat: {
      default: "HH:mm",
      type: "string",
      order: 0
    },
    dateFormat: {
      default: "DD-MM-YYYY",
      type: "string",
      order: 0
    },
    dateTimeFormat: {
      description: "If left blank, this will default to `Date Format + Time Format`",
      default: "",
      type: "string",
      order: 1
    },
    isLocalTimeZone: {
      description: "Show time in local time zone instead of UTC.",
      default: true,
      type: "boolean",
      order: 1
    },
    prefix: {
      default: "",
      type: "string",
      order: 2
    },
    suffix: {
      default: "",
      type: "string",
      order: 2
    }
  }
};

function insert(text, editor) {
  editor.insertText(text);
}

function getConfig(property) {
  return atom.config.get('date.' + property)
}

function getOutput(format) {
  var output;
  if (getConfig("isLocalTimeZone")) {
    output = moment().format(format);
  } else {
    output = moment.utc().format(format);
  }
  output = getConfig("prefix") + output + getConfig("suffix");
  return output;
}
