var start = {
    preload: function () {
        game.load.image('start', 'assets/start.png');
    },

    create: function () {
        this.add.sprite(game.world.centerX, game.world.centerY, 'start');
    },

    startGame: function () {
        this.state.start('game');
    }
};