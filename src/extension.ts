// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var beautify = require('./index');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('wepy-template-formatter is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('wepy-template-formatter.format', (textEditor) => {
		// The code you place here will be executed every time your command is executed
		// only for language of vue
		if (textEditor.document.languageId !== 'vue') {
			return;
		}
		// editor text
		var text = textEditor.document.getText();
		// beautify code
		var code = beautify(text, !textEditor.options.insertSpaces, textEditor.options.tabSize, vscode.workspace.getConfiguration('wepyTemplateFormatter').isRootIndent);
		// edit
		textEditor.edit(function (editBuilder: any) {
			var document = textEditor.document;
			var lastLine = document.lineAt(document.lineCount - 1);
			var start = new vscode.Position(0, 0);
			var end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
			var range = new vscode.Range(start, end);
			editBuilder.replace(range, code);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
