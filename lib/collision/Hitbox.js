class SingleHitbox {
    constructor(name, collider) {
        this.name = name;
        this.collider = collider;
    }
    hasCollision(other) {
        return this.collider.hasCollision(other.collider);
    }
    draw(context) {
        this.collider.draw(context, "red");
    }
}
export class Hitbox {
    constructor(gameObject) {
        this._hitboxes = [];
        const collider = gameObject === null || gameObject === void 0 ? void 0 : gameObject.collider;
        if (collider) {
            this.add(collider);
        }
    }
    add(collider, name = "main") {
        const hitbox = new SingleHitbox(name, collider);
        const existing = this._hitboxes.find(h => h.name === hitbox.name);
        if (existing) {
            const index = this._hitboxes.indexOf(existing);
            this._hitboxes[index] = hitbox;
        }
        else {
            this._hitboxes.push(hitbox);
        }
    }
    hasCollision(other) {
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
    draw(context) {
        this._hitboxes.forEach(h => h.draw(context));
    }
}
