window.onload = function(){
	init(window.innerWidth, window.innerHeight, { backgroundColor: 0x000000 });
	var start=false;
	//localStorage.clear();
	//localStorage.removeItem('generate');
	var worldMoveX=0;
	var worldMoveY=0;
	var player=image(window.innerWidth/2-32.5,window.innerHeight/2-32.5,'images/playerN.png');
	player.zindex=75;
	var nrX=(window.innerWidth/2-32.5)/65;
	nrX=Math.floor(nrX);
	var nrY=(window.innerHeight/2-32.5)/65;
	nrY=Math.floor(nrY);
	var valueXadd=nrX*65;
	var valueYadd=nrY*65;
	var startX=window.innerWidth/2-32.5-valueXadd;
	//startX=Math.floor(startX);
	var startY=window.innerHeight/2-32.5-valueYadd;
	//startY=Math.floor(startY);
	var fon = rectangle(0,0,window.innerWidth,window.innerHeight,0x000000);
	fon.zindex = -101;
	var TheWorldLevel1=new Array;
	var TheWorldLevel0=new Array;
	var TheWorldMoveY=0;
	var moveY1=false;
	var moveY2=false;
	var TheWorldMoveX=0;
	onKeyDown(KEY_UP, function(){
		if(TheWorldLevel0[0][0].position.y<=player.position.y && moveY2==false){
			TheWorldMoveY=1.3;
			remove(player);
			player=image(window.innerWidth/2-32.5,window.innerHeight/2-32.5,'images/playerN.png');
			player.zindex=75;
			moveY1=true;
		}else{
			TheWorldMoveY=0;
		}
	});
	onKeyUp(KEY_UP, function(){
		if(moveY2==false){
			TheWorldMoveY=0;
			moveY1=false;
		}
	});
	onKeyDown(KEY_DOWN, function(){
		if(TheWorldLevel0[10][0].position.y>=player.position.y && moveY1==false){
			TheWorldMoveY=-1.3;
			remove(player);
			player=image(window.innerWidth/2-32.5,window.innerHeight/2-32.5,'images/playerS.png');
			player.zindex=75;
			moveY2=true;
		}else{
			TheWorldMoveY=0;
		}
	});
	onKeyUp(KEY_DOWN, function(){
		if(moveY1==false){
			TheWorldMoveY=0;
			moveY2=false;
		}
	});
	if(localStorage.getItem('generate')=='false' && start==false){
		load();
	}else if(start==false){
		generate();
	}
	function generate(){
		if(start==false){
		var boxX=startX;
		var boxY=startY;	
		for(i=0;i<=100;i++) {
			TheWorldLevel0[i]=new Array();
			for (j=0;j<=100;j++) {
				TheWorldLevel0[i][j]="hey";
			}
		}
		for(i=0;i<=100;i++) {
			TheWorldLevel1[i]=new Array();
			for (j=0;j<=100;j++) {
				TheWorldLevel1[i][j]="hey";
			}
		}
		localStorage.setItem('generate',false);
		var sk0;
		var sk1;
		for(var worldY=0;worldY<=10;worldY++){
			for(var worldX=0;worldX<=10;worldX++){
				sk0=(boxY*10+boxX)/10;
				sk1=sk0;
				var generatedTerain=Math.random()*100;
				if(generatedTerain<=15 && (boxX!=player.position.x && boxY!=player.position.y)){
					var grass=image(boxX,boxY,'images/grass1.png');
					grass.zindex=-100;
					var tree=image(boxX,boxY,'images/tree1.png');
					tree.zindex=100;
					localStorage.setItem(sk1,'tree1');
					TheWorldLevel0[worldY][worldX]=grass;
					TheWorldLevel1[worldY][worldX]=tree;
				}else if(generatedTerain<=18 && (boxX!=player.position.x && boxY!=player.position.y)){
					var stone=image(boxX,boxY,'images/stone1.png');
					stone.zindex=-100;
					var rock=image(boxX,boxY,'images/rock1.png');
					rock.zindex=50;
					localStorage.setItem(sk1,'rock1');
					TheWorldLevel0[worldY][worldX]=stone;
					TheWorldLevel1[worldY][worldX]=rock;
				}else if(generatedTerain<=20){
					var stone=image(boxX,boxY,'images/stone1.png');
					stone.zindex=-100;
					localStorage.setItem(sk0,'stone1');
					TheWorldLevel0[worldY][worldX]=stone;
				}else{
					var grass=image(boxX,boxY,'images/grass1.png');
					grass.zindex=-100;
					localStorage.setItem(sk0,'grass1');
					TheWorldLevel0[worldY][worldX]=grass;
				}
				boxX+=65;
			}
			boxX=startX;
			boxY+=65;
		}
		start=true;
		}
	}
	function load(){
		if(start==false){
		var boxX=startX;
		var boxY=startY;	
		for(i=0;i<=100;i++) {
			TheWorldLevel0[i]=new Array();
			for (j=0;j<=100;j++) {
				TheWorldLevel0[i][j]="hey";
			}
		}
		for(i=0;i<=100;i++) {
			TheWorldLevel1[i]=new Array();
			for (j=0;j<=100;j++) {
				TheWorldLevel1[i][j]="hey";
			}
		}
		var sk0;
		var sk1;
		for(var worldY=0;worldY<=10;worldY++){
			for(var worldX=0;worldX<=10;worldX++){
				sk0=(boxY*10+boxX)/10;
				sk1=sk0;
				var grass;
				var tree;
				var rock;
				var stone;
				if(localStorage.getItem(sk0)=='grass1'){
					grass=image(boxX,boxY,'images/grass1.png');
					grass.zindex=-100;
					TheWorldLevel0[worldY][worldX]=grass;
				}else if(localStorage.getItem(sk0)=='stone1'){
					stone=image(boxX,boxY,'images/stone1.png');
					stone.zindex=-100;
					TheWorldLevel0[worldY][worldX]=stone;
				}
				if(localStorage.getItem(sk1)=='tree1'){
					grass=image(boxX,boxY,'images/grass1.png');
					grass.zindex=-100;
					tree=image(boxX,boxY,'images/tree1.png');
					tree.zindex=100;
					TheWorldLevel0[worldY][worldX]=grass;
					TheWorldLevel1[worldY][worldX]=tree;
				}else if(localStorage.getItem(sk1)=='rock1'){
					stone=image(boxX,boxY,'images/stone1.png');
					stone.zindex=-100;
					rock=image(boxX,boxY,'images/rock1.png');
					rock.zindex=50;
					TheWorldLevel0[worldY][worldX]=stone;
					TheWorldLevel1[worldY][worldX]=rock;
				}
				boxX+=65;
			}
			boxX=startX;
			boxY+=65;
		}
		start=true;
		}
	}
	animate(function(){
		if(start==true){
			//playerY+=TheWorldMoveY*-1;
			for(var worldY=0;worldY<=10;worldY++){
				for(var worldX=0;worldX<=10;worldX++){
					moveBy(TheWorldLevel0[worldY][worldX],TheWorldMoveX,TheWorldMoveY);
					if(TheWorldLevel1[worldY][worldX]!='hey'){
						moveBy(TheWorldLevel1[worldY][worldX],TheWorldMoveX,TheWorldMoveY);
					}
				}
			}
		}
	});
};
