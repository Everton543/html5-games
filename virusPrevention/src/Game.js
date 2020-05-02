const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: gameState.gameBackGroundColor,
    scene: [
              ThemeScene,
              HowToPlayScene,
              PlayScene,
              GameOverScene,
              YouWonScene
           ]
};

//create a new game, pass the configuration
const game = new Phaser.Game(config);