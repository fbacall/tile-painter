function Map(tileSet, width, height) {
    this.tileSet = tileSet;

    // 2D array to hold tiles
    this.tileData = new Array(width);

    for(var i = 0; i < this.tileData.length; i++){
        this.tileData[i] = new Array(height);
    }

    // Initialise all tiles to [0,0]
    for(i = 0; i < this.tileData.length; i++){
        for(var j = 0; j < this.tileData[i].length; j++){
            this.tileData[i][j] = [0,0];
        }
    }
}

Map.prototype.draw = function (ctx, regionStartX, regionStartY, regionEndX, regionEndY) {
    regionStartX = regionStartX || 0;
    regionStartY = regionStartY || 0;
    regionEndX = regionEndX || this.tileData.length;
    regionEndY = regionEndY || this.tileData[0].length;
    for(var i = regionStartX; i < regionEndX; i++){
        for(var j = regionStartY; j < regionEndY; j++){
            this.tileSet.drawTile(ctx, this.tileData[i][j], i, j);
        }
    }
};