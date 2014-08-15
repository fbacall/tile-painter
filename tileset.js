function TileSet(img, width, height) {
    this.img = img;
    this.tileWidth = width;
    this.tileHeight = height;

    this.selectedTile = [0,0]
}

TileSet.prototype.drawTile = function (ctx, tile, x, y) {
    ctx.drawImage(this.img, tile[0] * this.tileWidth, tile[1] * this.tileHeight,
                  this.tileWidth, this.tileHeight,
                  x * this.tileWidth, y * this.tileHeight,
                  this.tileWidth, this.tileHeight);
};

TileSet.prototype.selectTile = function (x, y) {

};