var myGamePiece = [];
var myEnemy = [];
var myObstruction = [];
var page_width,page_height;
var tile_size=2;
function startGame() {
    page_width=$(window).width();
    page_height=$(window).height();
    myGameArea.start();
    myObstruction.push(new drawRect(50,100,"#F00000",Math.floor(Math.floor(myGameArea.canvas.width/tile_size)/3),Math.floor(Math.floor(myGameArea.canvas.height/tile_size)/3),0,0));
    myObstruction[0].group="unbreakable";
    for(i = 0; i < 3; i++){
    	myGamePiece.push(new drawRect(50,50,"#FF0000",0,0+i*55,0,2));
    	myGamePiece[i].group="player1";
    	
    	var x=(Math.random()*(Math.floor(myGameArea.canvas.width/tile_size)-50));
    	var y=(Math.random()*(Math.floor(myGameArea.canvas.height/tile_size)-50));
    	myEnemy.push(new drawRect(50,50,"#FFFF00", x, y,0,0));
    	myEnemy[i].group="player2";
    }
}



function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
   	for (j = 0; j < myGamePiece.length; j += 1) {
		for (i = 0; i < myEnemy.length; i += 1) {
		    if (myGamePiece[j].crashWith(myEnemy[i])>0) {
		        myEnemy.splice(i, 1);
		    }
		}
    }
    for (j = 0; j < myGamePiece.length; j += 1) {
    	if(myGamePiece[j].destinedX.length!=0 && myGamePiece[j].destinedY.length!=0){
    		myGamePiece[j].setCourse(myGamePiece[j].destinedX[0],myGamePiece[j].destinedY[0]);
    	}  
    	myGamePiece[j].crashWith(myObstruction[0]);

		for (i = 0; i < myGamePiece.length; i += 1) {
		    if (myGamePiece[j].crashWith(myGamePiece[i])>0) {
		        
		    }
		}
    }
    myGameArea.clear();
    for (i = 0; i < myEnemy.length; i += 1) {
        //myEnemy[i].newPos();
        myEnemy[i].update();  
    }
    for (i = 0; i < myObstruction.length; i += 1) {
        //myEnemy[i].newPos();
        myObstruction[i].update();  
    }
    for (i = 0; i < myGamePiece.length; i += 1) {
    	
        myGamePiece[i].newPos();
        myGamePiece[i].update();  
    }
    myGameArea.frameNo += 1;
}

function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    for (i = 0; i < myGamePiece.length; i += 1) {
    	myGamePiece[i].destinedX.push(Math.floor(x/tile_size));
    	myGamePiece[i].destinedY.push(Math.floor(y/tile_size));
    }
}

function cancelMove(event) {
    var x = event.which || event.keyCode;
    if(x==32){
    	for (i = 0; i < myGamePiece.length; i += 1) {
    		myGamePiece[i].destinedX.splice(0,1);
    		myGamePiece[i].direction=0;
    	}
        
    }
    //myGamePiece.newPos(); update somewhere else
}