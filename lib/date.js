'use babel';
const dateFns = require('date-fns');

module.exports =
{
  activate: function(state)
  {
    atom.commands.add('atom-text-editor',
      {
        'date:date': function(event) {
          var editor = this.getModel();
          insert(getOutput(getConfig('date')), editor);
        },
        'date:time': function(event) {
          var editor = this.getModel();
          insert(getOutput(getConfig('time')), editor);
        },
        'date:datetime': function(event) {
          var format = getConfig('dateTime');
          if (!format) {
            var date = getConfig('date');
            var time = getConfig('time');
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
    }
  }
};

function insert(text, editor)
{
  editor.insertText(text);
}

function getConfig(property)
{
  return atom.config.get('date.'+property+'Format')
}

function getOutput(format)
{
  return dateFns.format(new Date(), format);
}
