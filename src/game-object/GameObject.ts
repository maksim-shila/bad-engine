import { Animator, Collider, Collision, CollisionDirection, Frame, Global, Hitbox, RigidBody, Scene } from "..";

type Direction = "right" | "left" | "top" | "bottom";

export abstract class GameObject {

    public readonly GlobalType = "object";

    public collider: Collider | null = null;
    public rigidBody: RigidBody | null = null;
    public animator: Animator | null = null;
    public hitbox: Hitbox | null = null;

    private _destroyActions: ((self: GameObject) => unknown)[] = [];
    private _destroyed = false;

    public x = 0;
    public y = 0;
    public vx = 0;
    public vy = 0;
    public name = "unknown";

    constructor(
        public readonly type: string,
        public readonly scene: Scene,
        public width = 0,
        public height = 0
    ) { }

    public get onGround(): boolean {
        return this.rigidBody?.onGround ?? false;
    }

    public get weight(): number {
        return this.rigidBody?.weight ?? 0;
    }

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
        return this.y + this.height * 0.5;
    }

    public get drawX(): number {
        return this.x - (this.scene.camera?.x ?? 0);
    }

    public get drawY(): number {
        return this.y - (this.scene.camera?.y ?? 0);
    }

    public get destroyed(): boolean {
        return this._destroyed;
    }

    public onDestroy(callback: (self: GameObject) => unknown): void {
        this._destroyActions.push(callback);
    }

    public destroy(): void {
        this._destroyed = true;
        this._destroyActions.forEach(action => action(this));
    }

    public update(frame: Frame): void {
        this.animator?.update(frame);
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.animator?.draw(context, this.drawX, this.drawY);
        if (Global.debug) {
            this.collider?.draw(context);
            this.hitbox?.draw(context);
        }
    }

    public onCollisionEnter?(collision: Collision): void;
    public onCollision?(collision: Collision): void;
    public onObstacleCollisions?(directions: CollisionDirection[]): void;
    public onCollisionExit?(collision: Collision): void;

    public isOffscreen(directions: Direction[] = ["top", "bottom", "left", "right"]): boolean {
        const _isOffscreen = (direction: Direction): boolean => {
            switch (direction) {
                case "right":
                    return this.x > this.scene.camera.rx;
                case "left":
                    return this.x < this.scene.camera.x - this.width;
                case "bottom":
                    return this.y > this.scene.camera.ry;
                case "top":
                    return this.y < this.scene.camera.y - this.height;
            }
        };
        for (let i = 0; i < directions.length; ++i) {
            if (_isOffscreen(directions[i])) {
                return true;
            }
        }
        return false;
    }

    public isTouching(...directions: Direction[]): boolean {
        const _isTouching = (direction: Direction): boolean => {
            switch (direction) {
                case "right":
                    return this.x >= this.scene.camera.rx - this.width;
                case "left":
                    return this.x <= this.scene.camera.x;
                case "bottom":
                    return this.y >= this.scene.camera.ry - this.height;
                case "top":
                    return this.y <= this.scene.camera.y;
            }
        };
        for (let i = 0; i < directions.length; ++i) {
            if (_isTouching(directions[i])) {
                return true;
            }
        }
        return false;
    }

    public resetPosition(direction: Direction): void {
        switch (direction) {
            case "right":
                this.x = this.scene.camera.rx - this.width;
                this.vx = 0;
                break;
            case "left":
                this.x = this.scene.camera.x;
                this.vx = 0;
                break;
            case "bottom":
                this.y = this.scene.camera.ry - this.height;
                this.vy = 0;
                break;
            case "top":
                this.y = this.scene.camera.y;
                this.vy = 0;
                break;
        }
    }

    public disallowOffscreen(direction: Direction): void {
        if (this.isTouching(direction)) {
            this.resetPosition(direction);
        }
    }
}