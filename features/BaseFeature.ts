import {App} from 'obsidian';

abstract class BaseFeature {
    protected app: App;
    
    constructor(app: App) {
        this.app = app;
    }

    abstract activate(): void;
    abstract deactivate(): void;
}

export default BaseFeature;