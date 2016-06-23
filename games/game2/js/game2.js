window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x000000 });
	var mp3='Black Bullet ed full.mp3';
	var music=new Sound(mp3);
	var start=false;
	//localStorage.clear();
	//localStorage.removeItem('generate');
	var worldMoveX=0;
	var worldMoveY=0;
	var player=image(0,0,'images/playerN.png');
	var playerY=0;
	var playerX=0;
	player.zindex=1;
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
			player=image(playerX,playerY,'images/playerN.png');
			player.zindex=1;
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
		alert(TheWorldLevel0[65][65].position.y);
		alert(TheWorldLevel0[65][65].position.x);
		if(TheWorldLevel0[1625][0].position.y>=player.position.y && moveY1==false){
			TheWorldMoveY=-1.3;
			remove(player);
			player=image(playerX,playerY,'images/playerS.png');
			player.zindex=1;
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
		for(i=0;i<1626;i++) {
			TheWorldLevel0[i]=new Array();
			for (j=0;j<1626;j++) {
				TheWorldLevel0[i][j]="hey";
			}
		}
		for(i=0;i<1626;i++) {
			TheWorldLevel1[i]=new Array();
			for (j=0;j<1626;j++) {
				TheWorldLevel1[i][j]="hey";
			}
		}
		localStorage.setItem('generate',false);
		var sk0;
		var sk1;
		for(var worldY=0;worldY<=1625;worldY+=65){
			for(var worldX=0;worldX<=1625;worldX+=65){
				sk0=(worldY*10+worldX)/10;
				sk1=sk0;
				var generatedTerain=Math.random()*100;
				if(generatedTerain<=15 && (worldY!=0 && worldX!=0)){
					var grass=image(worldX,worldY,'images/grass1.png');
					grass.zindex=-100;
					var tree=image(worldX,worldY,'images/tree1.png');
					tree.zindex=100;
					localStorage.setItem(sk1,'tree1');
					TheWorldLevel0[worldY][worldX]=grass;
					TheWorldLevel1[worldY][worldX]=tree;
				}else if(generatedTerain<=18 && (worldY!=0 && worldX!=0)){
					var stone=image(worldX,worldY,'images/stone1.png');
					stone.zindex=-100;
					var rock=image(worldX,worldY,'images/rock1.png');
					rock.zindex=99;
					localStorage.setItem(sk1,'rock1');
					TheWorldLevel0[worldY][worldX]=stone;
					TheWorldLevel1[worldY][worldX]=rock;
				}else if(generatedTerain<=20){
					var stone=image(worldX,worldY,'images/stone1.png');
					stone.zindex=-100;
					localStorage.setItem(sk0,'stone1');
					TheWorldLevel0[worldY][worldX]=stone;
				}else{
					var grass=image(worldX,worldY,'images/grass1.png');
					grass.zindex=-100;
					localStorage.setItem(sk0,'grass1');
					TheWorldLevel0[worldY][worldX]=grass;
				}
			}
		}
		start=true;
		}
	}
	function load(){
		if(start==false){
		for(i=0;i<1626;i++) {
			TheWorldLevel0[i]=new Array();
			for (j=0;j<1626;j++) {
				TheWorldLevel0[i][j]="hey";
			}
		}
		for(i=0;i<1626;i++) {
			TheWorldLevel1[i]=new Array();
			for (j=0;j<1626;j++) {
				TheWorldLevel1[i][j]="hey";
			}
		}
		var sk0;
		var sk1;
		for(var worldY=0;worldY<=1625;worldY+=65){
			for(var worldX=0;worldX<=1625;worldX+=65){
				sk0=(worldY*10+worldX)/10;
				sk1=sk0;
				var grass;
				var tree;
				var rock;
				var stone;
				if(localStorage.getItem(sk0)=='grass1'){
					grass=image(worldX,worldY,'images/grass1.png');
					grass.zindex=-100;
					TheWorldLevel0[worldY][worldX]=grass;
				}else if(localStorage.getItem(sk0)=='stone1'){
					stone=image(worldX,worldY,'images/stone1.png');
					stone.zindex=-100;
					TheWorldLevel0[worldY][worldX]=stone;
				}
				if(localStorage.getItem(sk1)=='tree1'){
					grass=image(worldX,worldY,'images/grass1.png');
					grass.zindex=-100;
					tree=image(worldX,worldY,'images/tree1.png');
					tree.zindex=100;
					TheWorldLevel0[worldY][worldX]=grass;
					TheWorldLevel1[worldY][worldX]=tree;
				}else if(localStorage.getItem(sk1)=='rock1'){
					stone=image(worldX,worldY,'images/stone1.png');
					stone.zindex=-100;
					rock=image(worldX,worldY,'images/rock1.png');
					rock.zindex=99;
					TheWorldLevel0[worldY][worldX]=stone;
					TheWorldLevel1[worldY][worldX]=rock;
				}
			}
		}
		start=true;
		}
	}
	animate(function(){
		if(start==true){
			music.play();
			//playerY+=TheWorldMoveY*-1;
			for(var worldY=0;worldY<=1625;worldY+=65){
				for(var worldX=0;worldX<=1625;worldX+=65){
					moveBy(TheWorldLevel0[worldY][worldX],TheWorldMoveX,TheWorldMoveY);
					if(TheWorldLevel1[worldY][worldX]!='hey'){
						moveBy(TheWorldLevel1[worldY][worldX],TheWorldMoveX,TheWorldMoveY);
					}
				}
			}
		}
	});
};
