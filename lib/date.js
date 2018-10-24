'use babel';
const moment = require('moment');

module.exports =
{
  activate: function(state)
  {
    atom.commands.add('atom-text-editor',
      {
        'date:date': function(event) {
          var editor = this.getModel();
          insert(getOutput(getConfig('dateFormat')), editor);
        },
        'date:time': function(event) {
          var editor = this.getModel();
          insert(getOutput(getConfig('timeFormat')), editor);
        },
        'date:datetime': function(event) {
          var format = getConfig('dateTimeFormat');
          if (!format) {
            var date = getConfig('dateFormat');
            var time = getConfig('timeFormat');
            format = `${date} ${time}`
          }
          var editor = this.getModel();
          insert(getOutput(format), editor);
        }
      }
    );
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
    }
  }
};

function insert(text, editor)
{
  editor.insertText(text);
}

function getConfig(property)
{
  return atom.config.get('date.' + property)
}

function getOutput(format)
{
  if (getConfig("isLocalTimeZone")) {
    return moment().format(format);
  } else {
    return moment.utc().format(format);
  }
}
