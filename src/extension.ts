'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    registerOpenSearchCommand(context)
    registerExactPackageCommand(context)
}

function registerOpenSearchCommand(context: vscode.ExtensionContext)
{
    let disposable = vscode.commands.registerCommand('extension.openNuGetPackageSearch', () => {
        vscode.window.showInputBox({
            prompt: "input words for searching nuget package"
        })
        .then(value => {
            if(value == null || value == "")
            {
                // return vscode.window.showInformationMessage("open cancelled")
                return
            }
            let uri = vscode.Uri.parse(
                "https://www.nuget.org/packages?q=" 
                    + encodeURI(value.replace(" ","+").replace("\t","+"))
                )
            return vscode.commands.executeCommand('vscode.open',uri)
                .then(value => {
                    vscode.window.showInformationMessage("open success")
                })
        })
        .then(value => {
        },
        reason => {
            vscode.window.showErrorMessage("open failed:" + reason)
        })
    });

    context.subscriptions.push(disposable);
}

function registerExactPackageCommand(context: vscode.ExtensionContext)
{
    let disposable = vscode.commands.registerCommand('extension.openExactNuGetPackage', () => {
        vscode.window.showInputBox({
            prompt: "input nuget package id"
        })
        .then(value => {
            if(value == null || value == "")
            {
                // return vscode.window.showInformationMessage("open cancelled")
                return
            }
            let uri = vscode.Uri.parse(
                "https://www.nuget.org/packages/" 
                    + encodeURI(value)
                )
            return vscode.commands.executeCommand('vscode.open',uri)
                .then(value => {
                    vscode.window.showInformationMessage("open success")
                })
        })
        .then(value => {
        },
        reason => {
            vscode.window.showErrorMessage("open failed:" + reason)
        })
    });

    context.subscriptions.push(disposable);
}
// this method is called when your extension is deactivated
export function deactivate() {
}