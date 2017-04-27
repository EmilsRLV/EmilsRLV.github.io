var game = new Phaser.Game("100", "100", Phaser.AUTO, '', { preload: preload, create: create, update: update });

var boot = {
	new_game : 0,
	new_sprite : 0,
	load_game : 0,
	load_sprite : 0
};

var level = {

}

var player;

function preload() {
	game.load.image('earth02', 'assets2/tiles/png/Tiles/2.png');  //earth 01
	game.load.image('earth03', 'assets2/tiles/png/Tiles/5.png');  //earth 02
	game.load.image('new_button', 'assets2/ui/new_button.png');  //new game button
	game.load.atlasJSONHash('player', 'assets2/SpriteSheets/player.png', 'assets2/SpriteSheets/player.json');
}

function create() {
	//boot.new_sprite = game.add.sprite(game.world.centerX-102,game.world.centerY+10,'new_button');
	boot.new_sprite = game.add.button(game.world.centerX-102,game.world.centerY+10, 'new_button', actionOnClick, this, 2, 1, 0);
	//game.time.events.loop(200, doButtons, this);
	player = game.add.sprite(game.world.centerX,game.world.centerY, 'player', 'player/idle/01');
		player.scale.setTo(0.5,0.5);
		//player.animations.add('idle', Phaser.Animation.generateFrameNames('player/idle/', 1, 8, '', 2), 10, true, false);
    	//player.animations.play('idle');
		boot.new_game=2;
}

function update() {
	if(boot.new_game==1){
		
	}else if(boot.new_game==2){
		//player.animations.add('run', Phaser.Animation.generateFrameNames('run/', 1, 20, '', 4), 10, true, false);
    	//player.animations.play('run');
	}
}

function actionOnClick(){
	boot.new_game=1;
    //boot.load_sprite.destroy();
	boot.new_sprite.destroy();
}
