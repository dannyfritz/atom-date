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
        prePaddingMatchLineLength: {
            title: "Prepadding match line length",
            description: "Extend the first character of prepadding to match the\
						 following line length and insert a newline",
            default: false,
            type: "boolean",
            order: 4
        },
        postPadding: {
            default: "",
            type: "string",
            order: 5
        },
        postPaddingMatchLineLength: {
            title: "Postpadding match line length",
            description: "Insert a newline and extend the first character of\
						 postpadding to match the preceeding line length",
            default: false,
            type: "boolean",
            order: 6
        }
    }
};

function insert(text, editor) {
    var prePadding = atom.config.get('date.prePadding')
        .replace(/\\r\\n|\\n|\\r/g, "\r\n");
    var postPadding = atom.config.get('date.postPadding')
        .replace(/\\r\\n|\\n|\\r/g, "\r\n");

    if (atom.config.get("date.prePaddingMatchLineLength")) {
        editor.insertText(createPadding(prePadding.charAt(0), text.length) + "\r\n");
    } else {
        editor.insertText(prePadding);
    }
    editor.insertText(text);
    if (atom.config.get("date.postPaddingMatchLineLength")) {
        editor.insertText("\r\n" + createPadding(postPadding.charAt(0), text.length));
    } else {
        editor.insertText(postPadding);
    }
}

function createPadding(char, length) {
    var output = "";
    for (var i = 0; i < length; i++) {
        output += char;
    }
    return output;
}

function get(format)
{
	return new Date().toFormat(atom.config.get('date.'+format+'Format'));
}
