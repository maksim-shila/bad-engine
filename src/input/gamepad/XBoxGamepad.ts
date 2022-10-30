import { Gamepad } from "./Gamepad";

export const XBoxKey = {
    A: "A",
    B: "B",
    X: "X",
    Y: "Y",
    L1: "L1",
    R1: "R1",
    L2: "L2",
    R2: "R2",
    Select: "SELECT",
    Start: "START",
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT",
    Axe1: {
        Up: "AXE1_UP",
        Down: "AXE1_DOWN",
        Left: "AXE1_LEFT",
        Right: "AXE1_RIGHT"
    }
}

const XBoxKeys: string[] = [];
XBoxKeys[0] = XBoxKey.A;
XBoxKeys[1] = XBoxKey.B;
XBoxKeys[2] = XBoxKey.X;
XBoxKeys[3] = XBoxKey.Y;
XBoxKeys[4] = XBoxKey.L1;
XBoxKeys[5] = XBoxKey.R1;
XBoxKeys[6] = XBoxKey.L2;
XBoxKeys[7] = XBoxKey.R2;
XBoxKeys[8] = XBoxKey.Select;
XBoxKeys[9] = XBoxKey.Start;
XBoxKeys[12] = XBoxKey.Up;
XBoxKeys[13] = XBoxKey.Down;
XBoxKeys[14] = XBoxKey.Left;
XBoxKeys[15] = XBoxKey.Right;

const Axe1 = [XBoxKey.Axe1.Up, XBoxKey.Axe1.Down, XBoxKey.Axe1.Left, XBoxKey.Axe1.Right];

export class XBoxGamepad extends Gamepad {
    constructor(index: number) {
        super(index, "xbox", XBoxKeys)
    }

    public override update() {
        super.update();
        this.updateAxes(this.axes);
    }

    private updateAxes(axes: readonly number[]): void {
        const pressed = this.getAxesKeys(axes[0], axes[1]);
        Axe1.forEach(key => pressed.includes(key) ? this.onKeyDown(key) : this.onKeyUp(key));
    }

    private getAxesKeys(axeX: number, axeY: number): string[] {
        if (Math.sqrt(axeX * axeX + axeY * axeY) < 1) {
            return [];
        }
        if (axeX >= 0 && axeY >= 0) {
            if (axeX === 1)
                return [XBoxKey.Axe1.Right];
            if (axeY === 1)
                return [XBoxKey.Axe1.Down];
            return [XBoxKey.Axe1.Right, XBoxKey.Axe1.Down];
        } else if (axeX >= 0 && axeY <= 0) {
            if (axeX === 1)
                return [XBoxKey.Axe1.Right];
            if (axeY === -1)
                return [XBoxKey.Axe1.Up];
            return [XBoxKey.Axe1.Right, XBoxKey.Axe1.Up];
        } else if (axeX <= 0 && axeY <= 0) {
            if (axeX === -1)
                return [XBoxKey.Axe1.Left];
            if (axeY === -1)
                return [XBoxKey.Axe1.Up];
            return [XBoxKey.Axe1.Left, XBoxKey.Axe1.Up];
        } else if (axeX <= 0 && axeY >= 0) {
            if (axeX === -1)
                return [XBoxKey.Axe1.Left];
            if (axeY === 1)
                return [XBoxKey.Axe1.Down];
            return [XBoxKey.Axe1.Left, XBoxKey.Axe1.Down];
        }
        return [];
    }
}