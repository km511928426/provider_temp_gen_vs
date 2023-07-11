/*
 * @Author: cheng
 * @Version: 1.0
 * @Date: 2023-06-29 16:18:39
 * @LastEditors: cheng
 * @LastEditTime: 2023-07-11 16:40:57
 * @FilePath: \provider-temp-generator\src\extension.ts
 * @ObjectDescription: registerCommand
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { newProviderPage } from './commands/new-provider-page.command';
import { newProviderStatefulPage } from './commands/new-provider-stateful-page.command';
import { newProviderStatelessPage } from './commands/new-provider-stateless-page.command';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "provider-temp-generator" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('provider-temp-generator.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from provider_temp_generator!');
	// });

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.new-provider-page", newProviderPage),
		vscode.commands.registerCommand("extension.new-provider-stateful-page", newProviderStatefulPage),
		vscode.commands.registerCommand("extension.new-provider-stateless-page", newProviderStatelessPage),);


}

// This method is called when your extension is deactivated
export function deactivate() { }
