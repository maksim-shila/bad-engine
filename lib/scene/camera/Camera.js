class DeadZone {
    constructor(x = Number.NEGATIVE_INFINITY, y = Number.NEGATIVE_INFINITY, rx = Number.POSITIVE_INFINITY, ry = Number.POSITIVE_INFINITY) {
        this.x = x;
        this.y = y;
        this.rx = rx;
        this.ry = ry;
    }
}
export var FollowStrategy;
(function (FollowStrategy) {
    FollowStrategy[FollowStrategy["Centered"] = 0] = "Centered";
})(FollowStrategy || (FollowStrategy = {}));
export class Camera {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._followed = null;
        this._dx = 0;
        this._dy = 0;
        this._lastX = 0;
        this._lastY = 0;
        this.deadZone = new DeadZone();
        this.followStrategy = FollowStrategy.Centered;
    }
    get rx() {
        return this.x + this.width;
    }
    get ry() {
        return this.y + this.height;
    }
    get cx() {
        return this.x + this.width * 0.5;
    }
    get cy() {
        return this.y + this.width * 0.5;
    }
    get dx() {
        return this._dx;
    }
    get dy() {
        return this._dy;
    }
    update() {
        if (!this._followed) {
            return;
        }
        switch (this.followStrategy) {
            case FollowStrategy.Centered:
                this.x = this._followed.cx - this.width * 0.5;
                this.y = this._followed.cy - this.height * 0.5;
                break;
        }
        if (this.x < this.deadZone.x)
            this.x = this.deadZone.x;
        if (this.rx > this.deadZone.rx)
            this.x = this.deadZone.x - this.width;
        if (this.y < this.deadZone.y)
            this.y = this.deadZone.y;
        if (this.ry > this.deadZone.ry)
            this.y = this.deadZone.ry - this.height;
        this._dx = this.x - this._lastX;
        this._dy = this.y - this._lastY;
        this._lastX = this.x;
        this._lastY = this.y;
    }
    follow(gameObject) {
        this._followed = gameObject;
    }
}
