
function MenuState() {}

MenuState.prototype = {
  preload: function() {

  },
  create: function() {
    //background image
    this.background = this.game.add.sprite(0, 0, 'background_two');
    //sidescrolling ground
    this.ground = this.game.add.tileSprite(0,350,800, 112, 'ground');
    this.ground.autoScroll(-200,0);

    //Title assets
    this.titleGroup = this.game.add.group();
    this.title = this.game.add.sprite(0,100,'title');
    this.titleGroup.add(this.title);

    //bird title sprite
    this.bird = this.game.add.sprite(200,100,'bird');
    this.titleGroup.add(this.bird);

    //animating the bird
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);

    //setting the origin of the title
    this.titleGroup.x = 300;
    this.titleGroup.y = 0;
    
    //get schwifty 
    //in other words this makes the title "tween" up and down
    this.game.add.tween(this.titleGroup).to({y:15}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    //adding button 
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);

  },

  //creating the callback for the button
  startClick: function(){
	 this.state.start('play');
  },

  update: function(){
    }

  };

