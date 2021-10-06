describe('date', () => {
  let workspaceElement;
  let activationPromise;

  beforeEach(async () => {
    jasmine.clock().mockDate(new Date('2021-02-05T06:03Z'));
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('date')
    atom.config.set('date.timeFormat', 'HH:mm');
    atom.config.set('date.dateFormat', 'DD-MM-YYYY');
    atom.config.set('date.datetimeFormat', '');
    atom.config.set('date.isLocalTimeZone', false);
    atom.config.set('date.prefix', '');
    atom.config.set('date.suffix', '');
    await atom.workspace.open();
  });

  it(':date', async () => {
    const textEditor = atom.workspace.getActiveTextEditor();
    await atom.commands.dispatch(workspaceElement, 'date:date');
    await activationPromise;
    expect(textEditor.getText()).toEqual('05-02-2021');
  });

  it(':time', async () => {
    const textEditor = atom.workspace.getActiveTextEditor();
    await atom.commands.dispatch(workspaceElement, 'date:time');
    await activationPromise;
    expect(textEditor.getText()).toEqual('06:03');
  });

  it(':datetime', async () => {
    const textEditor = atom.workspace.getActiveTextEditor();
    await atom.commands.dispatch(workspaceElement, 'date:datetime');
    await activationPromise;
    expect(textEditor.getText()).toEqual('05-02-2021 06:03');
  });

  describe('config', () => {
    it('config.timeFormat', async () => {
      atom.config.set('date.timeFormat', 'H');
      const textEditor = atom.workspace.getActiveTextEditor();
      await atom.commands.dispatch(workspaceElement, 'date:time');
      await activationPromise;
      expect(textEditor.getText()).toEqual('6');
    });

    it('config.dateFormat', async () => {
      atom.config.set('date.dateFormat', 'YYYY');
      const textEditor = atom.workspace.getActiveTextEditor();
      await atom.commands.dispatch(workspaceElement, 'date:date');
      await activationPromise;
      expect(textEditor.getText()).toEqual('2021');
    });

    it('config.dateTimeFormat', async () => {
      atom.config.set('date.dateTimeFormat', 'H YYYY');
      const textEditor = atom.workspace.getActiveTextEditor();
      await atom.commands.dispatch(workspaceElement, 'date:datetime');
      await activationPromise;
      expect(textEditor.getText()).toEqual('6 2021');
    });

    it('prefix + suffix', async () => {
      atom.config.set('date.prefix', '[');
      atom.config.set('date.suffix', ']');
      const textEditor = atom.workspace.getActiveTextEditor();
      await atom.commands.dispatch(workspaceElement, 'date:datetime');
      await activationPromise;
      expect(textEditor.getText()).toEqual('[05-02-2021 06:03]');
    });

    it('config.isLocalTimeZone', async () => {
      atom.config.set('date.isLocalTimeZone', false);
      const textEditor = atom.workspace.getActiveTextEditor();
      await atom.commands.dispatch(workspaceElement, 'date:datetime');
      await activationPromise;
      expect(textEditor.getText()).not.toEqual('05-02-2021 12:03');
    });
  })
});
