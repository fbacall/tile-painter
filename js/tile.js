function Tile(tileSet, posX, posY, name, passable) {
    this.tileSet = tileSet;
    this.name = name;
    this.passable = passable;
    this.pos = [posX, posY];
}

Tile.prototype.draw = function (ctx, x, y) {
    this.tileSet.drawTile(ctx, this.pos[0], this.pos[1], x, y);
};
