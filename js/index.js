var width = window.innerWidth; //получаем ширину страницы
var height = window.innerHeight; //получаем высоту страницы

var game = new Phaser.Game(
	width, 
	height, 
	Phaser.CANVAS, 
	'container', 
	{ 
		preload: preload,
		create: create, 
		update: update 
	}
);


var head;
var bullet;
var mouseTouchDown = false;


var score = 0;
var scoreText;

function preload() {
    game.load.image('sky', 'assets/fon.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('heart','assets/heart.png')
    game.load.image('life','assets/life.png')
    game.load.image('head', 'assets/head.png');
    game.load.image('bullet','assets/shell.png');
}



function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    game.add.sprite(0, 0, 'life');

    head = game.add.sprite(game.world.centerX, game.world.centerY, 'head');
    head.anchor.setTo(0.5, 0.5);


	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	bullets.createMultiple(200, 'bullet');


	bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	bullets.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	bullets.setAll('checkWorldBounds', true);


    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    game.input.onDown.add(head, this);

}

function collectHeart (head, heart) {

    heart.kill();

}

function resetBullet(bullet) {
	bullet.kill();
}

function update() {


    head.x = game.input.x;
    head.y = game.input.y;


	if (game.input.activePointer.isDown) {
		if (!mouseTouchDown) {
			touchDown();
		}
	} else {
		if (mouseTouchDown) {
			touchUp();
		}
	}


 
}

function fireBullet() {

	var bullet = bullets.getFirstExists(false);
	if (bullet) {
		bullet.reset(head.x, head.y - 20);
		bullet.body.velocity.y = -500;
	}
 
}
 
function touchUp() {
	mouseTouchDown = false;
} 

function touchDown() {
	mouseTouchDown = true;
	fireBullet();
}