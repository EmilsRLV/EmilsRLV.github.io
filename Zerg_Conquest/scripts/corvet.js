function spawnCorvet(x,y){
	this.group= "neutral";
    this.type="corvet";
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 10;
    this.destinedX = [];
    this.destinedY = []; 
    this.x = x;
    this.y = y;
    this.target = false;
    this.selected = false;
    this.alpha = false;
	var wings = [];
	var body = new drawRectShip("#FF0000",40,20,this.x-20,this.y-10,10,this.x-8,this.y-8);
	body.group="player1";
	wings.push(new drawRectShip("#FF0000",20,10,this.x+10,this.y-20,10,this.x-8,this.y-8));
	wings[0].group="player1";
	wings.push(new drawRectShip("#FF0000",20,10,this.x+10,this.y+10,10,this.x-8,this.y-8));
	wings[1].group="player1";
	this.x -= 8;
    this.y -= 8;
    this.deg=1;
	this.update = function() {
		if(this.alpha==true){
			body.alpha=true;
        	wings[0].alpha=true;
        	wings[1].alpha=true;
		}else{
			body.alpha=false;
        	wings[0].alpha=false;
        	wings[1].alpha=false;
		}
        body.update();
        wings[0].update();
        wings[1].update();
        //ctx.fillRect(this.x-8, this.y-8, this.width, this.height);
        //saveData();
    }
    this.rotate = function(){
    	body.rotate+=(-1);
        body.rotate=Math.abs(body.rotate);
    	wings[0].rotate+=(-1);
        wings[0].rotate=Math.abs(wings[0].rotate);
    	wings[1].rotate+=(-1);
        wings[1].rotate=Math.abs(wings[1].rotate);
    }
    this.unSelect = function() {
    	this.selected=false;
    	this.alpha=false;
    	body.selected=false;
    	wings[0].selected=false;
    	wings[1].selected=false;
    }
    this.onIt = function(x,y){
        if(body.x<x && body.x+body.width>x && body.y<y && body.y+body.height>y){
            if(body.selected==false){
                body.selected=true;  
                this.selected=true;  
            }else{
                body.selected=false;
                this.selected=false;
                body.alpha=false;
                this.alpha=false;
            }
            return true;
        }
        if(wings[0].x<x && wings[0].x+wings[0].width>x && wings[0].y<y && wings[0].y+wings[0].height>y){
            if(wings[0].selected==false){
                wings[0].selected=true;  
                this.selected=true;  
            }else{
                wings[0].selected=false;
                this.selected=false;
                wings[0].alpha=false;
                this.alpha=false;
            }
            return true;
        }
        if(wings[1].x<x && wings[1].x+wings[1].width>x && wings[1].y<y && wings[1].y+wings[1].height>y){
            if(wings[1].selected==false){
                wings[1].selected=true;  
                this.selected=true;  
            }else{
                wings[1].selected=false;
                this.selected=false;
                wings[1].alpha=false;
                this.alpha=false;
            }
            return true;
        }
    }
    this.newPos = function() {
        if(this.direction==0){
            return;
        }
        body.speedX = this.speedX;
        body.speedY = this.speedY;
        body.newPos();
    	wings[0].speedX = this.speedX;
    	wings[0].speedY = this.speedY;
        wings[0].newPos();
    	wings[1].speedX = this.speedX;
        wings[1].speedY = this.speedY;
        wings[1].newPos();
        this.y += this.speedY;
        this.x += this.speedX;
        //this.speed*=(1-this.drag);
        //this.hitBottom();
    }
    this.newTarget = function(runftoobj) {
        /*if(this.crashWith(runftoobj)>0){		make shooting target
            this.destinedX.push(runftoobj.x+runftoobj.width/2);
            this.destinedY.push(runftoobj.y+runftoobj.height/2);
        }*/
    }
    this.setCourse = function() {// sets destination as my center
        var placeX = this.destinedX[0];
        var placeY = this.destinedY[0];
        if(this.isThere(placeX,placeY)==false/* && this.target==false*/){
            var vecX1 = this.x;
            var vecY1 = this.y;
            this.speedX = placeX-vecX1;
            this.speedY = placeY-vecY1;
            var vector=(Math.sqrt(Math.pow(this.speedX,2)+Math.pow(this.speedY,2)))/this.maxSpeed;
            this.speedX /= vector;
            this.speedY /= vector;
            this.target = true;
           /* body.speedX = this.speedX;
            body.speedY = this.speedY;
        	wings[0].speedX = this.speedX;
        	wings[0].speedY = this.speedY;
        	wings[1].speedX = this.speedX;
        	wings[1].speedY = this.speedY;*/
            return;
        }else /*if(this.target==false)*/{
            this.speedX=0;
            this.speedY=0;
            /*body.speedX = 0;
            body.speedY = 0;
        	wings[0].speedX = 0;
        	wings[0].speedY = 0;
        	wings[1].speedX = 0;
        	wings[1].speedY = 0;*/
            this.destinedX.splice(0, 1);
            this.destinedY.splice(0, 1);
        }
        return;
    }
    this.isThere = function(placeX,placeY){
        if(body.isThere(placeX,placeY)==true){
            this.target=false;
            return true;
        }
        return false;
    }
    this.crashWith = function(otherobj) {
    	var crash = false;
        if(body.crashWith(otherobj) || wings[0].crashWith(otherobj) || wings[1].crashWith(otherobj))
        {
        	crash=true;
        }
        return crash;
    }
}
