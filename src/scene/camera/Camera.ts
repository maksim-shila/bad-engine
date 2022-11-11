import { GameObject } from "../../game-object/GameObject";
import { BadMath } from "../../utils/BadMath";

class DeadZone {
    constructor(
        public x = Number.NEGATIVE_INFINITY,
        public y = Number.NEGATIVE_INFINITY,
        public rx = Number.POSITIVE_INFINITY,
        public ry = Number.POSITIVE_INFINITY
    ) { }
}

export enum FollowStrategy {
    Centered,
    Static
}

export class Camera {

    private _followed: GameObject | null = null;
    private _dx = 0;
    private _dy = 0;
    private _lastX = 0;
    private _lastY = 0;

    public vx = 0;
    public vxDelta = 0.5;
    public vy = 0;

    public deadZone: DeadZone = new DeadZone();
    public followStrategy: FollowStrategy = FollowStrategy.Centered;

    constructor(
        public x = 0,
        public y = 0,
        public readonly width = 0,
        public readonly height = 0
    ) { }

    public get rx(): number {
        return this.x + this.width;
    }

    public get ry(): number {
        return this.y + this.height;
    }

    public get cx(): number {
        return this.x + this.width * 0.5;
    }

    public get cy(): number {
        return this.y + this.width * 0.5;
    }

    public get dx(): number {
        return this._dx;
    }

    public get dy(): number {
        return this._dy;
    }

    public update(): void {
        if (!this._followed) {
            return;
        }

        switch (this.followStrategy) {
            case FollowStrategy.Centered:
                this.centerX();
                break;
            case FollowStrategy.Static:
                this.deadZone.y = this.y;
                this.deadZone.ry = this.ry;
                this.deadZone.x = this.x;
                this.deadZone.rx = this.rx;
                break;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.deadZone.x) {
            this.x = this.deadZone.x;
            this.vx = 0;
        }
        if (this.rx > this.deadZone.rx) {
            this.x = this.deadZone.rx - this.width;
            this.vx = 0;
        }
        if (this.y < this.deadZone.y) this.y = this.deadZone.y;
        if (this.ry > this.deadZone.ry) this.y = this.deadZone.ry - this.height;

        this._dx = this.x - this._lastX;
        this._dy = this.y - this._lastY;
        this._lastX = this.x;
        this._lastY = this.y;
    }

    public follow(gameObject: GameObject): void {
        this._followed = gameObject;
        if (this.followStrategy === FollowStrategy.Centered) {
            this.x = this._followed.cx - this.width * 0.5;
            this.y = this._followed.cy - this.height * 0.5;
        }
    }

    private centerX(): void {
        if (this._followed === null) {
            return;
        }
        const centerOffset = Math.floor(this._followed.cx - this.cx);
        if ((this.x === this.deadZone.x && centerOffset < 0) || (this.rx === this.deadZone.rx && centerOffset > 0)) {
            this.vx = 0;
            return;
        }
        if (this._followed.vx === 0) {
            const vx = this.vx * 0.8 + centerOffset * 0.01
            this.vx = BadMath.round(vx, 2);
        } else {
            this.vx += this._followed.vx * 0.05;
            if (Math.abs(this.vx) > Math.abs(this._followed.vx)) {
                const vx = this._followed.vx + centerOffset * 0.01
                this.vx = BadMath.round(vx, 2);
            }
        }
        if (Math.abs(this.vx) <= 0.01) {
            this.vx = 0;
            this.x = this._followed.cx - this.width * 0.5;
        }
    }
}