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

var start =
    {
        preload: function ()
        {
            game.load.image('start', 'assets/start.png');
        },
 
        create: function ()
        {
            this.add.sprite(game.world.centerX, game.world.centerY, 'start');
        }

        startGame: function ()
        {
            this.state.start('game');
        }
    };

game.state.add('start', start);
game.state.add('game', game);
game.state.start('start');


var head;
var bullet;
var mouseTouchDown = false;


var score = 0;
var scoreText;

var life = 3;
var lifeText;

function preload() {
    game.load.image('sky', 'assets/fon.png');
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


	bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet);
	bullets.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	bullets.setAll('checkWorldBounds', true);


    lifeText = game.add.text(75, 18, ': 3', { fontSize: '40px', fill: '#000' });

    game.input.onDown.add(head, this);

}

function collectHeart (head, heart) {

    heart.kill();
    life+= 1;
    lifeText= ': ' + life;

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

     game.camera.follow(head, Phaser.Camera.FOLLOW_PLATFORMER);
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