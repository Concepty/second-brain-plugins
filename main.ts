import { ArchiveGenerator, DirectoryPair, TEST_DIRECTORY_PAIR } from 'features/ArchiveGenerator';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface ArchiveGeneratorSettings {
	directoryPairs: DirectoryPair[];
}

const TEST_PLUGIN_SETTINGS: ArchiveGeneratorSettings = {
	directoryPairs: [TEST_DIRECTORY_PAIR]
}

export default class MyPlugin extends Plugin {
	settings: ArchiveGeneratorSettings;
	archiveGenerator: ArchiveGenerator;

	async onload() {
		await this.loadSettings();
		this.archiveGenerator = new ArchiveGenerator(this.app, this.settings.directoryPairs);
		this.archiveGenerator.activate();
	}

	onunload() {
		this.archiveGenerator.deactivate();
	}

	async loadSettings() {
		// TODO: let user gives settings
		// TODO: how to distinguish between settings for each feature
		this.settings = Object.assign({}, TEST_PLUGIN_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


