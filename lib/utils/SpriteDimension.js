export class SpriteDimension {
    constructor(imageId, sw, sh, scale) {
        this.imageId = imageId;
        this.sw = sw;
        this.sh = sh;
        this.scale = scale;
        this.image = document.getElementById(imageId);
    }
    get width() {
        return Math.floor(this.sw * this.scale);
    }
    get height() {
        return Math.floor(this.sh * this.scale);
    }
}
