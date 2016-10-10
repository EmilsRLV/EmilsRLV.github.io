//0-grass
//1-tree
//2-sand
//3-water
function gen_game(){

	
}

function generate_map(width,height,gen_trees,gen_water){
	var map1 = new Array();
	for (i=0;i<height*map_prop.world_size;i++) {
		map1[i]=new Array();
		for (j=0;j<width*map_prop.world_size;j++) {
			map1[i][j]= {
				id : 0,
				sprite_1 : 'NAV'
			};
		}
	}

	for (i=0;i<height*map_prop.world_size;i++) {
		for (j=0;j<width*map_prop.world_size;j++) {
			
			if(gen_water==true){
				var decision = rnd(0,250);

				if(decision == 0 || (i==0 || i+1==height*map_prop.world_size || j==0 || j+1==width*map_prop.world_size)){
					waters++;
					var nr=1;
					if(i<3 || i+3>height*map_prop.world_size || j<3 || j+3>width*map_prop.world_size){
						nr=9;
					}
				//--------LAKE GENERATION--------------
					var water_count = rnd(5,40);
					// var water_count = 5;

					map1[i][j].id=3;
					make_beach(map1,i,j,height*map_prop.world_size,width*map_prop.world_size,nr);

					var checked = new Array();

					for (q=0;q<height*map_prop.world_size;q++) {
						checked[q]=new Array();
						for (w=0;w<width*map_prop.world_size;w++) {
							checked[q][w]=0;
						}
					}

					var starting = {
						x : j,
						y : i
					};

					var rinda = [];

					rinda.push(starting);
					checked[starting.y][starting.x] = 1;

					// for(var q = 0;q<water_count;q++){
					while(rinda.length > 0 && water_count>0){
						var rnd_top = rnd(5,30);
						var rnd_right = rnd(5,30);
						var rnd_left = rnd(5,30);
						var rnd_bottom = rnd(5,30);

						var p = rinda.shift(); //Current water tile

						//North flow
						if(p.y > 0 && rnd_top>10 && (map1[p.y-1][p.x].id==0 || map1[p.y-1][p.x].id==2)){
							checked[p.y-1][p.x]=1;
							var c = {
								x : p.x,
								y : p.y-1
							};
							rinda.push(c);

							map1[p.y-1][p.x].id=3;
							make_beach(map1,p.y-1,p.x,height*map_prop.world_size,width*map_prop.world_size,nr);
						}
						//East flow
						if(p.x < width*map_prop.world_size-1 && rnd_right>10 && (map1[p.y][p.x+1].id==0 || map1[p.y][p.x+1].id==2)){
							checked[p.y][p.x+1]=1;
							var c = {
								x : p.x+1,
								y : p.y
							};
							rinda.push(c);

							map1[p.y][p.x+1].id=3;
							make_beach(map1,p.y,p.x+1,height*map_prop.world_size,width*map_prop.world_size,nr);
						}
						//West flow
						if(p.x > 0 && rnd_left>10 && (map1[p.y][p.x-1].id==0 || map1[p.y][p.x-1].id==2)){
							checked[p.y][p.x-1]=1;
							var c = {
								x : p.x-1,
								y : p.y
							};
							rinda.push(c);

							map1[p.y][p.x-1].id=3;
							make_beach(map1,p.y,p.x-1,height*map_prop.world_size,width*map_prop.world_size,nr);
						}
						//Down flow
						if(p.y < height*map_prop.world_size-1 && rnd_left>10 && (map1[p.y+1][p.x].id==0 || map1[p.y+1][p.x].id==2)){
							checked[p.y+1][p.x]=1;
							var c = {
								x : p.x,
								y : p.y+1
							};
							rinda.push(c);

							map1[p.y+1][p.x].id=3;
							make_beach(map1,p.y+1,p.x,height*map_prop.world_size,width*map_prop.world_size,nr);
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
					if(map1[i][j].nr<2){
						map1[i][j].id=1;
					}

					var checked = new Array();

					for (q=0;q<height*map_prop.world_size;q++) {
						checked[q]=new Array();
						for (w=0;w<width*map_prop.world_size;w++) {
							checked[q][w]=0;
						}
					}

					var starting = {
						x : j,
						y : i
					};

					var rinda = [];

					rinda.push(starting);
					checked[starting.y][starting.x] = 1;

					// for(var q = 0;q<water_count;q++){
					while(rinda.length > 0 && tree_count>0){
						var rnd_top = rnd(0,2);
						var rnd_right = rnd(0,2);
						var rnd_left = rnd(0,2);
						var rnd_bottom = rnd(0,2);

						var p = rinda.shift(); //Current water tile

						//North flow
						if(p.y > 0 && rnd_top==2 && map1[p.y-1][p.x].id==0){
							checked[p.y-1][p.x]=1;
							var c = {
								x : p.x,
								y : p.y-1
							};
							rinda.push(c);

							map1[p.y-1][p.x].id=1;
						}
						//East flow
						if(p.x < width*map_prop.world_size-1 && rnd_right==2 && map1[p.y][p.x+1].id==0){
							checked[p.y][p.x+1]=1;
							var c = {
								x : p.x+1,
								y : p.y
							};
							rinda.push(c);
							
							map1[p.y][p.x+1].id=1;
						}
						//West flow
						if(p.x > 0 && rnd_left==2 && map1[p.y][p.x-1].id==0){
							checked[p.y][p.x-1]=1;
							var c = {
								x : p.x-1,
								y : p.y
							};
							rinda.push(c);
							
							map1[p.y][p.x-1].id=1;
						}
						//Down flow
						if(p.y < height*map_prop.world_size-1 && rnd_bottom==2 && map1[p.y+1][p.x].id==0){
							checked[p.y+1][p.x]=1;
							var c = {
								x : p.x,
								y : p.y+1
							};
							rinda.push(c);
							
							map1[p.y+1][p.x].id=1;
						}
						tree_count--;
					}
					//---------------------------------------
				}
			}

		}
	}


	return map1;
}

function make_beach(m,y,x,height,width,nr){
	var map2=m;
	var sandy=0;
	var a = {
		x : x,
		y : y
	};
	var rinda = [];
	rinda.push(a);
	while(rinda.length > 0 && sandy<nr){
		var c = rinda.shift();
		if(c.y>0){
			if(map2[c.y-1][c.x].id<2){
				map2[c.y-1][c.x].id=2;
				a = {
					x : c.x,
					y : c.y-1
				};
				rinda.push(a);
			}
			if(c.x>0 && map2[c.y-1][c.x-1].id<2){
				map2[c.y-1][c.x-1].id=2;
				a = {
					x : c.x-1,
					y : c.y-1
				};
				rinda.push(a);
			}
			if(c.x<width-1 && map2[c.y-1][c.x+1].id<2){
				map2[c.y-1][c.x+1].id=2;
				a = {
					x : c.x+1,
					y : c.y-1
				};
				rinda.push(a);
			}	
		}
		if(c.y<height-1){
			if(map2[c.y+1][c.x].id<2){
				map2[c.y+1][c.x].id=2;
				a = {
					x : c.x,
					y : c.y+1
				};
				rinda.push(a);
			}
			if(c.x>0 && map2[c.y+1][c.x-1].id<2){
				map2[c.y+1][c.x-1].id=2;
				a = {
					x : c.x-1,
					y : c.y+1
				};
				rinda.push(a);
			}
			if(c.x<width-1 && map2[c.y+1][c.x+1].id<2){
				map2[c.y+1][c.x+1].id=2;
				a = {
					x : c.x+1,
					y : c.y+1
				};
				rinda.push(a);
			}
		}
		if(c.x>0 && map2[c.y][c.x-1].id<2){
			map2[c.y][c.x-1].id=2;
			a = {
				x : c.x-1,
				y : c.y
			};
			rinda.push(a);
		}
		if(c.x<width-1 && map2[c.y][c.x+1].id<2){
			map2[c.y][c.x+1].id=2;
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
			if(map_prop.cord_x>cor_x){
				map[i][j+map_prop.width].sprite_1.destroy();
			}else if(map_prop.cord_y>cor_y){
				map[i+map_prop.height][j].sprite_1.destroy();
			}else if(map_prop.cord_x<cor_x){
				map[i][j-map_prop.width].sprite_1.destroy();
			}else if(map_prop.cord_y<cor_y){
				map[i-map_prop.height][j].sprite_1.destroy();
			}
			var nx = (j-map_prop.width*cor_x)*map_prop.tile_size;
			var ny = (i-map_prop.height*cor_y)*map_prop.tile_size;
			if(map[i][j].id==0){
				var r = rnd(1,7);
				if(r<=4){
					map[i][j].sprite_1 = game.add.sprite(nx, ny, 'grass');
				}else if(r<=6){
					map[i][j].id = 0.1;
					map[i][j].sprite_1 = game.add.sprite(nx, ny, 'grass2');
				}else{
					map[i][j].id = 0.2;
					map[i][j].sprite_1 = game.add.sprite(nx, ny, 'grass3');
				}
			}else if(map[i][j].id==1){
				map[i][j].sprite_1 = game.add.sprite(nx, ny, 'grass');
				var r = rnd(1,4);
				if(r>1){
					map[i][j].sprite_1 = game.add.sprite(nx, ny, 'tree');
				}else{
					map[i][j].sprite_1 = game.add.sprite(nx, ny, 'tree2');
					map[i][j].id = 1.1;
				}
			}else if(map[i][j].id==2){
				map[i][j].sprite_1=game.add.sprite(nx, ny, 'sand');
			}else if(map[i][j].id==3){
				var r = rnd(1,3);
				if(r==1){
					map[i][j].sprite_1=game.add.sprite(nx, ny, 'water');
				}else if(r==2){
					map[i][j].id = 3.1;
					map[i][j].sprite_1 = game.add.sprite(nx, ny, 'water2');
				}else{
					map[i][j].id = 3.2;
					map[i][j].sprite_1 = game.add.sprite(nx, ny, 'water3');
				}
			}
		}
	}
	return map;
}

function make_mini_map(dose){
	if(dose==1 && map_prop.min_map==true){
		var sc=(map_prop.game_y/5*2)/(map_prop.tile_size*(map_prop.height*map_prop.world_size));
		for(var i=0;i<map_prop.height*map_prop.world_size;i++){
			for(var j=0;j<map_prop.width*map_prop.world_size;j++){
				var nx = j*(map_prop.tile_size*sc);
				var ny = i*(map_prop.tile_size*sc)+map_prop.game_y/5*3;
				if(map[i][j].id==0){
					var main = game.add.sprite(nx, ny, 'grass');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}if(map[i][j].id==0.1){
					var main = game.add.sprite(nx, ny, 'grass2');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}if(map[i][j].id==0.2){
					var main = game.add.sprite(nx, ny, 'grass3');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}else if(map[i][j].id==1){
					var main = game.add.sprite(nx, ny, 'grass3');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
					var main = game.add.sprite(nx, ny, 'tree');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}else if(map[i][j].id==1.1){
					var main = game.add.sprite(nx, ny, 'grass3');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
					var main = game.add.sprite(nx, ny, 'tree2');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}else if(map[i][j].id==2){
					var main = game.add.sprite(nx, ny, 'sand');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}else if(map[i][j].id==3){
					var main = game.add.sprite(nx, ny, 'water');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}else if(map[i][j].id==3.1){
					var main = game.add.sprite(nx, ny, 'water2');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}else if(map[i][j].id==3.2){
					var main = game.add.sprite(nx, ny, 'water3');
					main.scale.setTo(sc,sc);
					main.alpha=0.5;
					main.fixedToCamera=true;
					min_map.add(main);
				}
			}
		}
	}else if(map_prop.min_map==true){
		min_map.destroy();
		min_map = game.add.group();
		make_mini_map(1);
		night.bringToTop(); 
		ui.pause.bringToTop(); 
	}
}

function spawnPlayer(x,y,name,cor_x,cor_y){
	var tpx = x;
	var tpy = y;
	while(tpy>=0){
		if(map[tpy][tpx].id==0 || map[tpy][tpx].id==2){
			var gtpx = (tpx-map_prop.width*cor_x)*map_prop.tile_size;
			var gtpy = (tpy-map_prop.height*cor_y)*map_prop.tile_size;
			player.sprite = game.add.sprite(gtpx, gtpy, name);
			player.x=tpx;
			player.y=tpy;
			player.hp_ui = game.add.sprite(10,10,'HP');
			player.hp_ui.fixedToCamera=true;
			player.ap_ui = game.add.sprite(10,40,'AP');
			player.ap_ui.fixedToCamera=true;
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

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


