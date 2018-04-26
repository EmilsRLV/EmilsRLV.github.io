function rotate(deg,x,y,centerX,centerY){
    deg*=(Math.PI/180);
    var cosDeg=Math.cos(deg);
    var sinDeg=Math.sin(deg);
    var dis=Math.sqrt(Math.pow((centerX-x),2)+Math.pow((centerY-y),2));
    var dis2=dis/cosDeg;
    var dis3=dis2*sinDeg;
    var deg2=(Math.PI/2)-deg;
    var cosDeg2=Math.cos(deg2);
    var sinDeg2=Math.sin(deg2);
    var dis4=dis3*cosDeg2;
    var dis5=dis3*sinDeg2;
    var cords = {
        x: x+dis5,
        y: y+dis4
    }
    return cords;
}
function drawRectShip(color, width, height, x, y, speed) {
    this.group= "neutral";
    this.type="rect";
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = speed;
    this.destinedX = [];
    this.destinedY = []; 
    this.x = x-8;
    this.y = y-8;
    this.width = width;
    this.height = height;
    this.target = false;
    this.selected = false;
    this.alpha = false;
    this.update = function(centerX,centerY) {
        ctx = myGameArea.context;                                   //unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.beginPath();
        var temp = rotate(45,this.x-8,this.y-8,centerX,centerY);
        ctx.moveTo(temp.x,temp.y);
        var temp = rotate(45,this.x-8,this.y-8+this.height,centerX,centerY);
        ctx.lineTo(temp.x,temp.y);
        var temp = rotate(45,this.x-8+this.width,this.y-8+this.height,centerX,centerY);
        ctx.lineTo(temp.x,temp.y);
        var temp = rotate(45,this.x-8+this.width,this.y-8,centerX,centerY);
        ctx.lineTo(temp.x,temp.y);
        ctx.closePath();
        ctx.strokeStyle=color;
        if(this.alpha==true){
            ctx.strokeStyle="blue";
        }
        ctx.stroke();
        ctx.fill();
        //ctx.fillRect(this.x-8, this.y-8, this.width, this.height);
        //saveData();
    }
    this.newPos = function() {
        if(this.direction==0){
            return;
        }
        this.y += this.speedY;
        this.x += this.speedX;
        //this.speed*=(1-this.drag);
        //this.hitBottom();
    }
    this.newTarget = function(runftoobj) {
        if(this.crashWith(runftoobj)>0){
            this.destinedX.push(runftoobj.x+runftoobj.width/2);
            this.destinedY.push(runftoobj.y+runftoobj.height/2);
        }
    }
    this.setCourse = function() {// sets destination as my center
        var placeX = this.destinedX[0];
        var placeY = this.destinedY[0];
        if(this.isThere(placeX,placeY)==false && this.target==false){
            var vecX1 = this.x+this.width/2;
            var vecY1 = this.y+this.height/2;
            this.speedX = placeX-vecX1;
            this.speedY = placeY-vecY1;
            var vector=(Math.sqrt(Math.pow(this.speedX,2)+Math.pow(this.speedY,2)))/this.maxSpeed;
            this.speedX /= vector;
            this.speedY /= vector;
            this.target = true;
            return;
        }else if(this.target==false){
            this.speedX=0;
            this.speedY=0;
            this.destinedX.splice(0, 1);
            this.destinedY.splice(0, 1);
        }
        return;
    }
    this.isThere = function(placeX,placeY){
        var centerX=this.x+this.width/2;
        var centerY=this.y+this.width/2;
        if(placeX>centerX-5 && placeX<centerX+5 && placeY>centerY-5 && placeY<centerY+5){
            this.target=false;
            return true;
        }
        return false;
    }
    this.hitBottom = function() {
        var rockbottom_y = myGameArea.canvas.height - this.height;  //when defined with var always when called defined anew or the other way round
        var rockbottom_x = myGameArea.canvas.width - this.width
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
        var crash = true;
        if (otherobj.type=="rect" && ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright))) {
            crash = false;
        }else if (otherobj.type=="circle" && (Math.abs((this.x+this.width/2)-otherobj.x)>this.width/2+otherobj.radius || Math.abs((this.y+this.height/2)-otherobj.y)>this.height/2+otherobj.radius)) {
            crash = false;
        }
        return crash;
    }
}


function drawRectObject(color, width, height, x, y, speed) {
    this.group= "neutral";
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = speed;
    this.destinedX = [];
    this.destinedY = []; 
    this.x = x-8;
    this.y = y-8;
    this.width = width;
    this.height = height;
    this.target = false;
    this.selected = false;
    this.alpha = false;
    this.update = function() {
        ctx = myGameArea.context;                                   //unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(this.x-8,this.y-8);
        ctx.lineTo(this.x-8,this.y-8+this.height);
        ctx.lineTo(this.x-8+this.width,this.y-8+this.height);
        ctx.lineTo(this.x-8+this.width,this.y-8);
        ctx.closePath();
        ctx.strokeStyle=color;
        if(this.alpha==true){
            ctx.strokeStyle="blue";
        }
        ctx.stroke();
        ctx.fill();
        //ctx.fillRect(this.x-8, this.y-8, this.width, this.height);
        //saveData();
    }
    this.newPos = function() {
        if(this.direction==0){
            return;
        }
        this.y += this.speedY;
        this.x += this.speedX;
        //this.speed*=(1-this.drag);
        //this.hitBottom();
    }
    this.newTarget = function(runftoobj) {
        if(this.crashWith(runftoobj)>0){
            this.destinedX.push(runftoobj.x+runftoobj.width/2);
            this.destinedY.push(runftoobj.y+runftoobj.height/2);
        }
    }
    this.setCourse = function() {// sets destination as my center
        var placeX = this.destinedX[0];
        var placeY = this.destinedY[0];
        if(this.isThere(placeX,placeY)==false && this.target==false){
            var vecX1 = this.x+this.width/2;
            var vecY1 = this.y+this.height/2;
            this.speedX = placeX-vecX1;
            this.speedY = placeY-vecY1;
            var vector=(Math.sqrt(Math.pow(this.speedX,2)+Math.pow(this.speedY,2)))/this.maxSpeed;
            this.speedX /= vector;
            this.speedY /= vector;
            this.target = true;
            return;
        }else if(this.target==false){
            this.speedX=0;
            this.speedY=0;
            this.destinedX.splice(0, 1);
            this.destinedY.splice(0, 1);
        }
        return;
    }
    this.isThere = function(placeX,placeY){
        var centerX=this.x+this.width/2;
        var centerY=this.y+this.width/2;
        if(placeX>centerX-5 && placeX<centerX+5 && placeY>centerY-5 && placeY<centerY+5){
            this.target=false;
            return true;
        }
        return false;
    }
    this.hitBottom = function() {
        var rockbottom_y = myGameArea.canvas.height - this.height;  //when defined with var always when called defined anew or the other way round
        var rockbottom_x = myGameArea.canvas.width - this.width
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
        var crash = true;
        if (otherobj.type=="rect" && ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright))) {
            crash = false;
        }else if (otherobj.type=="circle" && (Math.abs((this.x+this.width/2)-otherobj.x)>this.width/2+otherobj.radius || Math.abs((this.y+this.height/2)-otherobj.y)>this.height/2+otherobj.radius)) {
            crash = false;
        }
        return crash;
    }
}
