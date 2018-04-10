var myGamePiece;
var myObstacles = [];
var myScore;
var enemyCount=2;
var page_width,page_height;

function startGame() {
    page_width=$(window).width();
    page_height=$(window).height();
	myGamePiece=new draw(200,200,"#FF0000",0,0);
	myGameArea.start();
	myGamePiece.update();
}

function draw(width, height, color, x, y) {
	this.width = width;												//this. gives a atribute to a variable if var = function 
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;   
    this.x = x;
    this.y = y;
	this.update = function() {
        ctx = myGameArea.context;									//unlike this. is only used in function and retains its value
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //saveData();
    }
    this.newPos = function() {
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
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = page_width;							
        this.canvas.height = page_height-200;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            //myGamePiece.speedX*=-1;
            //myGamePiece.speedY*=-1;
		if(myGamePiece.speedY!=0){
			if(myGamePiece.speedY>0){
				myGamePiece.speedY-=0.2;
			}else{
				myGamePiece.speedY+=0.2;
			}
		}
		if(myGamePiece.speedX!=0){
			if(myGamePiece.speedX>0){
				myGamePiece.speedX-=0.2;
			}else{
				myGamePiece.speedX+=0.2;
			}
		}
            myObstacles.splice(i, 1);
        } 
    }
    myGameArea.clear();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].newPos(myGamePiece);
        myObstacles[i].update();  
    }
    if(myObstacles.length==0){
        enemyCount++;
        while(enemyCount>myObstacles.length){
            
            myObstacles.push(new spawn(100, 100, "green", Math.random()*(myGameArea.canvas.width-100), Math.random()*(myGameArea.canvas.height-100)));
        }
    }
    myGameArea.frameNo += 1;
    /*if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }*/
    ///myScore.text="SCORE: " + myGameArea.frameNo;
    //myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}
function accelerate(event) {
    var x = event.which || event.keyCode;
	if(x==119){
		myGamePiece.speedY+=-0.1;
	}else if(x==100){
		myGamePiece.speedX+=0.1;
	}else if(x==115){
		myGamePiece.speedY+=0.1;
	}else if(x==97){
		myGamePiece.speedX+=-0.1;
	}
    //myGamePiece.newPos(); update somewhere else
}
