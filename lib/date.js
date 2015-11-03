'use babel';
require('date-utils');

module.exports =
{
	activate: function(state)
	{
		atom.commands.add('atom-text-editor',
			{
				'date:date': function(event) {
					var editor = this.getModel();
					insert(get('date'), editor);
				},
				'date:time': function(event) {
					var editor = this.getModel();
					insert(get('time'), editor);
				},
				'date:datetime': function(event) {
					var date = get('date');
					var time = get('time');
					var editor = this.getModel();
					insert(`${date} ${time}`, editor);
				}
			}
		);
	},
    config: {
        timeFormat: {
            default: "HH24:MI",
            type: "string"
        },
        dateFormat: {
            default: "YYYY-MM-DD",
            type: "string"
        }
    }
};

function insert(text, editor)
{
	editor.insertText(text);
}

function get(format)
{
	return new Date().toFormat(atom.config.get('date.'+format+'Format'));
}
