function BootState() {
}

BootState.prototype = {
  preload: function() {
    this.load.image('background_two', 'assets/background_two.png');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};
