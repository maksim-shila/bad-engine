export class Collision {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this._direction = this.computeDirection();
    }
    other(self) {
        return this.left.parent === self ? this.right.parent : this.left.parent;
    }
    get direction() {
        return this._direction;
    }
    computeDirection() {
        const isLeft = this.right.x < this.left.x;
        const isTop = this.right.y < this.left.y;
        const collisionWidth = Math.floor(isLeft ? this.right.rx - this.left.x : this.left.rx - this.right.x);
        const collisionHeight = Math.floor(isTop ? this.right.ry - this.left.y : this.left.ry - this.right.y);
        if (collisionHeight <= Math.abs(this.left.parent.vy - this.right.parent.vy)) {
            return isTop ? "top" : "bottom";
        }
        if (collisionWidth <= Math.abs(this.left.parent.vx - this.right.parent.vx)) {
            return isLeft ? "left" : "right";
        }
        return "right";
    }
    equals(other) {
        return this.containsBoth(other.left, other.right);
    }
    containsBoth(left, right) {
        return this.left === left && this.right === right;
    }
}
