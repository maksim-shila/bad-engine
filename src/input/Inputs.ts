import { GamepadManager } from "./gamepad/GamepadManager"
import { KeyboardInput } from "./Keyboard"

export const Inputs = {
    Keyboard: new KeyboardInput(),
    Gamepads: new GamepadManager()
}