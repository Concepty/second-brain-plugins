import { App, Plugin, TFile, Notice } from 'obsidian';
import BaseFeature from './BaseFeature';

export interface DirectoryPair {
    projectDir: string;
    archiveDir: string;
}

export const TEST_DIRECTORY_PAIR: DirectoryPair = {
    projectDir: 'projects/',
    archiveDir: 'archives/'
}

export class ArchiveGenerator extends BaseFeature {
    private projectArchivePairs: DirectoryPair[] = [];

    constructor(app: App, pairs: DirectoryPair[] = []) {
        super(app);
        this.projectArchivePairs = pairs;
    }

    activate(): void {
        this.app.vault.on('create', this.handleNewProjectFile);
    }

    deactivate(): void {
        this.app.vault.off('create', this.handleNewProjectFile);
    }

    private handleNewProjectFile = (file: TFile): void => {
        for (const pair of this.projectArchivePairs) {
            // TODO: error case. files in subdirectory of projectDir
            if (file.path.startsWith(pair.projectDir)) {
                const newArchivePath = pair.archiveDir + "/" + file.basename;
                this.createArchiveDirectory(newArchivePath);
            }
        }
    };

    private async createArchiveDirectory(path: string): Promise<void> {
        if (!this.app.vault.getAbstractFileByPath(path)) {
            await this.app.vault.createFolder(path).catch(err => {
                new Notice('Error creating archive directory:' + err.message);
            });
        }
    }
}