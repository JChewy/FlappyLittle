var Bird = function(game, x, y, frame){

	//initialize
	Phaser.Sprite.call(this, game,x, y, 'bird', frame);
	this.anchor.setTo(0,5, 0,5);
	this.animations.add('flap');
	this.animations.play('flap', 12, true);

	//adding physics 
	this.game.physics.arcade.enableBody(this);
};