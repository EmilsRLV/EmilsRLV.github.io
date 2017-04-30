var game = new Phaser.Game('99.9', '99.9', Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map_prop = {
	width : 80,
	height : 80,
	tile_size : 48,
	//(game_x/tile_size)%2==1 un (game_y/tile_size)%2==1
	field : 0,
	cord_x : 0,
	cord_y : 0,
	max_y : -1,
	max_x : -1,
	world_size_x : 10,
	world_size_y : 5,
	min_map : true
};

var night2;
var turn;
var temp_map;

var boot = {
	new_game : 0,
	new_sprigin : 0
};

var int=14;
var string;

var player = {
	sprigin : 0,
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
	inventory_button_down : false
};

var inventory = {
	icon_log : 0,
	logText : 0,
	log : 4,
	icon_apple : 0,
	appleText : 0,
	apple : 4
};

var map;

var field;
var backfield={
	l : 0,
	r : 0,
	sides : 0
};
var back;

var min_map;

var world_map;

var key = {
	up : 0,
	left : 0,
	right : 0,
	down : 0
}

var tmep;

var up;
var left;
var right;
var down;

var counter=0;

function preload() {
	game.stage.backgroundColor = '#666666';


	//Tiles
	game.load.image('grass', 'assets/tiles/grass.png');  //grass
	game.load.image('grass2', 'assets/tiles/grass2.png');  //grass2
	game.load.image('grass3', 'assets/tiles/grass3.png');  //grass3
	game.load.image('sand', 'assets/tiles/sand.png');  //sand
	game.load.image('tree', 'assets/tiles/tree_1.png');  //tree
	game.load.image('tree2', 'assets/tiles/tree2.png');  //tree2
	game.load.image('tree3', 'assets/tiles/tree3.png');  //tree3
	game.load.image('tree4', 'assets/tiles/tree4.png');  //tree4
	game.load.image('tree5', 'assets/tiles/tree5.png');  //tree5
	game.load.image('water', 'assets/tiles/water.png'); //water
	game.load.image('water2', 'assets/tiles/water2.png'); //water2
	game.load.image('water3', 'assets/tiles/water3.png'); //water3

	//Characters
	game.load.spritesheet('man', 'assets/tiles/man.png', 48, 48, 4);  //sleep

	game.load.image('new_button', 'assets/ui/buttons/new_button.png');  //new game button
	game.load.spritesheet('field', 'assets/ui/field.png',672,672,4);
	game.load.image('backfield', 'assets/ui/backfield.png');

	game.load.image('arrowup', 'assets/ui/buttons/arrowup.png');
	game.load.image('arrowright', 'assets/ui/buttons/arrowright.png');
	game.load.image('arrowdown', 'assets/ui/buttons/arrowdown.png');
	game.load.image('arrowleft', 'assets/ui/buttons/arrowleft.png');


}

function create() {

	boot.new_sprigin = game.add.sprite(game.width/2-102,game.height/2+10,'new_button');
	temp=boot.new_sprigin.x;

}

function update() {
	var mouse = {
		local : game.input.activePointer,
		local_down : false
	};
	if(boot.new_game==1){
		
		//Set world bounds and creates cursors
		game.world.setBounds(0-(game.width-map_prop.tile_size)/2, 0-(game.height-map_prop.tile_size)/2, map_prop.width*map_prop.tile_size+(game.width-map_prop.tile_size), map_prop.height*map_prop.tile_size+(game.height-map_prop.tile_size));

		//Generates a map
		world_map = new Array();
		gen_map(0,0);
		temp_map = game.add.group();
		world_map[map_prop.cord_y][map_prop.cord_x].exist=true;
		generate_map(true,true);
		//Draw all the map tiles
		
		build_map();
		spawnPlayer(0,0,'man');
		back=game.add.sprite(0,0,'backfield');
		back.scale.setTo(game.width,game.height);
		back.alpha=0.8;
		back.fixedToCamera=true;
		field = game.add.sprite(0,0,'field');
		field.animations.add('up', [2], 10, true);
		field.animations.add('right', [3], 10, true);
		field.animations.add('down', [0], 10, true);
		field.animations.add('left', [1], 10, true);
		backfield.l=game.add.sprite(0,0,'backfield');
		var sc=game.height/field.height;
		field.sides=0;
		if(game.width/field.width<sc){
			sc=game.width/field.width;
			field.sides=1;
		}
		field.scale.setTo(sc,sc);
		if(field.sides==0){
			field.x=game.width/2-field.height/2;
			field.y=game.height/2-field.height/2;
			backfield.l.scale.setTo(field.x,game.height);
			backfield.r=game.add.sprite(field.x+field.width,0,'backfield');
			backfield.r.scale.setTo(field.x,game.height);
		}else{
			field.x=game.width/2-field.width/2;
			field.y=game.height/2-field.width/2;
			backfield.l.scale.setTo(game.width,field.y);
			backfield.r=game.add.sprite(0,field.y+field.height,'backfield');
			backfield.r.scale.setTo(game.width,field.y);
		}
		backfield.l.fixedToCamera=true;
		backfield.r.fixedToCamera=true;
		field.fixedToCamera=true;
		field.animations.play('up');
		key.up = game.add.button(game.width-129,game.height-195, 'arrowup');
		key.right = game.add.button(game.width-66,game.height-129, 'arrowright');
		key.down = game.add.button(game.width-129,game.height-66, 'arrowdown');
		key.left = game.add.button(game.width-195,game.height-129, 'arrowleft');
		key.right.fixedToCamera = true;
	    key.right.events.onInputOver.add(function(){right=true;});
	    key.right.events.onInputOut.add(function(){right=false;});
	    key.right.events.onInputDown.add(function(){right=true;});
	    key.right.events.onInputUp.add(function(){right=false;});
		key.up.fixedToCamera = true;  //our buttons should stay on the same place  
	    key.up.events.onInputOver.add(function(){up=true;});
	    key.up.events.onInputOut.add(function(){up=false;});
	    key.up.events.onInputDown.add(function(){up=true;});
	    key.up.events.onInputUp.add(function(){up=false;});
	    key.down.fixedToCamera = true;
	    key.down.events.onInputOver.add(function(){down=true;});
	    key.down.events.onInputOut.add(function(){down=false;});
	    key.down.events.onInputDown.add(function(){down=true;});
	    key.down.events.onInputUp.add(function(){down=false;});
		key.left.fixedToCamera = true;  //our buttons should stay on the same place  
	    key.left.events.onInputOver.add(function(){left=true;});
	    key.left.events.onInputOut.add(function(){left=false;});
	    key.left.events.onInputDown.add(function(){left=true;});
	    key.left.events.onInputUp.add(function(){left=false;});
		min_map = game.add.group();
		make_mini_map();
		game.time.events.loop(Phaser.Timer.QUARTER, function(){counter++;}, this);

		//player.sprigin.fixedToCamera=true;
		game.camera.x = player.x*map_prop.tile_size-(game.width-map_prop.tile_size)/2;
		game.camera.y = player.y*map_prop.tile_size-(game.height-map_prop.tile_size)/2;
		//player.sprigin.bringToTop(); 
		boot.new_game=2;
		
	}else if(boot.load_game==1){

	}else if(boot.new_game==2 || boot.load_game==2){
	
		if (up==true && counter>1){
			counter=0;
	        if(player.y>0 && player.dir=='z'){
	        	if(world_map[player.y-1][player.x].id<1 || (world_map[player.y-1][player.x].id<3 && world_map[player.y-1][player.x].id>=2)){
		        	player.y--;
		        	player.sprigin.y -= map_prop.tile_size;
		        	game.camera.y -= map_prop.tile_size;
		        }
	        }
	        player.sprigin.animations.play('up');
	        field.animations.play('up');
	        player.dir='z';
	    }
	    if (down==true && counter>1){
	    	counter=0;
	        if(player.y<map_prop.height-1 && player.dir=='s'){
	        	if(world_map[player.y+1][player.x].id<1 || (world_map[player.y+1][player.x].id<3 && world_map[player.y+1][player.x].id>=2)){
		        	player.y++;
		        	game.camera.y += map_prop.tile_size;
		        	player.sprigin.y += map_prop.tile_size;
	        	}
	        }
	        player.sprigin.animations.play('down');
	        field.animations.play('down');
	        player.dir='s';
	    }
	    if (left==true && counter>1){
	    	counter=0;
	        if(player.x>0 && player.dir=='w'){
	        	if(world_map[player.y][player.x-1].id<1 || (world_map[player.y][player.x-1].id>=2 && world_map[player.y][player.x-1].id<3)){
		        	player.x--;
		        	game.camera.x -= map_prop.tile_size;
		        	player.sprigin.x -= map_prop.tile_size;
	        	}
	        }
	        player.sprigin.animations.play('left');
	        field.animations.play('left');
	        player.dir='w';
	    }
	    if (right==true && counter>1){
	    	counter=0;
	        if(player.x<map_prop.width-1 && player.dir=='e'){
	        	if(world_map[player.y][player.x+1].id<1 || (world_map[player.y][player.x+1].id<3 && world_map[player.y][player.x+1].id>=2)){
	        		game.camera.x += map_prop.tile_size;
		        	player.x++;
		        	player.sprigin.x += map_prop.tile_size;
	        	}
	        }
	        player.sprigin.animations.play('right');
	        field.animations.play('right');
	        player.dir='e';
	    }
	}else{
	    if (mouse.local.x>=boot.new_sprigin.x && mouse.local.x<=boot.new_sprigin.x+204 && mouse.local.y>=boot.new_sprigin.y && mouse.local.y<=boot.new_sprigin.y+53){
	        boot.new_sprigin.alpha=1;
	        if(mouse.local.isDown){
	        	boot.new_game=1;
	        	boot.new_sprigin.destroy();
	        }
	    }else{
	    	boot.new_sprigin.alpha=0.8;
	    }
	}

}

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function updateCounter() {

    counter++;

}
