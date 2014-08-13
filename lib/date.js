require('date-utils');

module.exports =
{
  activate: function(state)
  {
    atom.workspaceView.command("date:date", function() { insert(get("date")); });
    atom.workspaceView.command("date:time", function() { insert(get("time")); });
    atom.workspaceView.command("date:datetime", function() { insert(get("date")+" "+get("time")); });
  },
  configDefaults:
  {
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH24:MI",
  },
};

function insert(text)
{
  var editor=atom.workspace.getActiveEditor();
  editor.insertText(text);
}

function get(format)
{
  return new Date().toFormat(atom.config.get("date."+format+"Format"));
}
