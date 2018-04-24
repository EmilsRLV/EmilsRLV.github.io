function drawCircle(color, radius, x, y, speed) {
    this.group= "neutral";
    this.type= "circle";
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = speed;
    this.destinedX = [];
    this.destinedY = []; 
    this.x = x-8;
    this.y = y-8;
    this.radius = radius;
    this.target = false;
    this.selected = false;
    this.alpha = false;
    this.update = function() {
        ctx = myGameArea.context;                                   //unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x-8,this.y-8,this.radius,0,2*Math.PI);
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
            var vecX1 = this.x;
            var vecY1 = this.y;
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
        var centerX=this.x;
        var centerY=this.y;
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
        //var otherX = otherobj.x + otherobj.width/2;
        //var otherY = otherobj.y + otherobj.height/2;
        var crash = true;
        if (otherobj.type=="rect" && Math.abs(this.x-(otherobj.x + otherobj.width/2))>otherobj.width/2+this.radius || Math.abs(this.y-(otherobj.y + otherobj.height/2))>otherobj.height/2+this.radius) {
            crash = false;
        }else if (otherobj.type=="circle" && Math.abs(this.x-otherobj.x)>otherobj.radius+this.radius || Math.abs(this.y-otherobj.y)>otherobj.radius+this.radius) {
            crash = false;
        }
        return crash;
    }
}
