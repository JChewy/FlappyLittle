function PlayState() {}
  PlayState.prototype = {


  create: function(){
    //recreate game
    this.gameover; 
    this.gameover = false;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1400;  
    this.background = this.game.add.sprite(0,0,'background_two');
    
      //bird class
      var Bird = function(game, x, y, frame) {
        Phaser.Sprite.call(this, game, x, y, 'bird', frame);
        this.anchor.setTo(0.5, 0.5);
        
        // add flap animation and begin playing it
        this.animations.add('flap');
        

        // enable physics on the bird
        this.game.physics.arcade.enableBody(this);
        this.checkWorldBounds = true; 
        this.outOfBoundsKill = true; 
        
      };
      //bird maker
      function generateBird() {  
        var bird = this.birdGroup.getFirstExists(false);
        if(!bird) {
            bird = new Bird(this.game, x, y);
            this.birdGroup.add(bird);
        }
        bird.reset(x, y);
      };

      Bird.prototype = Object.create(Phaser.Sprite.prototype);
      Bird.prototype.constructor = Bird;
      Bird.prototype.update = function() {
      };

      // creating bird instances
      this.bird = new Bird(this.game, 450, this.game.height/2);
      var r = this.bird;
      this.game.add.existing(this.bird);
      // this.bird.body.collideWorldBounds = true; 
      this.bird.alive = true;
      this.bird.animations.play('flap', 12, true);
      this.bird.events.onOutOfBounds.add(this.GameOver, this); 

        //bird class
      var Bird2 = function(game, x, y, frame) {
        Phaser.Sprite.call(this, game, x, y, 'bird2', frame);
        this.anchor.setTo(0.5, 0.5);
        
        // add flap animation and begin playing it
        this.animations.add('flap');        

        // enable physics on the bird
        this.game.physics.arcade.enableBody(this);
        this.checkWorldBounds = true; 
        this.outOfBoundsKill = true; 
        
      };
      //bird maker
      function generateBird2() {  
        var bird = this.birdGroup.getFirstExists(false);
        if(!bird) {
            bird = new Bird(this.game, x, y);
            this.birdGroup.add(bird);
        }
        bird.reset(x, y);
      };

      Bird2.prototype = Object.create(Phaser.Sprite.prototype);
      Bird2.prototype.constructor = Bird;
      Bird2.prototype.update = function() {
      };

      this.bird2 = new Bird2(this.game, 350, this.game.height/2); 
      this.game.add.existing(this.bird2); 
      this.bird2.alive = true; 
      this.bird2.animations.play('flap', 12, true); 
      this.bird2.events.onOutOfBounds.add(this.GameOver, this); 

       //flap action bird1
      cursors = game.input.keyboard.createCursorKeys();

      // //flap action bird2
      keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
      keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
      keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
      keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

      //creating the ground
      var Ground = function(game, x, y, width, height) {  
        Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
       };

      Ground.prototype = Object.create(Phaser.TileSprite.prototype);  
      Ground.prototype.constructor = Ground;

      Ground.prototype.update = function() {  
          this.game.physics.arcade.enableBody(this);
          this.physicsType = Phaser.SPRITE;
          this.body.allowGravity = false; 
          this.body.immovable = true;


      };

      //adding the ground
      this.ground = new Ground(this.game, 0, 350, 800, 112);
      this.ground.autoScroll(-200,0); 
      this.game.add.existing(this.ground);

      // counter
      var counter = 0;
      var text = 0;

      function updateCounter() {
        counter++;
        text.setText('Distance: ' + counter + "m");
      }

      text = game.add.text(game.world.centerX, game.world.centerY, 'Distance: 0m', { font: "40px Arial", fill: "white", align: "center" });
      text.anchor.setTo(0.5, 0.5);
      this.game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
      

      // haha. balls.
      function createOrlando() {
          this.orlandoGroup = this.add.group(); 
          this.orlandoGroup.enableBody = true;
          var b = this.orlandoGroup.create(game.world.randomX, 0, 'orlando');
          game.physics.enable(b, Phaser.Physics.ARCADE);
          b.body.bounce.y = .9;
      }


      this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 1000, createOrlando, this);

      //to make it harder i added another orlando generator that fires every 1.3 seconds
      function createOrlando2() {
        this.orlandoGroup2 = this.add.group(); 
        this.orlandoGroup2.enableBody = true;
        var c = this.orlandoGroup2.create(game.world.randomX, 0, 'orlando');
        game.physics.enable(c, Phaser.Physics.ARCADE);
        c.body.bounce.y = .9;
      }

      this.game.time.events.repeat(Phaser.Timer.SECOND * 1.3, 1000, createOrlando2, this); 


      //and just for fun why not add some balls as well. 
      function createBalls() {
        this.ballGroup = this.add.group(); 
        this.ballGroup.enableBody = true;
        var a = this.ballGroup.create(game.world.randomX, 0, 'ball');
        game.physics.enable(a, Phaser.Physics.ARCADE);
        a.body.bounce.y = .9;
      }
      this.game.time.events.repeat(Phaser.Timer.SECOND * 1.1, 1000, createBalls, this); 
      SpaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
      this.reset = this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    },

      // gameover state
      GameOver: function() {
          this.game.time.events.running = false; 
          this.ground.autoScroll(0,0); 
          this.ground.destroy(); 
          text = game.add.text(215, 300, 'Spacebar to Play Again', { font: "40px Munro", fill: "white", align: "center" });

      },

    update: function() {

      //collision physics
      this.game.physics.arcade.collide(this.bird, this.ground, this.GameOver, null, this);
      this.game.physics.arcade.collide(this.bird2, this.ground, this.GameOver, null, this); 
      this.game.physics.arcade.collide(this.orlandoGroup, this.bird, this.GameOver, null, this);
      this.game.physics.arcade.collide(this.orlandoGroup, this.bird2, this.GameOver, null, this); 
      this.game.physics.arcade.collide(this.ballgroup, this.bird2, this.GameOver, null, this);
      this.game.physics.arcade.collide(this.bird, this.bird2); 
      this.game.physics.arcade.collide(this.bird, this.checkworldBounds, this.GameOver, null, this); 
      this.game.physics.arcade.collide(this.bird2, this.checkWorldBounds, this.GameOver, null, this); 
      this.game.physics.arcade.collide(this.bird, this.ballGroup, this.GameOver, null, this); 
      this.game.physics.arcade.collide(this.bird2, this.ballGroup, this.GameOver, null, this); 
      this.game.physics.arcade.collide(this.bird, this.orlandoGroup2, this.GameOver, null, this); 
      this.game.physics.arcade.collide(this.bird2, this.orlandoGroup2, this.GameOver, null, this); 

      // bird 1 actions
       this.bird.body.velocity.x = 10;

       if (cursors.left.isDown && this.game.time.events.running === true)
        {
            this.bird.body.velocity.x = -400;
        }
        else if (cursors.right.isDown && this.game.time.events.running === true)
        {
            this.bird.body.velocity.x = 400;
        }
        else if (cursors.up.isDown && this.game.time.events.running === true)
        {
            this.bird.body.velocity.y = -400;
        }

        else if (cursors.down.isDown && this.game.time.events.running === true)
        {
          this.bird.body.velocity.y = 400; 
        }

        else if (SpaceBar.isDown)
        {
          this.game.state.start('play'); 
          this.game.time.events.running = true; 

        }

      // //bird2 actions
        this.bird2.body.velocity.x = 10;

        if (keyA.isDown && this.game.time.events.running === true)
        {
            this.bird2.body.velocity.x = -400;
        }
        else if (keyD.isDown && this.game.time.events.running === true)
        {
            this.bird2.body.velocity.x = 400;
        }
       
        
        else if (keyW.isDown && this.game.time.events.running === true)
        {
            this.bird2.body.velocity.y = -400;
        }

        else if (keyS.isDown && this.game.time.events.running === true)
        {
          this.bird2.body.velocity.y = 400; 
        }

    },

};
  
