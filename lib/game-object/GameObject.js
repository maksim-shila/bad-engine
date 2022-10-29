import { Global } from "..";
export class GameObject {
    constructor(type, scene, width = 0, height = 0) {
        this.type = type;
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.GlobalType = "object";
        this._collider = null;
        this._rigidBody = null;
        this._animator = null;
        this._hitbox = null;
        this._destroyActions = [];
        this._destroyed = false;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.name = "unknown";
    }
    get hitbox() {
        return this._hitbox;
    }
    set hitbox(value) {
        this._hitbox = value;
    }
    get collider() {
        return this._collider;
    }
    set collider(value) {
        this._collider = value;
    }
    get rigidBody() {
        return this._rigidBody;
    }
    set rigidBody(value) {
        this._rigidBody = value;
    }
    get animator() {
        return this._animator;
    }
    set animator(value) {
        this._animator = value;
    }
    get onGround() {
        var _a, _b;
        return (_b = (_a = this.rigidBody) === null || _a === void 0 ? void 0 : _a.onGround) !== null && _b !== void 0 ? _b : false;
    }
    get weight() {
        var _a, _b;
        return (_b = (_a = this.rigidBody) === null || _a === void 0 ? void 0 : _a.weight) !== null && _b !== void 0 ? _b : 0;
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
        return this.y + this.height * 0.5;
    }
    get drawX() {
        var _a, _b;
        return this.x - ((_b = (_a = this.scene.camera) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0);
    }
    get drawY() {
        var _a, _b;
        return this.y - ((_b = (_a = this.scene.camera) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0);
    }
    get destroyed() {
        return this._destroyed;
    }
    onDestroy(callback) {
        this._destroyActions.push(callback);
    }
    destroy() {
        this._destroyed = true;
        this._destroyActions.forEach(action => action(this));
    }
    update(frameTimer) {
        var _a;
        (_a = this._animator) === null || _a === void 0 ? void 0 : _a.update(frameTimer);
    }
    draw(context) {
        var _a, _b, _c;
        (_a = this._animator) === null || _a === void 0 ? void 0 : _a.draw(context, this.drawX, this.drawY);
        if (Global.debug) {
            (_b = this._collider) === null || _b === void 0 ? void 0 : _b.draw(context);
            (_c = this._hitbox) === null || _c === void 0 ? void 0 : _c.draw(context);
        }
    }
    isOffscreen(directions = ["top", "bottom", "left", "right"]) {
        const _isOffscreen = (direction) => {
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
    isTouching(...directions) {
        const _isTouching = (direction) => {
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
    resetPosition(direction) {
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
    disallowOffscreen(direction) {
        if (this.isTouching(direction)) {
            this.resetPosition(direction);
        }
    }
}
