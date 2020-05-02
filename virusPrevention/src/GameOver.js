class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    preload() {
        this.load.image('gameOver', gameState.gameOverBackGroundSrc);
        this.load.audio('loserSound', gameState.gameOverMusic);
    }

   /*************************************************
    * CHANGE IMAGE SIZE
    * Purpose: Get the minimun and the maximun value
    *   for the Image and change it's size between
    *   the given value
    *************************************************/
   changeImgSize(sprite, min, max) {
      let check = 1; // Value that will scale the image
      let width = sprite.width;

      while (width < min) {
         width *= check;

         if (width < min) {
            check += 0.1;
         }

         else {
            sprite.setScale(check, check);
            return;
         }
      }

      while (width > max) {
         width *= check;

         if (width > max) {
            check -= 0.1;
         }

         else if (width < max) {
            sprite.setScale(check, check);
            sprite.width *= check;
            sprite.hight *= check;
            return;
         }
      }
   }

   create() {
      let gameWidth = this.sys.game.config.width;
      let gameHeight = this.sys.game.config.height;
      let x = gameWidth / 2;
      let over = this.add.sprite(0, 0, 'gameOver');
      this.changeImgSize(over, 290, 300);
      let y = gameHeight - (over.displayHeight / 2);
      over.setPosition(x, y);

      let lose = this.sound.add('loserSound');
      lose.play();

       let gameOverFont = gameState.gameOverFontSize + ' ' + gameState.gameOverFont;
      this.add.text(70, 50, gameState.gameOverTxt,
          {
              font: gameOverFont,
              fill: gameState.gameOverTextColor
          });

   }
};