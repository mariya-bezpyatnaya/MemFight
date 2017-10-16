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

        update: function ()
        {
            this.state.start('game');
        }
    };