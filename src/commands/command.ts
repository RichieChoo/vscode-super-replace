import { commands, Disposable } from 'vscode';
import { showMessagePanel } from '../services/common/tools';

export abstract class Command extends Disposable {

    private _disposable: Disposable;

    constructor(protected command: string) {
        super(() => this.dispose());
        this._disposable = commands.registerCommand(command, this.executeCatch, this);
    }

    dispose() {
        this._disposable && this._disposable.dispose();
    }

    private executeCatch(...args: any[]): any {
        try {
            this.execute();
        } catch (error) {
            showMessagePanel(error);
        }
    }

    abstract execute(...args: any[]): any;

}

