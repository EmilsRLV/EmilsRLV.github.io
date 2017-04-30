//0-grass
//1-tree
//2-sand
//3-water
function gen_map(x,y){
	for(var i=y;i<map_prop.height*10+y;i++){
		world_map[i] = new Array();
		for(var j=x;j<map_prop.width*10+x;j++){
			world_map[i][j] = {
				id : 0
			};
		}
	}
}

function generate_map(gen_trees,gen_water){
	var width=map_prop.width;
	var height=map_prop.height;

	for (i=0;i<height;i++) {
		for (j=0;j<width;j++) {
			
			if(gen_water==true){
				var decision = rnd(0,250);
				var nr=0;
				if(i==0 || j==0 || i==height-1 || j==width-1){
					decision=0;
					nr=rnd(1,10);
				}
				if(decision == 0 ){
				//--------LAKE GENERATION--------------
					var water_count = rnd(5,40);
					// var water_count = 5;

					world_map[i][j].id=3;
					make_beach(i,j,nr); //<<<-----------------------------------------------------

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
						if(p.y > 0 && rnd_top>10 && (world_map[p.y-1][p.x].id<=0 || world_map[p.y-1][p.x].id==2)){
							starting = {
								x : p.x,
								y : p.y-1
							};
							rinda.push(starting);

							world_map[p.y-1][p.x].id=3;
							make_beach(p.y-1,p.x,nr);
						}
						//East flow
						if(p.x < width-1 && rnd_right>10 && (world_map[p.y][p.x+1].id<=0 || world_map[p.y][p.x+1].id==2)){
							starting = {
								x : p.x+1,
								y : p.y
							};
							rinda.push(starting);

							world_map[p.y][p.x+1].id=3;
							make_beach(p.y,p.x+1,nr);
						}
						//West flow
						if(p.x > 0 && rnd_left>10 && (world_map[p.y][p.x-1].id<=0 || world_map[p.y][p.x-1].id==2)){
							starting = {
								x : p.x-1,
								y : p.y
							};
							rinda.push(starting);

							world_map[p.y][p.x-1].id=3;
							make_beach(p.y,p.x-1,nr);
						}
						//Down flow
						if(p.y < height-1 && rnd_left>10 && (world_map[p.y+1][p.x].id<=0 || world_map[p.y+1][p.x].id==2)){
							starting = {
								x : p.x,
								y : p.y+1
							};
							rinda.push(starting);

							world_map[p.y+1][p.x].id=3;
							make_beach(p.y+1,p.x,nr);
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
					var tree_count = rnd(0,5);
					// var water_count = 5;
					world_map[i][j].id=1;

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
						if(p.y > 0 && rnd_top>=1 && world_map[p.y-1][p.x].id<=0){
							starting = {
								x : p.x,
								y : p.y-1
							};
							rinda.push(starting);

							world_map[p.y-1][p.x].id=1;
						}
						//East flow
						if(p.x < width-1 && rnd_right>=1 && world_map[p.y][p.x+1].id<=0){
							starting = {
								x : p.x+1,
								y : p.y
							};
							rinda.push(starting);
							
							world_map[p.y][p.x+1].id=1;
						}
						//West flow
						if(p.x > 0 && rnd_left>=1 && world_map[p.y][p.x-1].id<=0){
							starting = {
								x : p.x-1,
								y : p.y
							};
							rinda.push(starting);
							
							world_map[p.y][p.x-1].id=1;
						}
						//Down flow
						if(p.y < height-1 && rnd_bottom>=1 && world_map[p.y+1][p.x].id<=0){
							starting = {
								x : p.x,
								y : p.y+1
							};
							rinda.push(starting);
							
							world_map[p.y+1][p.x].id=1;
						}
						tree_count--;
					}
					//---------------------------------------
				}
			}
		}
	}

}

function make_beach(y,x,nr){
	var height=map_prop.height;
	var width=map_prop.width;
	var sandy=0;
	var a = {
		x : x,
		y : y
	};
	var rinda = [];
	rinda.push(a);
	while(rinda.length > 0 && sandy<nr){
		var starting = rinda.shift();
		if(starting.y>0){
			if(world_map[starting.y-1][starting.x].id<2){
				world_map[starting.y-1][starting.x].id=2;
				a = {
					x : starting.x,
					y : starting.y-1
				};
				rinda.push(a);
			}
			if(starting.x>0 && world_map[starting.y-1][starting.x-1].id<2){
				world_map[starting.y-1][starting.x-1].id=2;
				a = {
					x : starting.x-1,
					y : starting.y-1
				};
				rinda.push(a);
			}
			if(starting.x<width-1 && world_map[starting.y-1][starting.x+1].id<2){
				world_map[starting.y-1][starting.x+1].id=2;
				a = {
					x : starting.x+1,
					y : starting.y-1
				};
				rinda.push(a);
			}	
		}
		if(starting.y<height-1){
			if(world_map[starting.y+1][starting.x].id<2){
				world_map[starting.y+1][starting.x].id=2;
				a = {
					x : starting.x,
					y : starting.y+1
				};
				rinda.push(a);
			}
			if(starting.x>0 && world_map[starting.y+1][starting.x-1].id<2){
				world_map[starting.y+1][starting.x-1].id=2;
				a = {
					x : starting.x-1,
					y : starting.y+1
				};
				rinda.push(a);
			}
			if(starting.x<width-1 && world_map[starting.y+1][starting.x+1].id<2){
				world_map[starting.y+1][starting.x+1].id=2;
				a = {
					x : starting.x+1,
					y : starting.y+1
				};
				rinda.push(a);
			}
		}
		if(starting.x>0 && world_map[starting.y][starting.x-1].id<2){
			world_map[starting.y][starting.x-1].id=2;
			a = {
				x : starting.x-1,
				y : starting.y
			};
			rinda.push(a);
		}
		if(starting.x<width-1 && world_map[starting.y][starting.x+1].id<2){
			world_map[starting.y][starting.x+1].id=2;
			a = {
				x : starting.x+1,
				y : starting.y
			};
			rinda.push(a);
		}
		sandy++;	
	}
}

function build_map(){
	var height=map_prop.height;
	var width=map_prop.width;
	for(var i=0;i<height;i++){
		for(var j=0;j<width;j++){
			var nx = j*map_prop.tile_size;
			var ny = i*map_prop.tile_size;
			if(world_map[i][j].id==0){
				var r = rnd(1,7);
				if(r<=4){
					world_map[i][j].id = 0.1;
					temp_map.add(game.add.sprite(nx, ny, 'grass'));
				}else if(r<=6){
					world_map[i][j].id = 0.2;
					temp_map.add(game.add.sprite(nx, ny, 'grass2'));
				}else{
					world_map[i][j].id = 0.3;
					temp_map.add(game.add.sprite(nx, ny, 'grass3'));
				}
			}else if(world_map[i][j].id<1){
				if(world_map[i][j].id==0.1){
					temp_map.add(game.add.sprite(nx, ny, 'grass'));
				}else if(map[i][j].id==0.2){
					temp_map.add(game.add.sprite(nx, ny, 'grass2'));
				}else{
					temp_map.add(game.add.sprite(nx, ny, 'grass3'));
				}
			}else if(world_map[i][j].id==1){
				temp_map.add(game.add.sprite(nx, ny, 'grass'));
				var r = rnd(1,4);
				if(r>1){
					world_map[i][j].id = 1.1;
					temp_map.add(game.add.sprite(nx, ny, 'tree'));
				}else{
					world_map[i][j].id = 1.2;
					temp_map.add(game.add.sprite(nx, ny, 'tree2'));
				}
			}else if(world_map[i][j].id<2){
				temp_map.add(game.add.sprite(nx, ny, 'grass'));
				if(world_map[i][j].id == 1.1){
					temp_map.add(game.add.sprite(nx, ny, 'tree'));
				}else if(world_map[i][j].id == 1.2){
					temp_map.add(game.add.sprite(nx, ny, 'tree2'));
				}else if(world_map[i][j].id == 1.3){
					world_map[i][j].id = 1.3;
					temp_map.add(game.add.sprite(nx, ny, 'tree3'));
				}else if(world_map[i][j].id == 1.4){
					world_map[i][j].id = 1.4;
					temp_map.add(game.add.sprite(nx, ny, 'tree4'));
				}else if(world_map[i][j].id == 1.5){
					world_map[i][j].id = 1.5;
					temp_map.add(game.add.sprite(nx, ny, 'tree5'));
				}
			}else if(world_map[i][j].id==2){
				temp_map.add(game.add.sprite(nx, ny, 'sand'));
			}else if(world_map[i][j].id==3){
				r = rnd(1,3);
				if(r==1){
					world_map[i][j].id = 3.1;
					temp_map.add(game.add.sprite(nx, ny, 'water'));
				}else if(r==2){
					world_map[i][j].id = 3.2;
					temp_map.add(game.add.sprite(nx, ny, 'water2'));
				}else{
					world_map[i][j].id = 3.3;
					temp_map.add(game.add.sprite(nx, ny, 'water3'));
				}
			}else if(world_map[i][j].id<4){
				if(world_map[i][j].id==3.1){
					temp_map.add(game.add.sprite(nx, ny, 'water'));
				}else if(world_map[i][j].id==3.2){
					temp_map.add(game.add.sprite(nx, ny, 'water2'));
				}else{
					temp_map.add(game.add.sprite(nx, ny, 'water3'));
				}
			}
		}
	}
}

function make_mini_map(){
	if(map_prop.min_map==true){
		var sc=game.height/(map_prop.tile_size*map_prop.height);
		if(map_prop.game_x/(map_prop.tile_size*map_prop.width)<sc){
			sc=mgame.width/(map_prop.tile_size*map_prop.width);
		}
		sc/=3;
		for(var i=0;i<map_prop.height;i++){
			for(var j=0;j<map_prop.width;j++){
				var nx = j*(map_prop.tile_size*sc);
				var ny = i*(map_prop.tile_size*sc)+map_prop.tile_size*sc*map_prop.height*2;
				if(world_map[i][j].id==0.1){
					var main = game.add.sprite(nx, ny, 'grass');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==0.2){
					var main = game.add.sprite(nx, ny, 'grass2');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==0.3){
					var main = game.add.sprite(nx, ny, 'grass3');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==1.1){
					var main = game.add.sprite(nx, ny, 'grass3');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
					var main = game.add.sprite(nx, ny, 'tree');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==1.2){
					var main = game.add.sprite(nx, ny, 'grass3');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
					var main = game.add.sprite(nx, ny, 'tree2');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==2){
					var main = game.add.sprite(nx, ny, 'sand');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==3.1){
					var main = game.add.sprite(nx, ny, 'water');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==3.2){
					var main = game.add.sprite(nx, ny, 'water2');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);
				}else if(world_map[i][j].id==3.3){
					var main = game.add.sprite(nx, ny, 'water3');
					main.scale.setTo(sc,sc);
					main.fixedToCamera=true;
					main.alpha=0.5;
					min_map.add(main);	
				}
			}
		}
	}
}

function spawnPlayer(x,y,name){
	var tpx = x;
	var tpy = y;
	while(tpy>=0){
		if(world_map[tpy][tpx].id<1 || (world_map[tpy][tpx].id>=2 && world_map[tpy][tpx].id<3)){
			var gtpx = tpx*map_prop.tile_size;
			var gtpy = tpy*map_prop.tile_size;
			player.sprigin = game.add.sprite(gtpx, gtpy, name);
			player.x=tpx;
			player.y=tpy;
			player.sprigin.animations.add('up', [0], 10, true);
			player.sprigin.animations.add('right', [1], 10, true);
			player.sprigin.animations.add('down', [2], 10, true);
			player.sprigin.animations.add('left', [3], 10, true);
			break;
		}
		tpx = rnd(0,map_prop.width-2);
		tpy = rnd(0,map_prop.height-2);
	}

}



