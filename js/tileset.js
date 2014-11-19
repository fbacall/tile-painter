function TileSet(img, width, height, tileData) {
    this.img = img;
    this.tileWidth = width;
    this.tileHeight = height;

    this.tiles = [];
    for(var i = 0; i < tileData.length; i++) {
        this.tiles[i] = [];
        for(var j = 0; j < tileData[i].length; j++) {
            this.tiles[i].push(new Tile(this, i, j, tileData[i][j].name, tileData[i][j].passable));
        }
    }

    this.selectedTile = this.tiles[0][0];
}

TileSet.prototype.drawTile = function (ctx, tilePosX, tilePosY, x, y) {
    ctx.drawImage(this.img, tilePosX * this.tileWidth, tilePosY * this.tileHeight,
                  this.tileWidth, this.tileHeight,
                  x * this.tileWidth, y * this.tileHeight,
                  this.tileWidth, this.tileHeight);
};

TileSet.prototype.selectTile = function (tile) {
    this.selectedTile = tile;
};

TileSet.load = function (data) {
    var img = new Image();
    img.src = data.url;
    return new TileSet(img, data.tileSize, data.tileSize, data.tileData);
};
