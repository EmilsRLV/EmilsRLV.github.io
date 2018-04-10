function spawn(width, height, color, x, y) {
	this.target=false;
	this.destinationX = Math.random()*(myGameArea.canvas.width-100);
    this.destinationY = Math.random()*(myGameArea.canvas.height-100);
	this.width = width;												//this. gives a atribute to a variable if var = function 
    this.height = height;
    this.speedY = Math.random()*0.5; 
    this.speedX = Math.random()*0.5;
    this.x = x;
    this.y = y;
	this.update = function() {
        ctx = myGameArea.context;									//unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //saveData();
    }
    this.newPos = function(runftoobj) { // need function to check if collision on rout and functionif enemy in destined position
		if(this.target==true){
			this.setCourse(runftoobj)
		}
		this.x += this.speedX;
	    this.y += this.speedY;
	    this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom_y = myGameArea.canvas.height - this.height;	//when defined with var always when called defined anew or the other way round
        var rockbottom_x = myGameArea.canvas.width - this.width;
        if (this.y > rockbottom_y) {
            this.y = rockbottom_y;
            this.speedY *= -1;
        }else if(this.y < 0){
        	this.y = 0;
            this.speedY *= -1;
        }
        if (this.x > rockbottom_x) {
            this.x = rockbottom_x;
            this.speedX *= -1;
        }else if(this.x < 0){
        	this.x = 0;
            this.speedX *= -1;
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
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.setCourse = function(otherobj) {// sets destination as my center
    	var vecX1=otherobj.x+otherobj.width/2;
    	var vecY1=otherobj.y+otherobj.height/2;
    	var vecX2=this.x+this.width/2;
    	var vecY2=this.y+this.height/2;
    	this.speedY=vecY1-vecY2;
    	this.speedX=vecX1-vecX2;
    	var big=Math.max(Math.abs(this.speedY),Math.abs(this.speedX));
    	this.speedY=(this.speedY/big)*0.5;
    	this.speedX=(this.speedX/big)*0.5;
        
        /*var mytop = runfromobj.y;
    	var mybottom = mytop + (this.height);

    	var myleft = this.x+Math.abs(Math.abs(this.y-runfromobj.y)/0.5)*this.speedX;
        var myright = myleft + (this.width);
        
        
        var otherleft = runfromobj.x;
        var otherright = runfromobj.x + (runfromobj.width);
        var othertop = runfromobj.y;
        var otherbottom = runfromobj.y + (runfromobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            this.x += this.speedX;
	        this.y += this.speedY;
	        this.hitBottom();*/
        /*}else{
        	this.destinationX = Math.random()*(myGameArea.canvas.width-100);
    		this.destinationY = Math.random()*(myGameArea.canvas.height-100);
		    if(this.destinationY>this.y){
		    	this.speedY = 0.5; 
		    }else{
		    	this.speedY = -0.5;
		    }
		    this.speedX = Math.abs(this.destinationX-this.x)/(Math.abs(this.y-this.destinationY)/0.5) ;
		    if((this.destinationX>this.x && this.speedX<0) || (this.destinationX<this.x && this.speedX>0)){
		    	this.speedY *= -1; 
		    }
		    this.speedX = Math.abs(this.destinationX-x)/(Math.abs(y-this.destinationY)/0.5) ;
    		this.newPos(runfromobj);	
        }*/
    }
}
