var game = new Phaser.Game(1248, 672, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map_prop = {
	width : 40,
	height : 40,
	tile_size : 48,
	//(game_x/tile_size)%2==1 un (game_y/tile_size)%2==1
	game_x : 1248,
	game_y : 672,
	field : 0,
	cord_x : 0,
	cord_y : 0,
	world_size : 15,
	min_map : true
};

var night;
var turn;

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
	mini_map : 0,
	mini_map_presed : false,
	esc : 0,
	esc_presed : false
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
	inventory_button_down : false,
	map_button : 0,
	map_button_x : 0,
	map_button_y : 0,
	map_button_down : false
};

var map;

var min_map;

var waters=0;

function preload() {
	game.stage.backgroundColor = '#666666';


	//Tiles
	game.load.image('grass', 'assets/tiles/grass.png');  //grass
	game.load.image('grass2', 'assets/tiles/grass2.png');  //grass2
	game.load.image('grass3', 'assets/tiles/grass3.png');  //grass3
	game.load.image('sand', 'assets/tiles/sand.png');  //sand
	game.load.image('tree', 'assets/tiles/tree.png');  //tree
	game.load.image('tree2', 'assets/tiles/tree2.png');  //tree2
	game.load.image('water', 'assets/tiles/water.png'); //water
	game.load.image('water2', 'assets/tiles/water2.png'); //water2
	game.load.image('water3', 'assets/tiles/water3.png'); //water3

	//Characters
	game.load.spritesheet('man', 'assets/tiles/man.png', 48, 48, 4);  //sleep

	//Buttond & ui
	game.load.image('night', 'assets/ui/night.png'); //overlayer
	game.load.image('pause', 'assets/ui/pause.png'); //pauselayer
	game.load.image('new_button', 'assets/ui/buttons/new_button.png');  //new game button
	game.load.image('load_button', 'assets/ui/buttons/load_button.png'); //load game button
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
	if(turn.time>=230){
		turn.pas*=-1;
		//turn.time-=(turn.time-48);
	}else if(turn.time<=-10){
		turn.pas*=-1;
		//turn.time-=(turn.time*2);
	}
	//alert(turn.time);
	//alert(night.alpha);
	night.alpha = 1*(turn.time/220);
	if(night.alpha>1){
		night.alpha = 1;
	}else if(night.alpha<0){
		night.alpha = 0;
	}
	//alert(night.alpha);
}

function update() {
	var mouse = {
		local : game.input.activePointer
	};
	x_buttons.pause = game.input.keyboard.addKey(Phaser.Keyboard.P);
	x_buttons.esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	//x_buttons.mini_map = game.input.keyboard.addKey(Phaser.Keyboard.M);
	if(x_buttons.pause_presed==true && x_buttons.pause_down==false){
	    if(map_prop.min_map!=true){
	    	ui.map_button.alpha=0.5;
	    }else if(mouse.local.x>=ui.map_button_x && mouse.local.x<=ui.map_button_x+96 && mouse.local.y>=ui.map_button_y && mouse.local.y<=ui.map_button_y+48){
	        ui.map_button.alpha=1;
	        if(mouse.local.isDown && ui.map_button_down==false){
	        	ui.map_button_down=true;
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
	    }
	    if(x_buttons.esc.isUp){
	    	x_buttons.esc_presed=false;
	    }
	    if(x_buttons.pause.isDown && x_buttons.pause_presed==true && x_buttons.pause_down==false){
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
		map=generate_map(map_prop.width,map_prop.height,true,true);
		
		//Draw all the map tiles
		//map_prop.field = game.add.sprite(0, 0, 'grass3');
		//map_prop.field.scale.setTo(map_prop.width, map_prop.height);
		map=build_map(map_prop.cord_x,map_prop.cord_y);
		spawnPlayer(0,0,'man',map_prop.cord_x,map_prop.cord_y);
		turn = {
			time : rnd(0,200),
			pas : 1
		}
		night = game.add.sprite(0, 0,'night');
		night.scale.setTo(map_prop.width, map_prop.height);
		night.fixedToCamera = true;
		ui.pause = game.add.sprite(map_prop.game_x/2-380, map_prop.game_y/2-312, 'pause');
		ui.pause.fixedToCamera = true;
		ui.pause.visible = false;
		ui.inventory_button = game.add.sprite(map_prop.game_x/2-83, map_prop.game_y/2-272, 'inventory_button');
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
	        x_buttons.space_presed=true;
	        turn.time+=turn.pas;
	        player.ap+=player.ap_re*1.5;
	        if(player.ap>player.ap_max){
	        	player.ap=player.ap_max;
	        }
			player.ap_ui.scale.setTo(player.ap/player.ap_max, 1);
			setTime();
	    }else if(x_buttons.space.isUp){
	    	 x_buttons.space_presed=false;
	    }
		if (cursors.up.isDown && y_ass==false){
	        if(player.y>map_prop.height*map_prop.cord_y && (map[player.y-1][player.x].id<1 || (map[player.y-1][player.x].id<3 && map[player.y-1][player.x].id>=2))){
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
	        }else if(player.y>0 && ((map[player.y-1][player.x].id<3 && map[player.y-1][player.x].id>=2) || map[player.y-1][player.x].id<1)){
	        	map=build_map(map_prop.cord_x,map_prop.cord_y-1);
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
	        }
	        player.sprite.animations.play('up');
	        move_rule.u=true;
	        y_ass=true;
	    }else if(cursors.up.isUp && move_rule.d==false){
	    	 y_ass=false;
	    	 move_rule.u=false;
	    }
	    if (cursors.down.isDown && y_ass==false){
	        if(player.y<map_prop.height*(map_prop.cord_y+1)-1 && (map[player.y+1][player.x].id<1 || (map[player.y+1][player.x].id<3 && map[player.y+1][player.x].id>=2))){
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
	        }else if(player.y<map_prop.height*map_prop.world_size-1 && ((map[player.y+1][player.x].id<3 && map[player.y+1][player.x].id>=2) || map[player.y+1][player.x].id<1)){
	        	map=build_map(map_prop.cord_x,map_prop.cord_y+1);
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
	        }
	        player.sprite.animations.play('down');
	        move_rule.d=true;
	        y_ass=true;
	    }else if(cursors.down.isUp && move_rule.u==false){
	    	 move_rule.d=false;
	    	 y_ass=false;
	    }
	    if (cursors.left.isDown && x_ass==false){
	        if(player.x>map_prop.width*map_prop.cord_x && (map[player.y][player.x-1].id<1 || (map[player.y][player.x-1].id>=2 && map[player.y][player.x-1].id<3))){
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
	        }else if(player.x>0 && ((map[player.y][player.x-1].id>=2 && map[player.y][player.x-1].id<3) || map[player.y][player.x-1].id<1)){
	        	map=build_map(map_prop.cord_x-1,map_prop.cord_y);
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
	        }
	        player.sprite.animations.play('left');
	        move_rule.l=true;
	        x_ass=true;
	    }else if(cursors.left.isUp && move_rule.r==false){
	    	 move_rule.l=false;
	    	 x_ass=false;
	    }
	    if (cursors.right.isDown && x_ass==false){
	        if(player.x<map_prop.width*(map_prop.cord_x+1)-1 && (map[player.y][player.x+1].id<1 || (map[player.y][player.x+1].id<3 && map[player.y][player.x+1].id>=2))){
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
	        }else if(player.x<map_prop.width*map_prop.world_size-1 && ((map[player.y][player.x+1].id<3 && map[player.y][player.x+1].id>=2) || map[player.y][player.x+1].id<1)){
	        	map=build_map(map_prop.cord_x+1,map_prop.cord_y);
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
	        }
	        player.sprite.animations.play('right');
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
			alert("Pleas wait, don't kill");
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
			alert("Pleas wait, don't kill");
	        }
	    }else{
	    	boot.new_sprite.alpha=0.8;
	    }
	}

}

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
