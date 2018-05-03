function rotate(x,y,centerX,centerY,a){
        

      var x1=x-centerX; 
      var y1=y-centerY;
      var x2=x1*a[0][0]+y1*a[0][1];
      var y2=x1*a[1][0]+y1*a[1][1];
      var cords = {
          x: x+(x2-x1),
          y: y+(y2-y1)
      }
      return cords;
  }
function drawRectShip(color, width, height, x, y, speed,centerX,centerY) {
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
    
    var centerX=centerX;
    var centerY=centerY;


    this.corner1 = [
        [this.x-centerX], 
        [this.y-centerY],
    ];
    this.corner3 = [
        [this.x+this.width-centerX],
        [this.y+this.height-centerY],
    ];
    this.corner2 = [
        [this.x-centerX], 
        [this.y+this.height-centerY],
    ];
    this.corner4 = [
        [this.x+this.width-centerX], 
        [this.y-centerY],
    ];


    this.cornersX = [this.x,this.x,this.x+this.width,this.x+this.width];
    this.cornersY = [this.y,this.y+this.height,this.y+this.height,this.y];
    this.target = false;
    this.selected = false;
    this.alpha = false;
    this.rotate = 1;

    this.rotation = [
        [Math.cos((this.rotate%360)*(Math.PI/180)), -Math.sin((this.rotate%360)*(Math.PI/180))],
        [Math.sin((this.rotate%360)*(Math.PI/180)), Math.cos((this.rotate%360)*(Math.PI/180))]
    ];


    this.update = function() {
        ctx = myGameArea.context;                                   //unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.beginPath();
        var deg=this.rotate;
        var temp = rotate(this.cornersX[0],this.cornersY[0],centerX,centerY,this.rotation);
        this.cornersX[0]=temp.x;
        this.cornersY[0]=temp.y;
        ctx.moveTo(this.cornersX[0],this.cornersY[0]);
       /* this.corner1=multiplyMatrices(this.corner1,this.rotation);
        ctx.moveTo(this.corner1[0][0]+centerX,this.corner1[1][0]+centerY);

        this.corner2=multiplyMatrices(this.corner2,this.rotation);
        ctx.lineTo(this.corner2[0][0]+centerX,this.corner2[1][0]+centerY);

        this.corner3=multiplyMatrices(this.corner3,this.rotation);
        ctx.lineTo(this.corner3[0][0]+centerX,this.corner3[1][0]+centerY);

        this.corner4=multiplyMatrices(this.corner4,this.rotation);
        ctx.lineTo(this.corner4[0][0]+centerX,this.corner4[1][0]+centerY);
        

        */temp = rotate(this.cornersX[1],this.cornersY[1],centerX,centerY,this.rotation);
        this.cornersX[1]=temp.x;
        this.cornersY[1]=temp.y;
        ctx.lineTo(this.cornersX[1],this.cornersY[1]);
        temp = rotate(this.cornersX[2],this.cornersY[2],centerX,centerY,this.rotation);
        this.cornersX[2]=temp.x;
        this.cornersY[2]=temp.y;
        ctx.lineTo(this.cornersX[2],this.cornersY[2]);
        temp = rotate(this.cornersX[3],this.cornersY[3],centerX,centerY,this.rotation);
        this.cornersX[3]=temp.x;
        this.cornersY[3]=temp.y;
        ctx.lineTo(this.cornersX[3],this.cornersY[3]);
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
        this.cornersX[0]+= this.speedX;
        this.cornersX[1]+= this.speedX;
        this.cornersX[2]+= this.speedX;
        this.cornersX[3]+= this.speedX;


        this.cornersY[0]+= this.speedY;
        this.cornersY[1]+= this.speedY;
        this.cornersY[2]+= this.speedY;
        this.cornersY[3]+= this.speedY;
        this.y += this.speedY;
        this.x += this.speedX;

        centerX+= this.speedX;
        centerY+= this.speedY;
        /*this.corner1[0][0]+=this.speedX;
        this.corner1[1][0]+=this.speedY;
        this.corner2[0][0]+=this.speedX;
        this.corner2[1][0]+=this.speedY;
        this.corner3[0][0]+=this.speedX;
        this.corner3[1][0]+=this.speedY;
        this.corner4[0][0]+=this.speedX;
        this.corner4[1][0]+=this.speedY;*/
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
        if(this.isThere(placeX,placeY)==false/* && this.target==false*/){
            var vecX1 = this.x+this.width/2;
            var vecY1 = this.y+this.height/2;
            this.speedX = placeX-vecX1;
            this.speedY = placeY-vecY1;
            var vector=(Math.sqrt(Math.pow(this.speedX,2)+Math.pow(this.speedY,2)))/this.maxSpeed;
            this.speedX /= vector;
            this.speedY /= vector;
            this.target = true;
            return;
        }else/* if(this.target==false)*/{
            this.speedX=0;
            this.speedY=0;
            this.destinedX.splice(0, 1);
            this.destinedY.splice(0, 1);
        }
        return;
    }
    this.isThere = function(placeX,placeY){
        var centerX=this.x+this.width/2;
        var centerY=this.y+this.height/2;
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
    this.rotate = 0;
    this.update = function(centerX,centerY) {
        ctx = myGameArea.context;                                   //unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.beginPath();
        if(this.rotate != 0){
            var x=this.rotate*Math.PI/180;
            var y=(Math.PI/2)-x;
            var sinX=Math.sin(x);
            var cosX=Math.cos(x);
            var dis1=Math.sqrt(Math.pow(centerX-this.x,2)+Math.pow(centerY-this.y,2));
            var dis2=dis1/cosX;
            var dis3=dis1*sinX;
            var sinY=Math.sin(y);
            var cosY=Math.cos(y);
            var dis4=dis3/sinY;
            var dis5=dis3/cosY;
            ctx.moveTo(this.x-8+dis4,this.y-8+dis5);
            x=this.rotate*Math.PI/180;
            y=(Math.PI/2)-x;
            sinX=Math.sin(x);
            cosX=Math.cos(x);
            dis1=Math.sqrt(Math.pow(centerX-this.x,2)+Math.pow(centerY-this.y+this.height,2));
            dis2=dis1/cosX;
            dis3=dis1*sinX;
            sinY=Math.sin(y);
            cosY=Math.cos(y);
            dis4=dis3/sinY;
            dis5=dis3/cosY;
            ctx.lineTo(this.x-8+dis4,this.y-8+this.height+dis5);
            x=this.rotate*Math.PI/180;
            y=(Math.PI/2)-x;
            sinX=Math.sin(x);
            cosX=Math.cos(x);
            dis1=Math.sqrt(Math.pow(centerX-this.x+this.width,2)+Math.pow(centerY-this.y+this.height,2));
            dis2=dis1/cosX;
            dis3=dis1*sinX;
            sinY=Math.sin(y);
            cosY=Math.cos(y);
            dis4=dis3/sinY;
            dis5=dis3/cosY;
            ctx.lineTo(this.x-8+this.width+dis4,this.y-8+this.height+dis5);
            x=this.rotate*Math.PI/180;
            y=(Math.PI/2)-x;
            sinX=Math.sin(x);
            cosX=Math.cos(x);
            dis1=Math.sqrt(Math.pow(centerX-this.x+this.width,2)+Math.pow(centerY-this.y,2));
            dis2=dis1/cosX;
            dis3=dis1*sinX;
            sinY=Math.sin(y);
            cosY=Math.cos(y);
            dis4=dis3/sinY;
            dis5=dis3/cosY;
            ctx.lineTo(this.x-8+this.width+dis4,this.y-8+dis5);
        }else{
            ctx.moveTo(this.x-8,this.y-8);
            ctx.lineTo(this.x-8,this.y-8+this.height);
            ctx.lineTo(this.x-8+this.width,this.y-8+this.height);
            ctx.lineTo(this.x-8+this.width,this.y-8);
        }
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
        var centerY=this.y+this.height/2;
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