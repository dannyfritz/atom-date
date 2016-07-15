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
            type: "string",
						order: 1
        },
        dateFormat: {
            default: "YYYY-MM-DD",
            type: "string",
						order: 2
        },
				prePadding: {
						default: "",
						type: "string",
						order: 3
				},
				postPadding: {
						default: "",
						type: "string",
						order: 6
				}
    }
};

function insert(text, editor)
{
	var prePadding = atom.config.get('date.prePadding').replace(/\\r\\n|\\n|\\r/g,"\r\n");
	var postPadding = atom.config.get('date.postPadding').replace(/\\r\\n|\\n|\\r/g,"\r\n");
	editor.insertText(prePadding);
	editor.insertText(text);
	editor.insertText(postPadding);
}

function get(format)
{
	return new Date().toFormat(atom.config.get('date.'+format+'Format'));
}
