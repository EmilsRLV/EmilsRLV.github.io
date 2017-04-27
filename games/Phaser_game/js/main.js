var game = new Phaser.Game("100", "100", Phaser.AUTO, '', { preload: preload, create: create, update: update });

var boot = {
	new_game : 0,
	new_sprite : 0,
	load_game : 0,
	load_sprite : 0
};

function preload() {
	game.load.image('earth02', 'assets2/tiles/png/Tiles/2.png');  //earth 01
	game.load.image('earth03', 'assets2/tiles/png/Tiles/5.png');  //earth 02
	game.load.image('new_button', 'assets2/ui/new_button.png');  //new game button
	game.load.spritesheet('char', 'assets2/SpriteSheets/allinall.tps', 48, 48, 4);  //sprite
}

function create() {
	//boot.new_sprite = game.add.sprite(game.world.centerX-102,game.world.centerY+10,'new_button');
	boot.new_sprite = game.add.button(game.world.centerX-102,game.world.centerY+10, 'button', actionOnClick, this, 2, 1, 0);
	//game.time.events.loop(200, doButtons, this);
}

function update() {
}

function actionOnClick(){
	boot.new_game=1;
    boot.load_sprite.destroy();
	boot.new_sprite.destroy();
}
