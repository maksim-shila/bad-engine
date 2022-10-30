import { Gamepad } from "./Gamepad";
import { XBoxGamepad } from "./XBoxGamepad";

export class GamepadManager {

    private _gamepads: Gamepad[] = [];

    public onGamepadConnected: (gamepad: Gamepad) => unknown = () => { };
    public onGamepadDisconnected: (gamepad: Gamepad) => unknown = () => { };

    constructor() {
        window.addEventListener("gamepadconnected", (e) => {
            const gamepad = new XBoxGamepad(e.gamepad.index);
            this._gamepads.push(gamepad);
            this.onGamepadConnected(gamepad);
        });
        window.addEventListener("gamepaddisconnected", (e) => {
            const gamepad = this._gamepads.find(gamepad => gamepad.index === e.gamepad.index);
            if (!gamepad) {
                return;
            }
            const index = this._gamepads.indexOf(gamepad);
            this._gamepads.splice(index, 1);
            this.onGamepadDisconnected(gamepad);
        });
    }

    public first(): Gamepad | null {
        return this._gamepads[0] ?? null;
    }

    public update(): void {
        this._gamepads.forEach(gamepad => gamepad.update());
    }
}