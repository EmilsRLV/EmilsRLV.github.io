var myGamePiece = [];
var myEnemy = [];
var myObstruction = [];
var pause = false;
function startGame() {
    page_width=$(window).width();
    page_height=$(window).height();
    myGameArea.start();
    var x=myGameArea.canvas.width/3;
    var y=myGameArea.canvas.height/3;
    myObstruction.push(new drawCircle("#F00000",40,x,y,0));
    myObstruction[0].group="unbreakable";
    //mapTiles[y][x]=1;
    for(i = 0; i < 1; i++){
    	myGamePiece.push(new drawRectShip("#FF0000",40,40,0,0+i*50,10));
    	myGamePiece[i].group="player1";
    	
    	x=Math.random()*(myGameArea.canvas.width-40);
    	y=Math.random()*(myGameArea.canvas.height-40);
    	myEnemy.push(new drawRectShip("#FFFF00",40,40, x, y,0));
    	myEnemy[i].group="player2";
    }
}



function updateGameArea() {
    if(pause==false){
       	for (j = 0; j < myGamePiece.length; j += 1) {
    		for (i = 0; i < myEnemy.length; i += 1) {
    		    if (myGamePiece[j].crashWith(myEnemy[i])>0) {
    		        myEnemy.splice(i, 1);
    		    }
    		}
        }
        for (j = 0; j < myGamePiece.length; j += 1) {
        	for (i = 0; i < myEnemy.length; i += 1) {
                if (myGamePiece[j].crashWith(myEnemy[i])>0) {
                    myEnemy.splice(i, 1);
                }
            }
            var destroyed = false;
            for (i = 0; i < myObstruction.length; i += 1) {
                if (myGamePiece[j].crashWith(myObstruction[i])>0) {
                    myGamePiece.splice(j, 1);
                    myObstruction.splice(i, 1);
                    destroyed=true;
                    break;
                }
            }
            if(destroyed==true){
                continue;
            }
            if(myGamePiece[j].destinedX.length!=0 && myGamePiece[j].destinedY.length!=0){
        		myGamePiece[j].setCourse(myGamePiece[j].destinedX[0],myGamePiece[j].destinedY[0]);
                
            } 

    		for (i = 0; i < myGamePiece.length; i += 1) {
                if(j==i)continue;
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
    }
}

function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var alpha=-1;
    if(x<0 || x>myGameArea.canvas.width || y<0 || y>myGameArea.canvas.height){
        return;
    }
    for (i = 0; i < myGamePiece.length; i += 1) {
        if(myGamePiece[i].x<x && myGamePiece[i].x+myGamePiece[i].width>x && myGamePiece[i].y<y && myGamePiece[i].y+myGamePiece[i].height>y){
            if(myGamePiece[i].selected==false){
                myGamePiece[i].selected=true;    
            }else{
                myGamePiece[i].selected=false;
                myGamePiece[i].alpha=false;
            }
            return;
        }
    }
    for (i = 0; i < myGamePiece.length; i += 1) {
        if(myGamePiece[i].selected==true){
    	    
            if(alpha==-1){
                alpha=i;
                myGamePiece[i].alpha=true;
                myGamePiece[i].destinedX.push(x);
                myGamePiece[i].destinedY.push(y);
            }else{
                myGamePiece[i].alpha=false;
                myGamePiece[i].destinedX.push(x+(myGamePiece[i].x-myGamePiece[alpha].x));
                myGamePiece[i].destinedY.push(y+(myGamePiece[i].y-myGamePiece[alpha].y));
            }
        }
    }
}

function cancelMove(event) {
    var x = event.which || event.keyCode;
    if(x==32){
    	for (i = 0; i < myGamePiece.length; i += 1) {
    		myGamePiece[i].destinedX.splice(0,1);
            myGamePiece[i].destinedY.splice(0,1);
    		myGamePiece[i].speedX=0;
            myGamePiece[i].speedY=0;
            myGamePiece[i].target=false;
            myGamePiece[i].selected=false;
            myGamePiece[i].alpha=false;
    	}
        
    }else if(x==112){
        if(pause==false){
            pause=true;
        }else{
            pause=false;
        }
        
    }
    //myGamePiece.newPos(); update somewhere else
}

function spawnplayer1(){
    myGamePiece.push(new drawRectShip("#FF0000",40,40,0,0+i*50,10));
    myGamePiece[i].group="player1";
}
function spawnplayer2(){
        
    x=Math.random()*(myGameArea.canvas.width-40);
    y=Math.random()*(myGameArea.canvas.height-40);
    myEnemy.push(new drawRectShip("#FFFF00",40,40, x, y,0));
    myEnemy[i].group="player2";
}