import { GameObject } from "../game-object/GameObject";
import { Collider } from "./Collider";

class SingleHitbox {
    constructor(
        public readonly name: string,
        public readonly collider: Collider
    ) { }

    public hasCollision(other: SingleHitbox): boolean {
        return this.collider.hasCollision(other.collider);
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.collider.draw(context, "red");
    }
}

export class Hitbox {

    private readonly _hitboxes: SingleHitbox[] = [];
    private _mirror: Hitbox | null = null;

    constructor(private readonly _gameObject?: GameObject) {
        const collider = this._gameObject?.collider;
        if (collider) {
            this.add(collider);
        }
    }

    public get mirror(): Hitbox {
        if (this._mirror === null) {
            const hitbox = new Hitbox(this._gameObject);
            hitbox._mirror = this;
            this._hitboxes.forEach(child => {
                hitbox.add(child.collider.mirror, child.name);
            });
            this._mirror = hitbox;
        }
        return this._mirror;
    }

    public add(collider: Collider, name = "main") {
        const hitbox = new SingleHitbox(name, collider);
        const existing = this._hitboxes.find(h => h.name === hitbox.name);
        if (existing) {
            const index = this._hitboxes.indexOf(existing);
            this._hitboxes[index] = hitbox;
        } else {
            this._hitboxes.push(hitbox);
        }
    }

    public hasCollision(other: Hitbox | null) {
        if (other === null) {
            return false;
        }
        for (let i = 0; i < this._hitboxes.length; ++i) {
            for (let j = 0; j < other._hitboxes.length; ++j) {
                const thisHitbox = this._hitboxes[i];
                const otherHitbox = other._hitboxes[j];
                if (thisHitbox.hasCollision(otherHitbox)) {
                    return true;
                }
            }
        }
        return false;
    }

    public draw(context: CanvasRenderingContext2D) {
        this._hitboxes.forEach(h => h.draw(context));
    }
}