var game = new Phaser.Game(1248, 672, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map_prop = {
	width : 20,
	height : 20,
	tile_size : 48,
	//(game_x/tile_size)%2==1 un (game_y/tile_size)%2==1
	game_x : 1248,
	game_y : 672,
	field : 0,
	cord_x : 0,
	cord_y : 0,
	max_y : -1,
	max_x : -1,
	world_size_x : 10,
	world_size_y : 5,
	min_map : true
};

var night;
var turn;
var this_map;

var boot = {
	new_game : 0,
	new_sprite : 0,
	load_game : 0,
	load_sprite : 0
}

var x_buttons = {
	space : 0,
	space_presed : false,
	pause : 0,
	pause_presed : false,
	pause_down : false,
	pause_do : true,
	mini_map : 0,
	mini_map_presed : false,
	esc : 0,
	esc_presed : false,
	one : 0,
	one_presed : false,
	two : 0,
	two_presed : false,
	three : 0,
	three_presed : false
}

var int=14;
var string;

var player = {
	sprite : 0,
	x : 0,
	y : 0,
	hp_max : 30,
	hp : 30,
	hp_re : 1,
	hp_ui : 0,
	ap_max : 20,
	ap : 20,
	ap_re : 1,
	ap_ui : 0,
	dir : 'z'
};

var move_rule = {
	l : false,
	r : false,
	u : false,
	d : false,
	x_ass : false,
	y_ass : false
};

var ui = {
	pause : 0,
	inventory_button : 0,
	inventory_button_x : 0,
	inventory_button_y : 0,
	inventory_button_down : false,
	map_button : 0,
	map_button_x : 0,
	map_button_y : 0,
	map_button_down : false

};

var inventory = {
	icon_log : 0,
	logText : 0,
	log : 4,
	icon_apple : 0,
	appleText : 0,
	apple : 4
}

var map;

var min_map;

var is_map;

var waters=0;

function preload() {
	game.stage.backgroundColor = '#666666';


	//Tiles
	game.load.image('grass', 'assets/tiles/grass.png');  //grass
	game.load.image('grass2', 'assets/tiles/grass2.png');  //grass2
	game.load.image('grass3', 'assets/tiles/grass3.png');  //grass3
	game.load.image('floor', 'assets/tiles/floor.png');  //floor
	game.load.image('sand', 'assets/tiles/sand.png');  //sand
	game.load.image('tree', 'assets/tiles/tree.png');  //tree
	game.load.image('tree2', 'assets/tiles/tree2.png');  //tree2
	game.load.image('tree3', 'assets/tiles/tree3.png');  //tree3
	game.load.image('water', 'assets/tiles/water.png'); //water
	game.load.image('water2', 'assets/tiles/water2.png'); //water2
	game.load.image('water3', 'assets/tiles/water3.png'); //water3
	game.load.image('wall', 'assets/tiles/wall.png'); //wall

	//Characters
	game.load.spritesheet('man', 'assets/tiles/man.png', 48, 48, 4);  //sleep

	//Buttond & ui
	game.load.image('night', 'assets/ui/night.png'); //overlayer
	game.load.image('pause', 'assets/ui/pause.png'); //pauselayer
	game.load.image('new_button', 'assets/ui/buttons/new_button.png');  //new game button
	game.load.image('load_button', 'assets/ui/buttons/load_button.png'); //load game button
	game.load.image('log', 'assets/ui/icons/log.png');  //log icon
	game.load.image('apple', 'assets/ui/icons/apple.png');  //apple icon
	game.load.image('inventory_button', 'assets/ui/buttons/inventory_button.png'); //inventory button
	game.load.image('map_button', 'assets/ui/buttons/map_button.png'); //map button
	game.load.image('HP', 'assets/ui/buttons/HP.png'); //hp ui
	game.load.image('AP', 'assets/ui/buttons/AP.png'); //ap ui

}

function create() {

	//string = ""+int;
	//alert(string);
	//alert(string-"");
	boot.load_sprite = game.add.sprite(map_prop.game_x/2-104.5,map_prop.game_y/2-63,'load_button');
	boot.new_sprite = game.add.sprite(map_prop.game_x/2-102,map_prop.game_y/2+10,'new_button');
	//game.time.events.loop(Phaser.Timer.SECOND, setTime, this);

}

function setTime() {
	if(turn.time>=1400){
		turn.pas*=-1;
		turn.mid=true;
		grow();
	}else if(turn.time<=-100){
		turn.pas*=-1;
		turn.mid=true;
		grow();
	}
	night.alpha = 1*(turn.time/1200);
	if(night.alpha>=0.9){
		night.alpha = 0.9;
	}else if(night.alpha<0){
		night.alpha = 0;
	}
}

function update() {
	var mouse = {
		local : game.input.activePointer,
		local_down : false
	};
	x_buttons.pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
	x_buttons.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	x_buttons.one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	x_buttons.two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	x_buttons.three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	//x_buttons.mini_map = game.input.keyboard.addKey(Phaser.Keyboard.M);
	if(x_buttons.pause_presed==true && x_buttons.pause_down==false){
	    if(map_prop.min_map!=true){
	    	ui.map_button.alpha=0.5;
	    }else if(mouse.local.x>=ui.map_button_x && mouse.local.x<=ui.map_button_x+96 && mouse.local.y>=ui.map_button_y && mouse.local.y<=ui.map_button_y+48){
	        ui.map_button.alpha=1;
	        if(mouse.local.isDown && ui.map_button_down==false){
	        	ui.map_button_down=true;
	        	x_buttons.pause_do=false;
	        	min_map = game.add.group();
	        	make_mini_map(1);
	        }
	    }else if(ui.map_button_down==false){
	    	ui.map_button.alpha=0.8;
	    }else if(x_buttons.esc.isDown && x_buttons.esc_presed==false){
	    	min_map.destroy();
	    	min_map=0;
	    	ui.map_button_down=false;
	    	x_buttons.esc_presed=true;
	    	x_buttons.pause_do=true;
	    }
	    if(mouse.local.x>=ui.inventory_button_x && mouse.local.x<=ui.inventory_button_x+166 && mouse.local.y>=ui.inventory_button_y && mouse.local.y<=ui.inventory_button_y+48){
	        ui.inventory_button.alpha=1;
	        if(mouse.local.isDown && ui.inventory_button_down==false){
	        	x_buttons.pause_do=false;
	        	ui.inventory_button_down=true;
	        }
	    }else if(ui.inventory_button_down==false){
	    	ui.inventory_button.alpha=0.8;
	    }else if(x_buttons.esc.isDown && x_buttons.esc_presed==false){
	    	ui.inventory_button_down=false;
	    	x_buttons.esc_presed=true;
	    	x_buttons.pause_do=true;
	    }
	    if(x_buttons.esc.isUp){
	    	x_buttons.esc_presed=false;
	    }
	    if(x_buttons.pause.isDown && x_buttons.pause_presed==true && x_buttons.pause_down==false && x_buttons.pause_do==true){
			x_buttons.pause_presed=false;
			ui.pause.visible = false;
			ui.inventory_button.visible = false;
			ui.map_button.visible = false;
			x_buttons.pause_down = true;
			setTime();
	    }else if(x_buttons.pause.isUp){
	    	x_buttons.pause_down = false;
	    }
	}else if(boot.new_game==1){
		
		//Set world bounds and creates cursors
		game.world.setBounds(0-(map_prop.game_x-map_prop.tile_size)/2, 0-(map_prop.game_y-map_prop.tile_size)/2, map_prop.width*map_prop.tile_size+(map_prop.game_x-map_prop.tile_size), map_prop.height*map_prop.tile_size+(map_prop.game_y-map_prop.tile_size));

		//Generates a map
		turn = {
			time : rnd(0,1400),
			pas : 1,
			mid : false
		}
		is_map = new Array();
		gen_map(is_map.length,0);
		map = new Array();
		this_map = game.add.group();
		is_map[map_prop.cord_y][map_prop.cord_x].exist=true;
		generate_map(map_prop.width,map_prop.height,true,true,map_prop.cord_x,map_prop.cord_y);
		map_prop.max_y++;
		map_prop.max_x++;
		//Draw all the map tiles
		//map_prop.field = game.add.sprite(0, 0, 'grass3');
		//map_prop.field.scale.setTo(map_prop.width, map_prop.height);
		
		build_map(map_prop.cord_x,map_prop.cord_y);
		spawnPlayer(0,0,'man',map_prop.cord_x,map_prop.cord_y);
		night = game.add.sprite(0, 0,'night');
		night.scale.setTo(map_prop.game_x/map_prop.tile_size, map_prop.game_y/map_prop.tile_size);
		night.fixedToCamera = true;
		inventory.icon_log = game.add.sprite(10,70,'log');
		inventory.icon_log.scale.setTo(40/128,40/128);
		inventory.icon_log.fixedToCamera=true;
		inventory.logText = game.add.text(60, 70, inventory.log, { fontSize: '40px', fill: '#7F5A1C' });
		inventory.logText.fixedToCamera=true;
		inventory.icon_apple = game.add.sprite(10,120,'apple');
		inventory.icon_apple.scale.setTo(40/24,40/24);
		inventory.icon_apple.fixedToCamera=true;
		inventory.appleText = game.add.text(60, 120, inventory.apple, { fontSize: '40px', fill: '#7F5A1C' });
		inventory.appleText.fixedToCamera=true;
		player.hp_ui = game.add.sprite(10,10,'HP');
		player.hp_ui.fixedToCamera=true;
		player.ap_ui = game.add.sprite(10,40,'AP');
		player.ap_ui.fixedToCamera=true;
		ui.pause = game.add.sprite(map_prop.game_x/2-380, map_prop.game_y/2-312, 'pause');
		ui.pause.fixedToCamera = true;
		ui.pause.visible = false;
		ui.inventory_button = game.add.sprite(map_prop.game_x/2-83, map_prop.game_y/2-272, 'inventory_button');
		ui.inventory_button_x=map_prop.game_x/2-83;
		ui.inventory_button_y=map_prop.game_y/2-272;
		ui.inventory_button.fixedToCamera = true;
		ui.inventory_button.visible = false;
		ui.map_button = game.add.sprite(map_prop.game_x/2-48, map_prop.game_y/2-204, 'map_button');
		ui.map_button_x=map_prop.game_x/2-48;
		ui.map_button_y=map_prop.game_y/2-204;
		ui.map_button.fixedToCamera = true;
		ui.map_button.visible = false;
		min_map = game.add.group();
		setTime();
		game.camera.x = player.x*map_prop.tile_size-(map_prop.game_x-map_prop.tile_size)/2;
		game.camera.y = player.y*map_prop.tile_size-(map_prop.game_y-map_prop.tile_size)/2;

		boot.new_game=2;
		
	}else if(boot.load_game==1){

	}else if(boot.new_game==2 || boot.load_game==2){
		x_buttons.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		var cursors = game.input.keyboard.createCursorKeys();
		/*if(mouse.local.isDown && mouse.local_down==false){
			mouse.local_down=true;
			var x=Math.floor(mouse.local.x/map_prop.tile_size);
			var y=Math.floor(mouse.local.y/map_prop.tile_size);
			console.log(Math.floor(mouse.local.x-200));
			console.log(Math.floor(mouse.local.y-200));
			if((x-1==player.x || x+1==player.x) && (y-1==player.y || y+1==player.y)){
				map[y][x].id=0.1;
				cut_tree((x-map_prop.width*map_prop.cord_x)*map_prop.tile_size,(y-1-map_prop.height*map_prop.cord_y)*map_prop.tile_size,map_prop.cord_x,map_prop.cord_y);
			}
		}else if(mouse.local.isUp){
			mouse.local_down=false;
		}*/
		if (x_buttons.pause.isDown && x_buttons.pause_presed==false && x_buttons.pause_down==false){
			x_buttons.pause_presed=true;
			ui.pause.visible = true;
			ui.inventory_button.visible = true;
			ui.map_button.visible = true;
			x_buttons.pause_down = true;
			night.alpha=1;
	    }else if(x_buttons.pause.isUp){
	    	x_buttons.pause_down = false;
	    }
	    /*if (x_buttons.mini_map.isDown && x_buttons.mini_map_presed==false){
			x_buttons.mini_map_presed=true;
			make_mini_map(0);
	    }else if(x_buttons.mini_map.isUp){
	    	x_buttons.mini_map_presed=false;
	    }*/
		if (x_buttons.space.isDown && x_buttons.space_presed==false){
			if(player.dir=='z' && player.y>map_prop.height*map_prop.cord_y){
				if(map[player.y-1][player.x].id>=1 && map[player.y-1][player.x].id<2){
					cut_tree((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size,(player.y-1-map_prop.height*map_prop.cord_y)*map_prop.tile_size,map_prop.cord_x,map_prop.cord_y);
					x_buttons.space_presed=true;
			        turn.time+=turn.pas*2;
					setTime();
					if(map[player.y-1][player.x].id==1.1 || map[player.y-1][player.x].id==1.3){
						map[player.y-1][player.x].id=0.1;
					}else if(map[player.y-1][player.x].id==1.2){
						map[player.y-1][player.x].id=1.1;
						this_map.add(game.add.sprite((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-1-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree'));
					}
				}
			}else if(player.dir=='s' && player.y<map_prop.height*(map_prop.cord_y+1)-1){
				if(map[player.y+1][player.x].id>=1 && map[player.y+1][player.x].id<2){
					cut_tree((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size,(player.y+1-map_prop.height*map_prop.cord_y)*map_prop.tile_size,map_prop.cord_x,map_prop.cord_y);
					x_buttons.space_presed=true;
			        turn.time+=turn.pas*2;
					setTime();
					if(map[player.y+1][player.x].id==1.1 || map[player.y+1][player.x].id==1.3){
						map[player.y+1][player.x].id=0.1;
					}else if(map[player.y+1][player.x].id==1.2){
						map[player.y+1][player.x].id=1.1;
						this_map.add(game.add.sprite((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y+1-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree'));
					}
				}
				
			}else if(player.dir=='w' && player.x>map_prop.width*map_prop.cord_x){
				if(map[player.y][player.x-1].id>=1 && map[player.y][player.x-1].id<2){
					cut_tree((player.x-1-map_prop.width*map_prop.cord_x)*map_prop.tile_size,(player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size,map_prop.cord_x,map_prop.cord_y);
					x_buttons.space_presed=true;
			        turn.time+=turn.pas*2;
					setTime();
					if(map[player.y][player.x-1].id==1.1 || map[player.y][player.x-1].id==1.3){
						map[player.y][player.x-1].id=0.1;
					}else if(map[player.y][player.x-1].id==1.2){
						map[player.y][player.x-1].id=1.1;
						this_map.add(game.add.sprite((player.x-1-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree'));
					}
				}
				
			}else if(player.dir=='e' && player.x<map_prop.width*(map_prop.cord_x+1)-1){
				if(map[player.y][player.x+1].id>=1 && map[player.y][player.x+1].id<2){
					cut_tree((player.x+1-map_prop.width*map_prop.cord_x)*map_prop.tile_size,(player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size,map_prop.cord_x,map_prop.cord_y);
					x_buttons.space_presed=true;
			        turn.time+=turn.pas*2;
			        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
					setTime();
					if(map[player.y][player.x+1].id==1.1 || map[player.y][player.x+1].id==1.3){
						map[player.y][player.x+1].id=0.1;
					}else if(map[player.y][player.x+1].id==1.2){
						map[player.y][player.x+1].id=1.1;
						this_map.add(game.add.sprite((player.x+1-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree'));
					}
				}
				
			}
	    }else if(x_buttons.space.isUp){
	    	 x_buttons.space_presed=false;
	    }
	    if (x_buttons.one.isDown && x_buttons.one_presed==false){
	    	if(player.dir=='z' && player.y>map_prop.height*map_prop.cord_y){
				if(map[player.y-1][player.x].id<1 && inventory.log>=4){
					inventory.log-=4;
					inventory.logText.text = inventory.log;
					x_buttons.space_presed=true;
					map[player.y-1][player.x].id=4.1;
					this_map.add(game.add.sprite((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-1-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'wall'));
				}
			}else if(player.dir=='s' && player.y<map_prop.height*(map_prop.cord_y+1)-1){
				if(map[player.y+1][player.x].id<1 && inventory.log>=4){
					inventory.log-=4;
					inventory.logText.text = inventory.log;
					x_buttons.space_presed=true;
					map[player.y+1][player.x].id=4.1;
					this_map.add(game.add.sprite((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y+1-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'wall'));
				}
				
			}else if(player.dir=='w' && player.x>map_prop.width*map_prop.cord_x){
				if(map[player.y][player.x-1].id<1 && inventory.log>=4){
					inventory.log-=4;
					inventory.logText.text = inventory.log;
					x_buttons.space_presed=true;
					map[player.y][player.x-1].id=4.1;
					this_map.add(game.add.sprite((player.x-1-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'wall'));
				}
				
			}else if(player.dir=='e' && player.x<map_prop.width*(map_prop.cord_x+1)-1){
				if(map[player.y][player.x+1].id<1 && inventory.log>=4){
					inventory.log-=4;
					inventory.logText.text = inventory.log;
					x_buttons.space_presed=true;
					map[player.y][player.x+1].id=4.1;
					this_map.add(game.add.sprite((player.x+1-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'wall'));
				}
			}
	    }else if(x_buttons.one.isUp){
	    	 x_buttons.one_presed=false;
	    }
	    if (x_buttons.two.isDown && x_buttons.two_presed==false){
			if(player.dir=='z' && player.y>map_prop.height*map_prop.cord_y){
				if(map[player.y-1][player.x].id<1 && inventory.apple>=1){
					inventory.apple--;
					inventory.appleText.text = inventory.apple;
					x_buttons.space_presed=true;
					map[player.y-1][player.x].id=1.3;
					this_map.add(game.add.sprite((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-1-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree3'));
				}
			}else if(player.dir=='s' && player.y<map_prop.height*(map_prop.cord_y+1)-1){
				if(map[player.y+1][player.x].id<1 && inventory.apple>=1){
					inventory.apple--;
					inventory.appleText.text = inventory.apple;
					x_buttons.space_presed=true;
					map[player.y+1][player.x].id=1.3;
					this_map.add(game.add.sprite((player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y+1-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree3'));
				}
				
			}else if(player.dir=='w' && player.x>map_prop.width*map_prop.cord_x){
				if(map[player.y][player.x-1].id<1 && inventory.apple>=1){
					inventory.apple--;
					inventory.appleText.text = inventory.apple;
					x_buttons.space_presed=true;
					map[player.y][player.x-1].id=1.3;
					this_map.add(game.add.sprite((player.x-1-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree3'));
				}
				
			}else if(player.dir=='e' && player.x<map_prop.width*(map_prop.cord_x+1)-1){
				if(map[player.y][player.x+1].id<1 && inventory.apple>=1){
						inventory.apple--;
						inventory.appleText.text = inventory.apple;
						x_buttons.space_presed=true;
						map[player.y][player.x+1].id=1.3;
						this_map.add(game.add.sprite((player.x+1-map_prop.width*map_prop.cord_x)*map_prop.tile_size, (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size, 'tree3'));
				}
				
			}
	    }else if(x_buttons.two.isUp){
	    	 x_buttons.two_presed=false;
	    }
		if (cursors.up.isDown && y_ass==false){
	        if(player.y>0 && (player.y)%map_prop.height==0 && map[player.y-1][player.x].id<0){
	        	generate_map(map_prop.width,map_prop.height,true,true,map_prop.cord_x,map_prop.cord_y-1);
	        }
	        if(player.y>map_prop.height*map_prop.cord_y && player.dir=='z'){
	        	if(map[player.y-1][player.x].id<1 || (map[player.y-1][player.x].id<3 && map[player.y-1][player.x].id>=2)){
	        		player.sprite.y -= map_prop.tile_size;
		        	player.y--;
		        	game.camera.y -= map_prop.tile_size;
		        	turn.time+=turn.pas;
		        	player.ap+=player.ap_re;
			        if(player.ap>player.ap_max){
			        	player.ap=player.ap_max;
			        }
			        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
			        setTime();
		        }
	        }else if(player.y>0 && (((map[player.y-1][player.x].id<3 && map[player.y-1][player.x].id>=2) || map[player.y-1][player.x].id<1) && player.dir=='z')){
				is_map[map_prop.cord_y-1][map_prop.cord_x].exist=true;
				this_map.destroy();
	        	this_map = game.add.group();
	        	build_map(map_prop.cord_x,map_prop.cord_y-1);
	        	player.sprite.destroy();
	        	spawnPlayer(player.x,player.y-1,'man',map_prop.cord_x,map_prop.cord_y-1);
	        	map_prop.cord_y--;
	        	game.camera.x = (player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size-(map_prop.game_x-map_prop.tile_size)/2;
				game.camera.y = (player.y+map_prop.height*map_prop.cord_y)*map_prop.tile_size-(map_prop.game_y-map_prop.tile_size)/2;
	        	turn.time+=turn.pas;
	        	player.ap+=player.ap_re;
		        if(player.ap>player.ap_max){
		        	player.ap=player.ap_max;
		        }
		        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
		        setTime();
		        night.bringToTop(); 
				ui.pause.bringToTop(); 
				ui.inventory_button.bringToTop();
				ui.map_button.bringToTop();
				inventory.icon_log.bringToTop();
				inventory.logText.bringToTop();
				inventory.icon_apple.bringToTop();
				inventory.appleText.bringToTop();
				player.hp_ui.bringToTop();
				player.ap_ui.bringToTop();
	        }
	        player.sprite.animations.play('up');
	        player.dir='z';
	        move_rule.u=true;
	        y_ass=true;
	    }else if(cursors.up.isUp && move_rule.d==false){
	    	 y_ass=false;
	    	 move_rule.u=false;
	    }
	    if (cursors.down.isDown && y_ass==false){
	    	if((player.y+1)%map_prop.height==0 && map[player.y+1][player.x].id<0){
	        	generate_map(map_prop.width,map_prop.height,true,true,map_prop.cord_x,map_prop.cord_y+1);
	        	if(map_prop.cord_y+1>map_prop.max_y){
	        		map_prop.max_y++;
	        	}
	        }
	        if(player.y<map_prop.height*(map_prop.cord_y+1)-1 && player.dir=='s'){
	        	if(map[player.y+1][player.x].id<1 || (map[player.y+1][player.x].id<3 && map[player.y+1][player.x].id>=2)){
	        		player.sprite.y += map_prop.tile_size;
		        	player.y++;
		        	game.camera.y += map_prop.tile_size;
		        	turn.time+=turn.pas;
		        	player.ap+=player.ap_re;
			        if(player.ap>player.ap_max){
			        	player.ap=player.ap_max;
			        }
			        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
			        setTime();
	        	}
	        }else if(((map[player.y+1][player.x].id<3 && map[player.y+1][player.x].id>=2) || map[player.y+1][player.x].id<1) && player.dir=='s'){
				if(map_prop.cord_y+1==100){
					gen_map(is_map.length,is_map[0].length);
				}
				is_map[map_prop.cord_y+1][map_prop.cord_x].exist=true;
				this_map.destroy();
	        	this_map = game.add.group();
	        	build_map(map_prop.cord_x,map_prop.cord_y+1);
	        	player.sprite.destroy();
	        	spawnPlayer(player.x,player.y+1,'man',map_prop.cord_x,map_prop.cord_y+1);
	        	map_prop.cord_y++;
	        	game.camera.x = (player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size-(map_prop.game_x-map_prop.tile_size)/2;
				game.camera.y = (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size-(map_prop.game_y-map_prop.tile_size)/2;
	        	turn.time+=turn.pas;
	        	player.ap+=player.ap_re;
		        if(player.ap>player.ap_max){
		        	player.ap=player.ap_max;
		        }
		        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
		        setTime();
		        night.bringToTop(); 
				ui.pause.bringToTop(); 
				ui.inventory_button.bringToTop();
				ui.map_button.bringToTop();
				inventory.icon_log.bringToTop();
				inventory.logText.bringToTop();
				inventory.icon_apple.bringToTop();
				inventory.appleText.bringToTop();
				player.hp_ui.bringToTop();
				player.ap_ui.bringToTop();
	        }
	        player.sprite.animations.play('down');
	        player.dir='s';
	        move_rule.d=true;
	        y_ass=true;
	    }else if(cursors.down.isUp && move_rule.u==false){
	    	 move_rule.d=false;
	    	 y_ass=false;
	    }
	    if (cursors.left.isDown && x_ass==false){
	    	if(player.x>0 && (player.x)%map_prop.width==0 && map[player.y][player.x-1].id<0){
	        	generate_map(map_prop.width,map_prop.height,true,true,map_prop.cord_x-1,map_prop.cord_y);
	        }
	        if(player.x>map_prop.width*map_prop.cord_x && player.dir=='w'){
	        	if(map[player.y][player.x-1].id<1 || (map[player.y][player.x-1].id>=2 && map[player.y][player.x-1].id<3)){
	        		player.sprite.x -= map_prop.tile_size;
		        	player.x--;
		        	game.camera.x -= map_prop.tile_size;
		        	turn.time+=turn.pas;
		        	player.ap+=player.ap_re;
			        if(player.ap>player.ap_max){
			        	player.ap=player.ap_max;
			        }
			        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
			        setTime();
	        	}
	        }else if(player.x>0 && (((map[player.y][player.x-1].id>=2 && map[player.y][player.x-1].id<3) || map[player.y][player.x-1].id<1)) && player.dir=='w'){
				is_map[map_prop.cord_y][map_prop.cord_x-1].exist=true;
				this_map.destroy();
	        	this_map = game.add.group();
	        	build_map(map_prop.cord_x-1,map_prop.cord_y);
	        	player.sprite.destroy();
	        	spawnPlayer(player.x-1,player.y,'man',map_prop.cord_x-1,map_prop.cord_y);
	        	map_prop.cord_x--;
	        	game.camera.x = (player.x+map_prop.width*map_prop.cord_x)*map_prop.tile_size-(map_prop.game_x-map_prop.tile_size)/2;
				game.camera.y = (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size-(map_prop.game_y-map_prop.tile_size)/2;
	        	turn.time+=turn.pas;
	        	player.ap+=player.ap_re;
		        if(player.ap>player.ap_max){
		        	player.ap=player.ap_max;
		        }
		        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
		        setTime();
		        night.bringToTop(); 
				ui.pause.bringToTop(); 
				ui.inventory_button.bringToTop();
				ui.map_button.bringToTop();
				inventory.icon_log.bringToTop();
				inventory.logText.bringToTop();
				inventory.icon_apple.bringToTop();
				inventory.appleText.bringToTop();
				player.hp_ui.bringToTop();
				player.ap_ui.bringToTop();
	        }
	        player.sprite.animations.play('left');
	        player.dir='w';
	        move_rule.l=true;
	        x_ass=true;
	    }else if(cursors.left.isUp && move_rule.r==false){
	    	 move_rule.l=false;
	    	 x_ass=false;
	    }
	    if (cursors.right.isDown && x_ass==false){
	    	if((player.x+1)%map_prop.width==0 && map[player.y][player.x+1].id<0){
	        	generate_map(map_prop.width,map_prop.height,true,true,map_prop.cord_x+1,map_prop.cord_y);
	        	if(map_prop.cord_x+1>map_prop.max_x){
	        		map_prop.max_x++;
	        	}
	        }
	        if(player.x<map_prop.width*(map_prop.cord_x+1)-1 && player.dir=='e'){
	        	if(map[player.y][player.x+1].id<1 || (map[player.y][player.x+1].id<3 && map[player.y][player.x+1].id>=2)){
	        		game.camera.x += map_prop.tile_size;
		        	player.sprite.x += map_prop.tile_size;
		        	player.x++;
		        	turn.time+=turn.pas;
		        	player.ap+=player.ap_re;
			        if(player.ap>player.ap_max){
			        	player.ap=player.ap_max;
			        }
			        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
			        setTime();
	        	}
	        	
	        }else if(((map[player.y][player.x+1].id<3 && map[player.y][player.x+1].id>=2) || map[player.y][player.x+1].id<1) && player.dir=='e'){
				if(map_prop.cord_x+1==100){
					gen_map(is_map.length,is_map[0].length);
				}
				is_map[map_prop.cord_y][map_prop.cord_x+1].exist=true;
				this_map.destroy();
	        	this_map = game.add.group();
	        	build_map(map_prop.cord_x+1,map_prop.cord_y);
	        	player.sprite.destroy();
	        	spawnPlayer(player.x+1,player.y,'man',map_prop.cord_x+1,map_prop.cord_y);
	        	map_prop.cord_x++;
	        	game.camera.x = (player.x-map_prop.width*map_prop.cord_x)*map_prop.tile_size-(map_prop.game_x-map_prop.tile_size)/2;
				game.camera.y = (player.y-map_prop.height*map_prop.cord_y)*map_prop.tile_size-(map_prop.game_y-map_prop.tile_size)/2;
	        	turn.time+=turn.pas;
	        	player.ap+=player.ap_re;
		        if(player.ap>player.ap_max){
		        	player.ap=player.ap_max;
		        }
		        player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
		        setTime();
		        night.bringToTop(); 
				ui.pause.bringToTop(); 
				ui.inventory_button.bringToTop();
				ui.map_button.bringToTop();
				inventory.icon_log.bringToTop();
				inventory.logText.bringToTop();
				inventory.icon_apple.bringToTop();
				inventory.appleText.bringToTop();
				player.hp_ui.bringToTop();
				player.ap_ui.bringToTop();
	        }
	        player.sprite.animations.play('right');
	        player.dir='e';
	        move_rule.r=true;
	        x_ass=true;
	    }else if(cursors.right.isUp && move_rule.l==false){
	    	 move_rule.r=false;
	    	 x_ass=false;
	    }
	}else{
		if(localStorage.getItem('IsSaved')!=1){
			boot.load_sprite.alpha=0.5;
		}else if (mouse.local.x>=boot.load_sprite.x && mouse.local.x<=boot.load_sprite.x+209 && mouse.local.y>=boot.load_sprite.y && mouse.local.y<=boot.load_sprite.y+53){
	        boot.load_sprite.alpha=1;
	        if(mouse.local.isDown){
	        	boot.load_game=1;
	        	boot.load_sprite.destroy();
	        	boot.new_sprite.destroy();
	        }
	    }else{
	    	boot.load_sprite.alpha=0.8;
	    }
	    if (mouse.local.x>=boot.new_sprite.x && mouse.local.x<=boot.new_sprite.x+204 && mouse.local.y>=boot.new_sprite.y && mouse.local.y<=boot.new_sprite.y+53){
	        boot.new_sprite.alpha=1;
	        if(mouse.local.isDown){
	        	boot.new_game=1;
	        	boot.load_sprite.destroy();
	        	boot.new_sprite.destroy();
	        }
	    }else{
	    	boot.new_sprite.alpha=0.8;
	    }
	}

}
