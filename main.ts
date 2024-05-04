import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!


export default class MyPlugin extends Plugin {

	async onload() {
		console.log("onload");
	}

	onunload() {
		console.log("onunload");
	}
}