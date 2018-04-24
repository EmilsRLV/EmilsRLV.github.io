//must replace speedX & speedY with speed. move only horiz., vetic., diag. 
//need to amke more universal

var page_width,page_height;
var tile_size=40;
var mapTiles = [];
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = page_width-20;                         
        this.canvas.height = page_height-200;
        /*for(i=0;i<this.canvas.height/tile_size;i++){
            mapTiles[i] = [];
            for(j=0;j<this.canvas.width/tile_size;j++){
                mapTiles[i][j]=1;
            }
        }*/
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function textType(fontSize, font, color, x, y) {
    this.fontSize = fontSize;
    this.font = font; 
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.font = this.fontSize + " " + this.font;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
}
