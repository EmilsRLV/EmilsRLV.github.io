//must replace speedX & speedY with speed. move only horiz., vetic., diag. 
//need to amke more universal

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = page_width-20;                         
        this.canvas.height = page_height-20;
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

function drawRect(width, height, color, x, y, drag, speed) {
    this.group= "neutral";
    this.width = width;                                             //this. gives a atribute to a variable if var = function 
    this.height = height;
    this.speed = speed;
    this.direction= 0;
    this.destinedX = [];
    this.destinedY = []; 
    this.x = x;
    this.y = y;
    this.drag = drag;
    this.target=false;
    this.update = function() {
        ctx = myGameArea.context;                                   //unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.fillRect(this.x*tile_size, this.y*tile_size, this.width*tile_size, this.height*tile_size);
        //saveData();
    }
    this.newPos = function() {
        if(this.direction==1){
            this.y -= Math.min(this.speed,Math.abs(this.y-this.destinedY[0]));
        }else if(this.direction==2){
            this.y -= Math.min(this.speed,Math.abs(this.y-this.destinedY[0]));
            this.x += Math.min(this.speed,Math.abs(this.x-this.destinedX[0]));
        }else if(this.direction==3){
            this.x += Math.min(this.speed,Math.abs(this.x-this.destinedX[0]));
        }else if(this.direction==4){
            this.y += Math.min(this.speed,Math.abs(this.y-this.destinedY[0]));
            this.x += Math.min(this.speed,Math.abs(this.x-this.destinedX[0]));
        }else if(this.direction==5){
            this.y += Math.min(this.speed,Math.abs(this.y-this.destinedY[0]));
        }else if(this.direction==6){
            this.y += Math.min(this.speed,Math.abs(this.y-this.destinedY[0]));
            this.x -= Math.min(this.speed,Math.abs(this.x-this.destinedX[0]));
        }else if(this.direction==7){
            this.x -= Math.min(this.speed,Math.abs(this.x-this.destinedX[0]));
        }else if(this.direction==8){
            this.y -= Math.min(this.speed,Math.abs(this.y-this.destinedY[0]));
            this.x -= Math.min(this.speed,Math.abs(this.x-this.destinedX[0]));
        }
        //this.speed*=(1-this.drag);
        this.hitBottom();
    }
    this.newTarget = function(runftoobj) {
        if(this.crashWith(runftoobj)>0){
            this.destinedX.push(runftoobj.x);
            this.destinedY.push(runftoobj.y);
            return;
        }
        this.direction=0;
    }
    this.setCourse = function() {// sets destination as my center
        var placeX=this.destinedX[0];
        var placeY=this.destinedY[0];
        if(this.isThere(placeX,placeY)==false){
            var vecX2=placeX;
            var vecY2=placeY;
            var vecX1=this.x;
            var vecY1=this.y;
            if(vecY1-vecY2<0){
                this.direction=5;
                if(vecX1-vecX2<0){
                    this.direction=4;
                }else if(vecX1-vecX2>0){
                    this.direction=6;
                }
            }else if(vecY1-vecY2>0){
                this.direction=1;
                if(vecX1-vecX2<0){
                    this.direction=2;
                }else if(vecX1-vecX2>0){
                    this.direction=8;
                }
            }else if(vecX1-vecX2<0){
                this.direction=3;
            }else if(vecX1-vecX2>0){
                this.direction=7;
            }else{
                this.direction=0;
            }
            return;
        }
        this.destinedX.splice(0, 1);
        this.destinedY.splice(0, 1);
        this.direction=0;
        return;
    }
    this.isThere = function(placeX,placeY){
        var centerX=this.x;
        var centerY=this.y;
        if((placeX>=centerX && placeX<=centerX+this.width) && (placeY>=centerY && placeY<=centerY+this.height)){
            return true;
        }
        return false;
    }
    this.hitBottom = function() {
        var rockbottom_y = myGameArea.canvas.height/tile_size - this.height;  //when defined with var always when called defined anew or the other way round
        var rockbottom_x = myGameArea.canvas.width/tile_size - this.width;
        if (this.y > rockbottom_y) {
            this.y = rockbottom_y;
        }else if(this.y < 0){
            this.y = 0;
        }
        if (this.x > rockbottom_x) {
            this.x = rockbottom_x;
        }else if(this.x < 0){
            this.x = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            return 0;
        }
        if ((mybottom >= othertop) && ((myright > otherleft && mybottom-othertop > myright-otherleft ) || (myleft < otherright && mybottom-othertop>otherright-myleft))) {
            if(otherobj.group=="unbreakable"){// need new function to check potential collisions 
                if(this.direction==5){
                    if(this.x-otherobj.x<otherobj.x+otherobj.width-this.x-this.width){
                        this.direction=7;
                    }else{
                        this.direction=3;
                    }
                }else if(this.direction==4){
                    this.direction=3;
                }else{
                    this.direction=7;
                }
            }
            return 1;
        }else if((mytop <= otherbottom) && ((myright > otherleft && otherbottom-mytop > myright-otherleft) || (myleft < otherright && otherbottom-mytop > otherright-myleft))){
            return 1;
        }else if ((myright >= otherleft) && ((mybottom > othertop && myright - otherleft>mybottom-othertop) || (mytop < otherbottom && myright - otherleft>otherbottom-mytop))) {
            return 2;
        }else if((myleft >= otherright) && ((mybottom > othertop && myleft - otherright>mybottom-othertop) || (mytop < otherbottom && myleft - otherright>otherbottom-mytop))){
            return 2;
        }
    }
}
