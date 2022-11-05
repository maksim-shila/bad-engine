import { KeyAction } from "./KeyAction";

export type InputType = "keyboard" | "xbox";

export abstract class Input {

    private _pressed: string[] = [];
    private _locked: string[] = [];

    constructor(public readonly type: InputType) {
    }

    public get pressed(): string[] {
        return this._pressed;
    }

    public keyDown(key: KeyAction | string): boolean {
        return this.getCodes(key).some(code =>
            this._pressed.includes(code) &&
            !this._locked.includes(code));
    }

    public anyKeyDown(keys: (KeyAction | string)[]): boolean {
        return keys.some(key => this.keyDown(key));
    }

    /**
     * If key down - returns true only on first call.
     * Next calls returns false until key released and pressed again.
     * This rule also applied to keyDown function.
     */
    public keyDownOnce(key: KeyAction | string): boolean {
        if (this.keyDown(key)) {
            const codes = this.getCodes(key);
            const codeToLock = codes.find(code => this._pressed.includes(code));
            if (codeToLock) {
                this._locked.push(codeToLock);
                return true;
            }
        }
        return false;
    }

    public keyUp(key: KeyAction | string): boolean {
        return !this.getCodes(key).some(code => this._pressed.includes(code));
    }

    protected onKeyDown(code: string): void {
        if (!this._pressed.includes(code)) {
            this._pressed.push(code);
        }
    };

    protected onKeyUp(code: string): void {
        this._pressed = this._pressed.filter(pressed => pressed !== code);
        this._locked = this._locked.filter(locked => locked !== code);
    };

    private getCodes(key: KeyAction | string): string[] {
        if (Object.prototype.hasOwnProperty.call(key, "name")) {
            const keyAction = key as KeyAction;
            return keyAction.getBindings(this.type);
        } else {
            return [key as string];
        }
    }
}