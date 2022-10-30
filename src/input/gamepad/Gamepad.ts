import { Input, InputType } from "../Input";

export class Gamepad extends Input {

    private _keys: string[];

    constructor(
        public readonly index: number,
        type: InputType,
        keys: string[]
    ) {
        super(type);
        this._keys = keys;
    }

    public get buttons(): readonly GamepadButton[] {
        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[this.index];
        return gamepad?.buttons ?? [];
    }

    public get axes(): readonly number[] {
        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[this.index];
        return gamepad?.axes ?? [];
    }

    public update(): void {
        const buttons = this.buttons;
        for (let i = 0; i < buttons.length; i++) {
            if (!this._keys[i]) {
                continue;
            }
            buttons[i].pressed ?
                this.onKeyDown(this._keys[i]) :
                this.onKeyUp(this._keys[i]);
        }
    }
}