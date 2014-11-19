var tileSet;
var map;
var tileWidth;
var tileHeight;
var img;
var tileData;
var canvas;
var ctx;
var selectedX = 0;
var selectedY = 0;
var mouseDown = false;

$(document).ready(function () {
    init();

    $('#tiles').click(function (e) {
        // Select tile
        var x = (e.pageX - $(this).offset().left) / tileSet.tileWidth | 0,
            y = (e.pageY - $(this).offset().top) / tileSet.tileHeight | 0;
        var selectedTile = $('#selected-tile');
        selectedTile.css('clip', 'rect(' +
                (y * tileSet.tileHeight) + 'px, ' +
                (x * tileSet.tileWidth + tileSet.tileWidth) + 'px, ' +
                (y * tileSet.tileHeight + tileSet.tileHeight) + 'px, ' +
                (x * tileSet.tileWidth) + 'px)');
        selectedTile.css('left', '-' + (x * tileSet.tileWidth) + 'px');
        selectedTile.css('top',  '-' + (y * tileSet.tileHeight) + 'px');
        var box = $('#selection-box');
        box.width(tileSet.tileWidth);
        box.height(tileSet.tileHeight);
        box.css({ marginTop: (y * tileSet.tileHeight), marginLeft: (x * tileSet.tileWidth)});

        tileSet.selectedTile = tileSet.tiles[x][y];
    });

    canvas.mousedown(function (e) {
        mouseDown = true;
        paintTile(e);
    });

    $(window).mouseup(function (e) {
        mouseDown = false;
    });

    canvas.mousemove(function (e) {
        if(mouseDown) {
            paintTile(e);
        } else {
            // Draw "ghost" tile
            var x = (e.pageX - canvas.offset().left) / tileSet.tileWidth | 0,
                y = (e.pageY - canvas.offset().top) / tileSet.tileHeight | 0;
            map.draw(ctx);
            tileSet.selectedTile.draw(ctx, x, y);
        }
    });

    $('#reset').click(function () {
        init();
    });
});

function init() {
    canvas = $('#canvas');
    ctx = canvas[0].getContext("2d");
    console.log("INIT");

    $('#status').html('Loading...');

    $.ajax({
        url: $('#tile-url').val(),
        success: function (data) {
            tileSet = TileSet.load(data);
            document.getElementById('selected-tile').src = tileSet.img.src;
            document.getElementById('tiles').src = tileSet.img.src;
            $('#status').html('');

            map = new Map(tileSet, (canvas.width() / tileSet.tileWidth) | 0, (canvas.height() / tileSet.tileHeight) | 0);
            map.draw(ctx);
        }
    });


    $('#selected-tile-container').css('width',tileWidth + 'px');
    $('#selected-tile-container').css('height',tileHeight + 'px');
}

function paintTile(e) {
    var x = (e.pageX - canvas.offset().left) / tileSet.tileWidth | 0,
        y = (e.pageY - canvas.offset().top) / tileSet.tileHeight | 0;
    map.tileData[x][y] = tileSet.selectedTile;
    map.draw(ctx);
}
