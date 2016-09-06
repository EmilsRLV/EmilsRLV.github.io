window.onload = function(){
    init(window.innerWidth, window.innerHeight, { backgroundColor: 0x000000 });
	alert("'W' - move up 'S' - move down 'SPACE' shoot 'L' shoot Missle 'A' move slower 'D' move faster 'P' pause GOAL is to hit enemys/lasers");
	var backElement2 = image(window.innerWidth/2-87.5, window.innerHeight/2-100, 'images/button1.png');
	var game=false;
	var level0=true, level1=false, level2=false, level3=false;
	var shop=false;
	var shipX, shipY, shipMove;
	var ship;
	//var music=new Sound('');
	//localStorage.clear();
	var gameSound=[];
	var laserShot = [], lastShot, lastShotMis;
	var POWER, lastCharge, coold;
	var laserEnShot = [], lastEnShot = [];
	var enemy = [], lastEnMade, enemyMoveY = [], enspTime;
	var now,lastTimeCh;
	var boostDual=false, dualTime, dualTimer;
	var bomb;
	var spark;
	var energy;
	var rezEn, recordeEn;
	var handler, handler1;
	var enemymSpeed;
	var boost = [], HP = [];
	var recoil;
	var HPtime;
	var shooting=false,shootingMis=false;
	var fon = image(0, 0, 'images/stars1.png');
	fon.zindex = -1;
	var fon1 = image(fon.position.x+window.innerWidth, 0, 'images/stars2.png');
	fon1.zindex = -1;
	var shieldPOW;
	var shield = [], shieldEn = [], shieldEnCount=0;
	var starTurn=true;
	var galaxySpeed=1;
	var speedBuff=false;
	var speedDeBuff=false;
	var newHighEn=false;
	var laserColision;
	var POWERlength;
	var POWERlenOne;
	var POWERnr=0;
	var dis=0,disBest=0;
	var newHighDis=false;
	var missle = [];
	var pause=false,pauseing=false;
	onClick(backElement2, function(){
		//music.play();
		remove(backElement2);
		shieldPOW = text(window.innerWidth/2+80, window.innerHeight*0.95, "SHIELD:", { font: '24px arial', fill: 0xffffff });
		if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
			shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399));
		}
		if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
			shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399));
		}
		if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
			shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399));
		}
		shipX=window.innerWidth/20;
		shipY=window.innerHeight/2-80;
		shipMove=0;
		ship = image(shipX, shipY, 'images/shipSH.png');
		ship.zindex = 99;
		lastShot = new Date().getTime();
		lastShotMis = new Date().getTime();
		lastCharge = new Date().getTime();
		dualTimer = new Date().getTime();
		lastTimeCh = new Date().getTime();
		coold=1100;
		lastEnMade =0;
		enspTime=4000;
		boostDual=false;
		bomb = image(-100, -100, 'images/explosion.png');
		bomb.zindex = 101;
		spark = image(-100, -100, 'images/spark1.png');
		spark.zindex = 101;
		energy = text(5, window.innerHeight*0.95, "POWER:", { font: '24px arial', fill: 0xffffff });
		POWERlength = window.innerWidth/2+80-106;
		POWERlenOne = POWERlength/20;
		POWER = rectangle(-100,-100,10,10,0x3366ff);
		rezEn=0;
		recordeEn=0;
		enemymSpeed=-3.75;
		dualTime = 0;
		recoil=280;
		HPtime = new Date().getTime();
		game=true;
	});
	onKeyDown(KEY_UP, function(){
		if(game==true){
			if(shipY>=30){
				shipMove=-5*galaxySpeed;
			}
		}
	});
	onKeyUp(KEY_UP, function(){
		if(game==true){
			if(shipY>=30){
				shipMove=0;
			}
		}
	});
	onKeyDown(KEY_DOWN, function(){
		if(game==true){
			if(shipY+130<=window.innerHeight){
				shipMove=5*galaxySpeed;
			}
		}
	});
	onKeyUp(KEY_DOWN, function(){
		if(game==true){
			if(shipY+110<=window.innerHeight){
				shipMove=0;
			}
		}
	});
	onKeyDown(KEY_LEFT, function(){
		if(game==true && speedBuff==false){
			speedDeBuff=true;
			galaxySpeed=0.75;
		}
	});
	onKeyUp(KEY_LEFT, function(){
		if(game==true && speedBuff==false){
			speedDeBuff=false;
			galaxySpeed=1;
		}
	});
	onKeyDown(KEY_RIGHT, function(){
		if(game==true && speedDeBuff==false){
			speedBuff=true;
			galaxySpeed=1.75;
		}
	});
	onKeyUp(KEY_RIGHT, function(){
		if(game==true && speedDeBuff==false){
			speedBuff=false;
			galaxySpeed=1;
		}
	});
	onKeyDown(KEY_SPACEBAR, function(){
		if(game==true){
			shooting=true;
		}
	});
	onKeyUp(KEY_SPACEBAR, function(){
		if(game==true){
			shooting=false;
		}
	});
	onKeyDown(KEY_L, function(){
		if(game==true){
			shootingMis=true;
		}
	});
	onKeyUp(KEY_L, function(){
		if(game==true){
			shootingMis=false;
		}
	});
	onKeyDown(KEY_P, function(){
		if(game==false && pause==true & pauseing==false){
			game=true;
			pause=false;
		}else if(game==true && pause==false){
			game=false;
			pause=true;
			puseing=true;
		}
	});
	onKeyUp(KEY_L, function(){
		if(game==false && pause==true){
			pauseing=false;
		}
	});
	function shoot(){
		if(game==true){
			if(boostDual==true){
				var l = rectangle(ship.position.x+66, ship.position.y+2, 20, 3, 0x3366ff);
				l.zindex = 102;
				laserShot.push(l);;
				l = rectangle(ship.position.x+66, ship.position.y+63, 20, 3, 0x3366ff)
				l.zindex = 102;
				laserShot.push(l);
				gameSound.push(new Sound('sounds/laser3.mp3'));
				gameSound[gameSound.length-1].play();
				gameSound.pop;
				coold=1700;
			}else{
				var l = rectangle(ship.position.x+49, ship.position.y+32.5, 20, 3, 0x3366ff);
				l.zindex = 102;
				laserShot.push(l);
				gameSound.push(new Sound('sounds/laser1.mp3'));
				gameSound[gameSound.length-1].play();
				gameSound.pop;
				coold=1100;
			}
		}
	}
	function shootEn(x,y){
		if(game==true){
			var l = rectangle(x+2, y+12, 20, 3, 0xff0000);
			l.zindex = 102;
			laserEnShot.push(l);
			gameSound.push(new Sound('sounds/laser2.mp3'));
			gameSound[gameSound.length-1].play();
			gameSound.pop;
		}
	}
	function power(){
		if(game==true){
			remove(POWER)
			POWER=rectangle(energy.position.x+100, energy.position.y, POWERlenOne*POWERnr, 24, 0x3366ff);
		}
	}
	function unpower(){
		if(game==true){
			remove(POWER)
			if(POWERnr>0){
				POWER=rectangle(energy.position.x+100, energy.position.y, POWERlenOne*POWERnr-1, 24, 0x3366ff);
			}else{
				POWER=rectangle(energy.position.x+100, -100, POWERlenOne*POWERnr-1, 24, 0x3366ff);
			}
		}
	}
	function enemy1(x,y,pho,SH,mY){
		if(game==true){
			var e;
			e=image(x, y, pho);
			e.zindex = 100;
			enemy.push(e);
			enemyMoveY.push(mY);
			shieldEn.push(SH);
			lastEnShot.push(new Date().getTime());
		}
	}
	function dualBoost(){
		if(game==true){
			var randomDualBoostY = Math.random() * (window.innerHeight - 130);
			if(randomDualBoostY<30){
				randomDualBoostY=30;
			}
			boost.push(image(window.innerWidth, randomDualBoostY, 'images/dual.png'));
		}
	}
	function shieldBoost(){
		if(game==true){
			var randomShieldBoostY = Math.random() * (window.innerHeight - 130);
			if(randomShieldBoostY<30){
				randomShieldBoostY=30;
			}
			HP.push(image(window.innerWidth-40, randomShieldBoostY, 'images/shield.png'));
		}
	}
	function HPUP(){
		if(game==true){
			shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
		}
	}
	function missle1(){
		if(game==true){
			var m=image(ship.position.x+49,ship.position.y+30,'images/missle1.png');
			m.zindex=102;
			missle.push(m);
		}
	}
	function gameOver(){
		game=false;
		pause=false;
		pauseing=false;
		for(var i=0;laserShot.length>i;++i){
			remove(laserShot[i]);
		}
		laserShot.length = 0;
		remove(POWER);
		POWERnr=0;
		for(var i=0;laserEnShot.length>i;++i){
			remove(laserEnShot[i]);
		}
		laserEnShot.length = 0;
		for(var i=0;enemy.length>i;++i){
			remove(enemy[i]);
		}
		enemy.length = 0;
		for(var i=0;missle.length>i;++i){
			remove(missle[i]);
		}
		missle.length = 0;
		for(var i=0;boost.length>i;i++){
			remove(boost[i]);
		}
		boost.length = 0;
		boostDual=false;
		for(var i=0;HP.length>i;i++){
			remove(HP[i]);
		}
		HP.length = 0;
		if(rezEn>localStorage.getItem('high')){
			newHighEn=true;
			localStorage.setItem('high',rezEn);
		}else{
			newHighEn=false;
		}
		recordeEn=localStorage.getItem('high') ? localStorage.getItem('high') : 0;
		if(dis>localStorage.getItem('distance')){
			newHighDis=true;
			localStorage.setItem('distance',dis/1000);
		}else{
			newHighDis=false;
		}
		disBest=localStorage.getItem('distance') ? localStorage.getItem('distance') : 0;
		var backElement5 = text(10, 10, "ENEMYS SHOT:", { font: '28px arial', fill: 0x3366ff });
		var backElement4 = text(17.5*13+10, 10, rezEn, { font: '28px arial', fill: 0x3366ff });
		var backElement11 = text(10, 38, "LY:", { font: '28px arial', fill: 0x3366ff });
		var backElement12 = text(17.5*3+10, 38, dis/1000, { font: '28px arial', fill: 0x3366ff });
		var backElement3 = image(window.innerWidth/2-173.5, window.innerHeight-68, 'images/button2.png');
		if(newHighEn==false){
			var backElement7 = text(window.innerWidth/2, 10, "SHOT BEST:", { font: '28px arial', fill: 0x3366ff })
			var backElement8 = text(window.innerWidth/2+17.5*10, 10, recordeEn, { font: '28px arial', fill: 0x3366ff });
		}else if(newHighEn==true){
			var backElement7 = text(window.innerWidth/2, 10, "NEW SHOT BEST:", { font: '28px arial', fill: 0x3366ff })
			var backElement8 = text(window.innerWidth/2+17.5*14, 10, recordeEn, { font: '28px arial', fill: 0x3366ff });
		}
		if(newHighDis==false){
			var backElement9 = text(window.innerWidth/2, 38, "LY BEST:", { font: '28px arial', fill: 0x3366ff })
			var backElement10 = text(window.innerWidth/2+17.5*8, 38, disBest, { font: '28px arial', fill: 0x3366ff });
		}else if(newHighDis==true){
			var backElement9 = text(window.innerWidth/2, 38, "NEW LY BEST:", { font: '28px arial', fill: 0x3366ff })
			var backElement10 = text(window.innerWidth/2+17.5*12, 38, disBest, { font: '28px arial', fill: 0x3366ff });
		}
		remove(shieldPOW);
		shop=false;
		shieldEnCount=0;
		remove(bomb);
		remove(spark);
		enspTime=5000;
		rezEn=0;
		en=0;
		shipMove=0;
		enemyMoveY.length=0;
		shieldEn.length=0;
		shooting=false;
		shipX=window.innerWidth/20;
		shipY=window.innerHeight/2-80;
		viens=true;
		shooting=false;
		speedBuff=false;
		speedDeBuff=false;
		level0=true, level1=false, level2=false, level3=false;
		time=0;
		backElement3.zindex = 105;
		backElement4.zindex = 105;
		backElement5.zindex = 105;
		backElement7.zindex = 105;
		backElement8.zindex = 105;
		coold=1100;
		recoil=280;
		dualTime=0;
		remove(ship);
		remove(energy);
		onClick(backElement3, function(){
			remove(backElement3);
			remove(backElement4);
			remove(backElement5);
			remove(backElement7);
			remove(backElement8);
			remove(backElement9);
			remove(backElement10);
			remove(backElement11);
			remove(backElement12);
			galaxySpeed=1;
			clearTimeout(handler1);
			clearTimeout(handler);
			bomb = image(-100, -100, 'images/explosion.png');
			bomb.zindex = 101;
			spark = image(-100, -100, 'images/spark1.png');
			spark.zindex = 101;
			POWER = rectangle(-100,-100,10,10,0x3366ff);
			HPtime = new Date().getTime();
			lastShot = new Date().getTime();
			lastCharge = new Date().getTime();
			dualTimer = new Date().getTime();
			shieldPOW = text(window.innerWidth/2+80, window.innerHeight*0.95, "SHIELD:", { font: '24px arial', fill: 0xffffff });
			energy = text(5, window.innerHeight*0.95, "POWER:", { font: '24px arial', fill: 0xffffff });
			if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
				shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
			}
			if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
				shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
			}
			if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
				shield.push(rectangle(shieldPOW.position.x+100+16*shield.length, shieldPOW.position.y, 15, 24, 0x993399))
			}
			ship = image(shipX, shipY, 'images/shipSH.png');
			ship.zindex = 99;
			move(bomb,-100,-100);
			move(spark,-100,-100);
			game=true;
		});
	}
	animate(function(){
		//star effects
		if(fon.position.x+2732-window.innerWidth>0 && starTurn==true && pause==false){
			moveBy(fon,-8.5*galaxySpeed,0);
			dis+=8.5;
		}else if(fon.position.x+2732>0 && fon.position.x+2732-window.innerWidth<=0 && pause==false){
			moveBy(fon,-8.5*galaxySpeed,0);
			moveBy(fon1,-8.5*galaxySpeed,0);
			dis+=8.5;
		}else if(fon.position.x+2732<=0 && pause==false){
			move(fon,window.innerWidth,0);
			dis+=8.5;
			starTurn=false;
		}
		if(fon1.position.x+4098-window.innerWidth>0 && starTurn==false && pause==false){
			moveBy(fon1,-8.5*galaxySpeed,0);
			dis+=8.5;
		}else if(fon1.position.x+4098>0 && fon1.position.x+4098-window.innerWidth<=0 && pause==false){
			moveBy(fon1,-8.5*galaxySpeed,0);
			moveBy(fon,-8.5*galaxySpeed,0);
			dis+=8.5;
		}else if(fon1.position.x+4098<=0 && pause==false){
			move(fon1,window.innerWidth,0);
			dis+=8.5;
			starTurn=true;
		}
		
		if(game==true){
			if(rezEn>=10){
				level1=true;
			}
			if(rezEn>=20){
				level2=true;
			}
			if(rezEn>=30){
				level3=true;
			}
			if(shieldEnCount*2+2<=rezEn){
				shieldEnCount++;
				enspTime*=1.4
			}
			//recoil activates
			if(POWERnr==0){
				recoil=480;
				setTimeout(function(){
					recoil=280;
				}, 9000);
			}
			//ship movements
			moveBy(ship,0,shipMove);
			shipY+=shipMove;
			if(shipY+130>=window.innerHeight || shipY<=30){
				shipMove=0;
			}
			//laser makeing ship
			now = new Date().getTime();
			if(POWERnr>=1 && now-lastShot>=200 && shooting==true){
				lastShot = new Date().getTime();
				POWERnr--;
				unpower();
				shoot();
			}
			now = new Date().getTime();
			//missle makeing
			if(now-lastShotMis>=700 && shootingMis==true){
				lastShotMis = new Date().getTime();
				missle1();
			}
			//missle movement
			var target=0;
			for(var i=0;i<missle.length;i++){
				var misCol=false; 
				//en laser & missle col
				for(var j=0;j<laserEnShot.length;j++){
					if(isCollision(missle[i],laserEnShot[j],0)){
						clearTimeout(handler);
						move(bomb, missle[i].position.x, missle[i].position.y-27);
						gameSound.push(new Sound('sounds/explosion.mp3'));
						gameSound[gameSound.length-1].play();
						gameSound.pop;
						handler = setTimeout(function(){
							move(bomb, -100, -100);
						}, 3000);
						remove(missle[i]);
						missle.splice(i,1);
						remove(laserEnShot[j]);
						laserEnShot.splice(j,1);
						misCol=true;
						break;
					}
				}
				if(misCol==false){
				//my laser & missle col
					for(var j=0;j<laserShot.length;j++){
						if(isCollision(missle[i],laserShot[j],0)){
							clearTimeout(handler);
							move(bomb, laserShot[j].position.x, laserShot[j].position.y-29);
							gameSound.push(new Sound('sounds/explosion.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
							handler = setTimeout(function(){
								move(bomb, -100, -100);
							}, 3000);
							remove(missle[i]);
							missle.splice(i,1);
							remove(laserShot[j]);
							laserShot.splice(j,1);
							misCol=true;
							break;
						}
					}
				}
				if(misCol==false){
				//enemy & missle	
					for(var j=0;j<enemy.length;j++){
						/*if(misRatio>=enemy.length){
							misRatio=1;
						}*/
						if(isCollision(missle[i],enemy[j],0)){
							clearTimeout(handler);
							move(bomb, missle[i].position.x, missle[i].position.y);
							gameSound.push(new Sound('sounds/explosion.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
							handler = setTimeout(function(){
								move(bomb, -100, -100);
							}, 3000);
							remove(missle[i]);
							missle.splice(i,1);
							if(shieldEn[j]<=1){
								remove(enemy[j]);
								enemy.splice(j,1);
								shieldEn.splice(j,1);
								rezEn++;
							}else{
								shieldEn[j]-=2
							}
							misCol=true;
							break;
						}else if(enemy[j].position.x+143>missle[i].position.x+25){
							target=j;
							break;
						}
					}
				}
				if(misCol==false){
				//missle miss
					if(missle[i].position.x>=window.innerWidth){
						remove(missle[i]);
						missle.splice(i,1);
					}else if(enemy.length>0){
						if(enemy[target].position.x+143<missle[i].position.x){
							misY=0;
						}else if(missle[i].position.y>enemy[target].position.y+55){
							misY=-3;
						}else if(missle[i].position.y+5<enemy[target].position.y){
							misY=3;
						}else{
							misY=0;
						}
						moveBy(missle[i],4*galaxySpeed,misY);
					}else{
						moveBy(missle[i],4*galaxySpeed,0);
					}
				}
			}
			//explosion movements
			if(bomb.position.x!=-100){
				moveBy(bomb,-8.5*galaxySpeed,0);
			}else if(bomb.position.x!=-100 && bomb.position.x<=-65){
				move(bomb,-100,-100);
			}
			//spark movements
			if(spark.position.x!=-100){
				moveBy(spark,-8.5*galaxySpeed,0);
			}else if(spark.position.x!=-100 && spark.position.x<=-65){
				move(spark,-100,-100);
			}
			//laserShot from ship
			for(var i=0;i<laserShot.length;i++) {
				moveBy(laserShot[i],5.5*galaxySpeed,0);
				if(laserShot[i].position.x>window.innerWidth){
					remove(laserShot[i]);
					laserShot.splice(i,1);
					i--;
				}else{
					laserColision=false;
					for(var j=0;j<enemy.length;j++){
						if(isCollision(laserShot[i],enemy[j],0) && shieldEn[j]<=0){
							laserColision=true;
							clearTimeout(handler);
							move(bomb, laserShot[i].position.x, laserShot[i].position.y);
							gameSound.push(new Sound('sounds/explosion.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
							handler = setTimeout(function(){
								move(bomb, -100, -100);
							}, 3000);
							remove(enemy[j]);
							enemy.splice(j,1);
							enemyMoveY.splice(j,1);
							remove(laserShot[i]);
							laserShot.splice(i,1);
							shieldEn.splice(j, 1);
							i--;
							rezEn++;
							break;
						}else if(isCollision(laserShot[i],enemy[j],0)){
							laserColision=true;
							clearTimeout(handler1);
							move(spark, laserShot[i].position.x+20, laserShot[i].position.y+1.5);
							handler1 = setTimeout(function(){
								move(spark, -100, -100);
							}, 300);
							remove(laserShot[i]);
							laserShot.splice(i,1);
							shieldEn[j]--;
							if(shieldEn[j]>0){
								gameSound.push(new Sound('sounds/forceField1.mp3'));
								gameSound[gameSound.length-1].play();
								gameSound.pop;
							}
							i--;
							break;
						}
					}
					if(laserColision==false){
						for(var j=0;j<laserEnShot.length;j++){
							if(isCollision(laserShot[i],laserEnShot[j],0)){
								clearTimeout(handler1);
								move(spark, laserShot[i].position.x, laserShot[i].position.y-31);
								handler1 = setTimeout(function(){
									move(spark, -100, -100);
								}, 300);
								remove(laserEnShot[j]);
								laserEnShot.splice(j,1);
								remove(laserShot[i]);
								laserShot.splice(i,1);
								gameSound.push(new Sound('sounds/laserColision.mp3'));
								gameSound[gameSound.length-1].play();
								gameSound.pop;
								i--;
								break;
							}
						}
					}
				}
			}
			//laserShot from enemy
			for(var i=0;i<laserEnShot.length;i++) {
				moveBy(laserEnShot[i],-5.5*galaxySpeed,0);
				//enemy laser out of range
				if(laserEnShot[i].position.x<-20){
					remove(laserEnShot[i]);
					laserEnShot.splice(i,1);
					i--;
				}else if(isCollision(laserEnShot[i],ship,0)){
					//my ship is shot
					if(shield.length==0){
						if(boostDual==true){
							dualTime=0;
							clearTimeout(handler);
							move(bomb, laserEnShot[i].position.x, laserEnShot[i].position.y);
							gameSound.push(new Sound('sounds/explosion.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
							handler = setTimeout(function(){
								move(bomb, -100, -100);
							}, 3000);
							remove(laserEnShot[i]);
							laserEnShot.splice(i,1);
							i--;
						}else{
							gameSound.push(new Sound('sounds/explosion.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
							gameOver();
							break;
						}
					}else if(boostDual==true && shield.length==1){
						clearTimeout(handler1);
						move(spark, laserEnShot[i].position.x-30, ship.position.y);
						handler1 = setTimeout(function(){
							move(spark, -100, -100);
						}, 300);
						remove(laserEnShot[i]);
						laserEnShot.splice(i,1);
						remove(shield[shield.length-1]);
						shield.splice(shield.length-1,1);
						remove(ship);
						ship = image(shipX , shipY , 'images/ship2.png');
						i--;
					}else{
						clearTimeout(handler1);
						move(spark, laserEnShot[i].position.x-30, ship.position.y);
						handler1 = setTimeout(function(){
							move(spark, -100, -100);
						}, 300);
						remove(laserEnShot[i]);
						laserEnShot.splice(i,1);
						remove(shield[shield.length-1]);
						shield.splice(shield.length-1,1);
						if(shield.length==0){
							remove(ship);
							ship = image(shipX , shipY , 'images/ship.png');
							gameSound.push(new Sound('sounds/forceField2.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
						}else{
							gameSound.push(new Sound('sounds/forceField1.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
						}
						i--;
					}
				}
			}
			//enemy movement(unfinished)
			for(var i=0;i<enemy.length;i++){
				if(shieldEn[i]==0){
					gameSound.push(new Sound('sounds/forceField2.mp3'));
					gameSound[gameSound.length-1].play();
					gameSound.pop;
					var enX=enemy[i].position.x,enY=enemy[i].position.y;
					remove(enemy[i]);
					enemy.splice(i,1);
					shieldEn.splice(i,1);
					enemy1(enX, enY,'images/enemy1.png', -1, enemyMoveY[i]);
					enemyMoveY.splice(i,1);
				}
				//enemy hits my ship
				if(isCollision(enemy[i],ship,0)){
					if(shield.length==0){
						gameSound.push(new Sound('sounds/explosion.mp3'));
						gameSound[gameSound.length-1].play();
						gameSound.pop;
						gameOver();
						break;
					}else if(shield.length==1){
						if(boostDual==true){
							dualTime=0;
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
						}else{
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							gameSound.push(new Sound('sounds/explosion.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
							gameOver();
							break;
						}
					}else{
						if(boostDual==true){
							dualTime=0;
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
						}else if(shield.length==2){
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							remove(ship);
							ship = image(shipX , shipY , 'images/ship.png');
						}else{
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
							remove(shield[shield.length-1]);
							shield.splice(shield.length-1,1);
						}
						clearTimeout(handler);
						move(bomb, enemy[i].position.x, enemy[i].position.y);
						gameSound.push(new Sound('sounds/explosion.mp3'));
						gameSound[gameSound.length-1].play();
						gameSound.pop;
						handler = setTimeout(function(){
							move(bomb, -100, -100);
						}, 3000);
						remove(enemy[i]);
						enemy.splice(i,1);
						enemyMoveY.splice(i,1);
						lastEnShot.splice(i,1);
						shieldEn.splice(i,1);
						i--;
					}
				}else if(enemy[i].position.x+200<=0){
					remove(enemy[i]);
					enemy.splice(i,1);
					enemyMoveY.splice(i,1);
					lastEnShot.splice(i,1);
					shieldEn.splice(i,1);
					i--;
				}else if(laserShot.length>=1 && level1==true){
					var laserUnder=false;
					var laserOver=false;
					var laserFront=false;
					//trys to doge
					for(var j=0;j<laserShot.length;j++){
						if((enemy[i].position.y+55<laserShot[j].position.y && enemy[i].position.y+64>=laserShot[j].position.y && laserShot[j].position.x+20>=enemy[i].position.x && laserShot[j].position.x<=enemy[i].position.x+143) || enemy[i].position.y+130>=window.innerHeight){
							laserUnder=true;
						}else if((enemy[i].position.y>laserShot[j].position.y+3 && enemy[i].position.y-9<=laserShot[j].position.y && laserShot[j].position.x+20>=enemy[i].position.x && laserShot[j].position.x<=enemy[i].position.x+143) || enemy[i].position.y<=30){
							laserOver=true;
						}else if(enemy[i].position.y-3<=laserShot[j].position.y && enemy[i].position.y+58>=laserShot[j].position.y+3 && enemy[i].position.x-160<=laserShot[j].position.x && enemy[i].position.x>=laserShot[j].position.x+20){
							laserFront=true;
						}
					}
					if(laserUnder==true && laserOver==true && laserFront==true && level3==true){
						enemyMoveY[i]=0;
						now = new Date().getTime();
						if(now-lastEnShot[i]>=600){
							shootEn(enemy[i].position.x,enemy[i].position.y);
							lastEnShot[i] = new Date().getTime();
						}
					}else if(laserUnder==true && laserOver==true && level2==true){
						enemyMoveY[i]=0;
					}else if(laserUnder==true && level1==true){
						if(enemy[i].position.y>=85){
							enemyMoveY[i]=-3.75;
						}
					}else if(laserOver==true && level1==true){
						if(enemy[i].position.y<=185){
							enemyMoveY[i]=+3.75;
						}
					}else if(laserFront==true && level3==true){
						if(enemy[i]+55<=window.innerHeight/2){
							enemyMoveY[i]=+3.75;
						}else{
							enemyMoveY[i]=-3.75;
						}
					}else if(enemyMoveY[i]==0){
						if(enemy[i]+55<=window.innerHeight/2){
							enemyMoveY[i]=+3.75;
						}else{
							enemyMoveY[i]=-3.75;
						}
					}
					moveBy(enemy[i],-1.75*galaxySpeed,enemyMoveY[i]);
				}else if(enemy[i].position.y+130>=window.innerHeight || enemy[i].position.y<=30){
					enemyMoveY[i]*=-1;
					moveBy(enemy[i],-1.75*galaxySpeed,enemyMoveY[i]);
				}else if(enemyMoveY[i]==0){
						if(enemy[i]+55<=window.innerHeight/2){
							enemyMoveY[i]=+3.75;
						}else{
							enemyMoveY[i]=-3.75;
						}
						moveBy(enemy[i],-1.75*galaxySpeed,enemyMoveY[i]);
				}else{
					moveBy(enemy[i],-1.75*galaxySpeed,enemyMoveY[i]);
				}
				//enemy shoots laser
				now = new Date().getTime();
				if(now-lastEnShot[i]>=1200){
					shootEn(enemy[i].position.x,enemy[i].position.y);
					lastEnShot[i] = new Date().getTime();
				}
			}
			//energy charges
			now = new Date().getTime();
			if(POWERnr>=20){
				
			}else if(now-lastCharge>=coold*galaxySpeed){
				POWERnr++;
				power();
				lastCharge = new Date().getTime();
			}
			//enemy spawns
			now = new Date().getTime();
			if(now-lastTimeCh>=4500){
				if(enspTime>8000){
					enspTime*=0.9;
				}
				lastTimeCh = new Date().getTime();
			}
			now = new Date().getTime();
			if(now-lastEnMade>=enspTime){
				enemymSpeed*=-1;
				var randomEnShipY = Math.random() * (window.innerHeight - 130);
				if(randomEnShipY<=31){
					randomEnShipY=32;
				}
				if(shieldEnCount==0){
					enemy1(window.innerWidth+20,randomEnShipY,'images/enemy1.png',-1,enemymSpeed);
				}else{
					enemy1(window.innerWidth+20,randomEnShipY,'images/enemy1SH.png',shieldEnCount,enemymSpeed);
				}
				lastEnMade = new Date().getTime();
			}
			//spawns a dualBoost
			now = new Date().getTime();
			if(now-dualTimer>=7000){
				dualBoost();
				dualTimer = new Date().getTime();
			}
			for(var i=0;i<boost.length;i++){
				//dualBoost hits my ship
				if(isCollision(ship, boost[i], 0)){
					boostDual=true;
					remove(boost[i]);
					boost.splice(i,1);
					dualTime+=500;
					remove(ship);
					if(shield.length==0){
						ship = image(shipX, shipY, 'images/ship2.png');
					}else{
						ship = image(shipX, shipY, 'images/ship2SH.png');
						gameSound.push(new Sound('sounds/forceField3.mp3'));
						gameSound[gameSound.length-1].play();
						gameSound.pop;
					}
					i--;
				}else if(boost[i].position.x==-74){
					remove(boost[i]);
					boost.splice(i,1);
					i--;
				}else{
					moveBy(boost[i],-7.5*galaxySpeed,0);
				}
			}
			if(boostDual==true && dualTime>=0){
				dualTime--;
			}else if(boostDual==true && dualTime<=0){
				boostDual=false;
				remove(ship);
				if(shield.length==0){
					ship=image(shipX, shipY, 'images/ship.png');
				}else{
					ship=image(shipX, shipY, 'images/shipSH.png');
					gameSound.push(new Sound('sounds/forceField3.mp3'));
					gameSound[gameSound.length-1].play();
					gameSound.pop;
				}
			}
			//spawns a shieldBoost
			now = new Date().getTime();
			if(now-HPtime>=10000){
				shieldBoost();
				HPtime = new Date().getTime();
			}
			for(var i=0;HP.length>i;i++){
				if(shieldPOW.position.x+100+16*shield.length+15<window.innerWidth){
					//shieldBoost hits my ship
					if(isCollision(ship, HP[i], 0)){
						remove(HP[i]);
						HP.splice(i,1);
						i--;
						if(shield.length==0 && boostDual==true){
							remove(ship);
							ship = image(shipX ,shipY , 'images/ship2SH.png');
							gameSound.push(new Sound('sounds/forceField3.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
						}else if(shield.length==0){
							remove(ship);
							ship = image(shipX ,shipY , 'images/shipSH.png');
							gameSound.push(new Sound('sounds/forceField3.mp3'));
							gameSound[gameSound.length-1].play();
							gameSound.pop;
						}
						HPUP();
					}else if(HP[i].position.x==-75){
						remove(HP);
						HP.splice(i,1);
						i--;
					}else{
						moveBy(HP[i],-7.5*galaxySpeed,0);
					}
				}
			}
		}
	});
	
};
