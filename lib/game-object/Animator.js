export class Animator {
    constructor(imageId, _width, _height, sw, sh) {
        this._width = _width;
        this._height = _height;
        this._frameX = 0;
        this._frameY = 0;
        this._fps = 60;
        this._frameInterval = 1000 / this._fps;
        this._currentFrameInterval = 0;
        this.animation = null;
        this._image = document.getElementById(imageId);
        this._sw = sw !== null && sw !== void 0 ? sw : this._width;
        this._sh = sh !== null && sh !== void 0 ? sh : this._height;
    }
    get fps() {
        return this._fps;
    }
    set fps(value) {
        this._fps = value;
        this._frameInterval = 1000 / this._fps;
    }
    update(frameTimer) {
        if (this.animation) {
            if (this._currentFrameInterval > this._frameInterval) {
                const nextFrame = this.animation.nextFrame;
                this._frameX = nextFrame.x;
                this._frameY = nextFrame.y;
                this._currentFrameInterval = 0;
            }
            else {
                this._currentFrameInterval += frameTimer.deltaTime;
            }
        }
    }
    draw(context, x, y) {
        context.drawImage(this._image, this._frameX * this._sw, this._frameY * this._sh, this._sw, this._sh, x, y, this._width, this._height);
    }
}
export class AnimationRow {
    constructor(_frameY, _framesXCount) {
        this._frameY = _frameY;
        this._framesXCount = _framesXCount;
        this._frameX = 0;
    }
    get nextFrame() {
        this._frameX = ++this._frameX % this._framesXCount;
        return {
            x: this._frameX,
            y: this._frameY
        };
    }
    get isMaxFrame() {
        return this._frameX === this._framesXCount - 1;
    }
    reset() {
        this._frameX = 0;
    }
}
