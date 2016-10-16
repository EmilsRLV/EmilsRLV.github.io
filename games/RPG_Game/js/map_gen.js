//0-grass
//1-tree
//2-sand
//3-water
function gen_map(x,y){
	for(var i=y;i<100+y;i++){
		is_map[i] = new Array();
		for(var j=x;j<100+x;j++){
			is_map[i][j] = {
				exist : false
			}
		}
	}
}

function generate_map(width,height,gen_trees,gen_water,cor_x,cor_y){
	var indeXneg=1;
	if(cor_x==0 ||  is_map[cor_y][cor_x-1].exist==true){
		indeXneg=0;
	}
	var indeYneg=1;
	if(cor_y==0 || is_map[cor_y-1][cor_x].exist==true){
		indeYneg=0;
	}
	var indeX=1;
	if(is_map[cor_y][cor_x+1].exist==true){
		indeX=0;
	}
	var indeY=1;
	if(is_map[cor_y+1][cor_x].exist==true){
		indeY=0;
	}
	for (i=height*cor_y-indeYneg;i<height+height*cor_y+indeY;i++) {
		if(map_prop.max_y<cor_y){
			map[i]=new Array();
		}
		for (j=width*cor_x-indeXneg;j<width+width*cor_x+indeX;j++) {
			if(i<height+height*cor_y && j<width+width*cor_x && i>=height*cor_y && j>=width*cor_x){
				map[i][j]= {
					id : 0,
				};
			}else{
				map[i][j]= {
					id : -1,
				};
			}
		}
	}

	for (i=height*cor_y;i<height+height*cor_y;i++) {
		for (j=width*cor_x;j<width+width*cor_x;j++) {
			
			if(gen_water==true){
				var decision = rnd(0,250);
				var nr=0;
				if(i==0 || j==0){
					decision=0;
					nr=10;
				}
				if(cor_x>0 && j==width*cor_x){
					if(map[i][j-1].id>=3){
						decision=0;
					}else{
						decision=1;
					}
				}else if(j+1==width+width*cor_x){
					if(map[i][j+1].id>=3){
						decision=0;
					}else{
						decision=1;
					}
				}else if(cor_y>0 && i==height*cor_y){
					if(map[i-1][j].id>=3){
						decision=0;
					}else{
						decision=1;
					}
				}else if(i+1==height+height*cor_y){
					if(map[i+1][j].id>=3){
						decision=0;
					}else{
						decision=1;
					}
				}
				if(decision == 0 ){
					waters++;
				//--------LAKE GENERATION--------------
					var water_count = rnd(5,40);
					// var water_count = 5;

					map[i][j].id=3;
					make_beach(i,j,height+height*cor_y,width+width*cor_x,nr);

					var starting = {
						x : j,
						y : i
					};

					var rinda = [];

					rinda.push(starting);

					// for(var q = 0;q<water_count;q++){
					while(rinda.length > 0 && water_count>0){
						var rnd_top = rnd(5,30);
						var rnd_right = rnd(5,30);
						var rnd_left = rnd(5,30);
						var rnd_bottom = rnd(5,30);

						var p = rinda.shift(); //Current water tile

						//North flow
						if(p.y > height*cor_y && rnd_top>10 && (map[p.y-1][p.x].id<=0 || map[p.y-1][p.x].id==2)){
							var c = {
								x : p.x,
								y : p.y-1
							};
							rinda.push(c);

							map[p.y-1][p.x].id=3;
							make_beach(p.y-1,p.x,height+height*cor_y,width+width*cor_x,nr);
						}
						//East flow
						if(p.x < width+width*cor_x-1 && rnd_right>10 && (map[p.y][p.x+1].id<=0 || map[p.y][p.x+1].id==2)){
							var c = {
								x : p.x+1,
								y : p.y
							};
							rinda.push(c);

							map[p.y][p.x+1].id=3;
							make_beach(p.y,p.x+1,height+height*cor_y,width+width*cor_x,nr);
						}
						//West flow
						if(p.x > width*cor_x && rnd_left>10 && (map[p.y][p.x-1].id<=0 || map[p.y][p.x-1].id==2)){
							var c = {
								x : p.x-1,
								y : p.y
							};
							rinda.push(c);

							map[p.y][p.x-1].id=3;
							make_beach(p.y,p.x-1,height+height*cor_y,width+width*cor_x,nr);
						}
						//Down flow
						if(p.y < height+height*cor_y-1 && rnd_left>10 && (map[p.y+1][p.x].id<=0 || map[p.y+1][p.x].id==2)){
							var c = {
								x : p.x,
								y : p.y+1
							};
							rinda.push(c);

							map[p.y+1][p.x].id=3;
							make_beach(p.y+1,p.x,height+height*cor_y,width+width*cor_x,nr);
						}
						water_count--;
					}
					//---------------------------------------
				}
				
			}

			if(gen_trees==true){
				var decision = rnd(0,25);

				if(decision == 0){
					//--------FOREST GENERATION--------------
					var tree_count = rnd(5,100);
					// var water_count = 5;
					if(map[i][j].nr<2){
						map[i][j].id=1;
					}

					var starting = {
						x : j,
						y : i
					};

					var rinda = [];

					rinda.push(starting);

					// for(var q = 0;q<water_count;q++){
					while(rinda.length > 0 && tree_count>0){
						var rnd_top = rnd(0,2);
						var rnd_right = rnd(0,2);
						var rnd_left = rnd(0,2);
						var rnd_bottom = rnd(0,2);

						var p = rinda.shift(); //Current water tile

						//North flow
						if(p.y > height*cor_y && rnd_top==2 && map[p.y-1][p.x].id<=0){
							var c = {
								x : p.x,
								y : p.y-1
							};
							rinda.push(c);

							map[p.y-1][p.x].id=1;
						}
						//East flow
						if(p.x < width+width*cor_x-1 && rnd_right==2 && map[p.y][p.x+1].id<=0){
							var c = {
								x : p.x+1,
								y : p.y
							};
							rinda.push(c);
							
							map[p.y][p.x+1].id=1;
						}
						//West flow
						if(p.x > width+width*cor_x && rnd_left==2 && map[p.y][p.x-1].id<=0){
							var c = {
								x : p.x-1,
								y : p.y
							};
							rinda.push(c);
							
							map[p.y][p.x-1].id=1;
						}
						//Down flow
						if(p.y < height+height*cor_y-1 && rnd_bottom==2 && map[p.y+1][p.x].id<=0){
							var c = {
								x : p.x,
								y : p.y+1
							};
							rinda.push(c);
							
							map[p.y+1][p.x].id=1;
						}
						tree_count--;
					}
					//---------------------------------------
				}
			}
		}
	}

}

function make_beach(y,x,height,width,nr){
	var sandy=0;
	var a = {
		x : x,
		y : y
	};
	var rinda = [];
	rinda.push(a);
	while(rinda.length > 0 && sandy<nr){
		var c = rinda.shift();
		if(c.y>height-map_prop.height){
			if(map[c.y-1][c.x].id<2){
				map[c.y-1][c.x].id=2;
				a = {
					x : c.x,
					y : c.y-1
				};
				rinda.push(a);
			}
			if(c.x>width-map_prop.height && map[c.y-1][c.x-1].id<2){
				map[c.y-1][c.x-1].id=2;
				a = {
					x : c.x-1,
					y : c.y-1
				};
				rinda.push(a);
			}
			if(c.x<width-1 && map[c.y-1][c.x+1].id<2){
				map[c.y-1][c.x+1].id=2;
				a = {
					x : c.x+1,
					y : c.y-1
				};
				rinda.push(a);
			}	
		}
		if(c.y<height-1){
			if(map[c.y+1][c.x].id<2){
				map[c.y+1][c.x].id=2;
				a = {
					x : c.x,
					y : c.y+1
				};
				rinda.push(a);
			}
			if(c.x>width-map_prop.height && map[c.y+1][c.x-1].id<2){
				map[c.y+1][c.x-1].id=2;
				a = {
					x : c.x-1,
					y : c.y+1
				};
				rinda.push(a);
			}
			if(c.x<width-1 && map[c.y+1][c.x+1].id<2){
				map[c.y+1][c.x+1].id=2;
				a = {
					x : c.x+1,
					y : c.y+1
				};
				rinda.push(a);
			}
		}
		if(c.x>width-map_prop.height && map[c.y][c.x-1].id<2){
			map[c.y][c.x-1].id=2;
			a = {
				x : c.x-1,
				y : c.y
			};
			rinda.push(a);
		}
		if(c.x<width-1 && map[c.y][c.x+1].id<2){
			map[c.y][c.x+1].id=2;
			a = {
				x : c.x+1,
				y : c.y
			};
			rinda.push(a);
		}
		sandy++;	
	}
}

function build_map(cor_x,cor_y){
	for(var i=map_prop.height*cor_y;i<map_prop.height+map_prop.height*cor_y;i++){
		for(var j=map_prop.width*cor_x;j<map_prop.width+map_prop.width*cor_x;j++){
			var nx = (j-map_prop.width*cor_x)*map_prop.tile_size;
			var ny = (i-map_prop.height*cor_y)*map_prop.tile_size;
			if(map[i][j].id<=0){
				var r = rnd(1,7);
				if(r<=4){
					map[i][j].id = 0.1;
					this_map.add(game.add.sprite(nx, ny, 'grass'));
				}else if(r<=6){
					map[i][j].id = 0.2;
					this_map.add(game.add.sprite(nx, ny, 'grass2'));
				}else{
					map[i][j].id = 0.3;
					this_map.add(game.add.sprite(nx, ny, 'grass3'));
				}
			}else if(map[i][j].id<1){
				if(map[i][j].id==0.1){
					this_map.add(game.add.sprite(nx, ny, 'grass'));
				}else if(map[i][j].id==0.2){
					this_map.add(game.add.sprite(nx, ny, 'grass2'));
				}else{
					this_map.add(game.add.sprite(nx, ny, 'grass3'));
				}
			}else if(map[i][j].id==1){
				this_map.add(game.add.sprite(nx, ny, 'grass'));
				var r = rnd(1,4);
				if(r>1){
					map[i][j].id = 1.1;
					this_map.add(game.add.sprite(nx, ny, 'tree'));
				}else{
					map[i][j].id = 1.2;
					this_map.add(game.add.sprite(nx, ny, 'tree2'));
				}
			}else if(map[i][j].id<2){
				this_map.add(game.add.sprite(nx, ny, 'grass'));
				if(map[i][j].id == 1.1){
					this_map.add(game.add.sprite(nx, ny, 'tree'));
				}else if(map[i][j].id == 1.2){
					this_map.add(game.add.sprite(nx, ny, 'tree2'));
				}else if(turn.mid==true){
					var r = rnd(1,4);
					if(r>1){
						map[i][j].id = 1.1;
						this_map.add(game.add.sprite(nx, ny, 'tree'));
					}else{
						map[i][j].id = 1.2;
						this_map.add(game.add.sprite(nx, ny, 'tree2'));
					}
				}else if(map[i][j].id == 1.3){
					map[i][j].id = 1.3;
					this_map.add(game.add.sprite(nx, ny, 'tree3'));
				}else if(map[i][j].id == 1.4){
					map[i][j].id = 1.4;
					this_map.add(game.add.sprite(nx, ny, 'tree4'));
				}else if(map[i][j].id == 1.5){
					map[i][j].id = 1.5;
					this_map.add(game.add.sprite(nx, ny, 'tree5'));
				}
			}else if(map[i][j].id==2){
				map[i][j].id = 2.1;
				this_map.add(game.add.sprite(nx, ny, 'sand'));
			}else if(map[i][j].id<3){
				this_map.add(game.add.sprite(nx, ny, 'sand'));
			}else if(map[i][j].id==3){
				var r = rnd(1,3);
				if(r==1){
					map[i][j].id = 3.1;
					this_map.add(game.add.sprite(nx, ny, 'water'));
				}else if(r==2){
					map[i][j].id = 3.2;
					this_map.add(game.add.sprite(nx, ny, 'water2'));
				}else{
					map[i][j].id = 3.3;
					this_map.add(game.add.sprite(nx, ny, 'water3'));
				}
			}else if(map[i][j].id<4){
				if(map[i][j].id==3.1){
					this_map.add(game.add.sprite(nx, ny, 'water'));
				}else if(map[i][j].id==3.2){
					this_map.add(game.add.sprite(nx, ny, 'water2'));
				}else{
					this_map.add(game.add.sprite(nx, ny, 'water3'));
				}
			}else if(map[i][j].id==4.1){
				this_map.add(game.add.sprite(nx, ny, 'wall'));
			}
		}
	}
	turn.mid=false;
}

function grow(){
	for (var i = 0; i < this_map.children.length; i++) {
		if(this_map.children[i].key=='tree3'){
			var r = rnd(1,4);
			if(r>1){
				map[this_map.children[i].y/map_prop.tile_size][this_map.children[i].x/map_prop.tile_size].id = 1.1;
				this_map.add(game.add.sprite(this_map.children[i].x, this_map.children[i].y, 'tree'));
			}else{
				map[this_map.children[i].y/map_prop.tile_size][this_map.children[i].x/map_prop.tile_size].id = 1.2;
				this_map.add(game.add.sprite(this_map.children[i].x, this_map.children[i].y, 'tree2'));
			}
			this_map.children[i].destroy();
		}
	}
}

function make_mini_map(dose){
	if(dose==1 && map_prop.min_map==true){
		var sc=map_prop.game_y/(map_prop.tile_size*(map_prop.height*(map_prop.max_y+1)));
		if(map_prop.game_x/(map_prop.tile_size*(map_prop.width*(map_prop.max_x+1)))<sc){
			sc=map_prop.game_x/(map_prop.tile_size*(map_prop.width*(map_prop.max_x+1)));
		}
		for(var i=0;i<map_prop.height*(map_prop.max_y+1);i++){
			for(var j=0;j<map_prop.width*(map_prop.max_x+1);j++){
				if(is_map[Math.floor(i/map_prop.height)][Math.floor(j/map_prop.width)].exist==true){
					var nx = j*(map_prop.tile_size*sc);
					var ny = i*(map_prop.tile_size*sc);
					if(map[i][j].id==0.1){
						var main = game.add.sprite(nx, ny, 'grass');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}if(map[i][j].id==0.2){
						var main = game.add.sprite(nx, ny, 'grass2');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}if(map[i][j].id==0.3){
						var main = game.add.sprite(nx, ny, 'grass3');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}else if(map[i][j].id==1.1){
						var main = game.add.sprite(nx, ny, 'grass3');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
						var main = game.add.sprite(nx, ny, 'tree');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}else if(map[i][j].id==1.2){
						var main = game.add.sprite(nx, ny, 'grass3');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
						var main = game.add.sprite(nx, ny, 'tree2');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}else if(map[i][j].id==2.1){
						var main = game.add.sprite(nx, ny, 'sand');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}else if(map[i][j].id==3.1){
						var main = game.add.sprite(nx, ny, 'water');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}else if(map[i][j].id==3.2){
						var main = game.add.sprite(nx, ny, 'water2');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}else if(map[i][j].id==3.3){
						var main = game.add.sprite(nx, ny, 'water3');
						main.scale.setTo(sc,sc);
						main.fixedToCamera=true;
						min_map.add(main);
					}	
				}
			}
		}
	}else if(map_prop.min_map==0 && map_prop.min_map==true){
		min_map.kill();
		min_map.destroy();
	}
}

function spawnPlayer(x,y,name,cor_x,cor_y){
	var tpx = x;
	var tpy = y;
	while(tpy>=0){
		if(map[tpy][tpx].id<1 || (map[tpy][tpx].id>=2 && map[tpy][tpx].id<3)){
			var gtpx = (tpx-map_prop.width*cor_x)*map_prop.tile_size;
			var gtpy = (tpy-map_prop.height*cor_y)*map_prop.tile_size;
			player.sprite = game.add.sprite(gtpx, gtpy, name);
			player.x=tpx;
			player.y=tpy;
			player.sprite.animations.add('up', [0], 10, true);
			player.sprite.animations.add('right', [1], 10, true);
			player.sprite.animations.add('down', [2], 10, true);
			player.sprite.animations.add('left', [3], 10, true);
			break;
		}else if(cor_x!=map_prop.cord_x || cor_x!=map_prop.cord_x){
			break;
		}
		tpx = rnd(map_prop.width*cor_x,map_prop.width-2+map_prop.width*cor_x);
		tpy = rnd(map_prop.height*cor_y,map_prop.height-2+map_prop.height*cor_y);
	}

}



