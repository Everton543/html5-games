
class Boss {
   constructor(sprite, gameWidth) {
       this.bonusPoint = 50;
       this.life = 20;
       this.alive = true;
       this.sprite = sprite;
       this.movingToRight = true;
       this.speed = 2;
       this.gameWidth = gameWidth;
   }

   kill() {
       this.sprite.input.enabled = false;
       this.sprite.setVisible(false);
   }

   gotHit(){
      this.life -= 1;
      gameState.score += 1;
   }

   isAlive(){
      return this.alive;
   }

   checkLife() {
      if (this.life <= 0) {
          this.alive = false;
      }
   }

   advance() {
      if (this.sprite.x + (this.sprite.displayWidth / 2) >= this.gameWidth) {
          this.movingToRight = false;
      }

      if (this.sprite.x - (this.sprite.displayWidth / 2) <= 0) {
          this.movingToRight = true;
      }

      if (this.movingToRight == true) {
          this.sprite.x += this.speed;
      }

      if (this.movingToRight == false){
          this.sprite.x -= this.speed;
      }

      this.sprite.angle -= this.speed;
   }
};

class PlayScene extends Phaser.Scene {
   constructor() {
      super({ key: 'PlayScene' });
   }

   //preload
   preload() {
      //load images
      this.load.image('background', gameState.gameBackGroundSrc);
      this.load.image('enemy', gameState.enemyImgSrc);
      this.load.image('ammoFull', gameState.ammoFullSrc);
      this.load.image('ammoHalf', gameState.ammoHalfSrc);
      this.load.image('ammoLittle', gameState.ammoLittleSrc);
      this.load.image('ammoEmpty', gameState.ammoEmptySrc);
      this.load.image('reload', gameState.ammoReloadSrc);
      this.load.image('pause', gameState.pauseButtonSrc)

      this.load.audio('reloadSound', gameState.reloadSoundSrc);
      this.load.audio('shoot', gameState.shootSoundSrc);
      this.load.audio('hitSound', gameState.enemyHitSoundSrc);
      this.load.audio('gamingSound', gameState.gameMusicSrc);
   }

   addBoss() {
      let gameWidth = this.sys.game.config.width;
      let newBoss = this.add.sprite(0, 5, 'enemy');
      let x = this.randomPositionX(newBoss);

      let hit = this.sound.add('hitSound');
      let shoot = this.sound.add('shoot');

      newBoss.setPosition(x, 60);
      this.changeImgSize(newBoss, 140, 150);
      newBoss.depth = 2;

      let boss = new Boss(newBoss, gameWidth);
      boss.sprite.setInteractive();

      boss.sprite.on('pointerup', function () {
         if (gameState.ammoQuantity > 0) {
            gameState.ammoQuantity -= 1;
            boss.gotHit();
            shoot.play();
            hit.play();
         }
      });

      gameState.boss.push(boss);
   }

   checkBosses() {
      gameState.boss.forEach(function (item) {
          item.checkLife();
      });
   }


   removeZombies() {
      if (gameState.enemies.length > 0) {
         for (let i = 0; i < gameState.enemies.length;
              i++) {
            if (gameState.enemies[i].ignoreDestroy == true) {
                gameState.enemies[i].input.enabled = false;
                gameState.enemies[i].setVisible(false);
                gameState.enemies.splice(i, 1);
            }
        }
      }

      if (gameState.boss.length > 0) {
          for (let i = 0; i < gameState.boss.length; i++) {
              if (gameState.boss[i].isAlive() == false) {
                  gameState.boss[i].kill();
                  gameState.boss.splice(i, 1);
              }
          }
      }
   }

   randomPositionX(sprite) {
      let gameWidth = this.sys.game.config.width;
      let min = sprite.displayWidth / 2;
      return (min + Math.floor((gameWidth - 80) * Math.random()));
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

   bottomRight(sprite, marge) {
      let gameWidth = this.sys.game.config.width;
      let gameHeight = this.sys.game.config.height;
      let x = gameWidth - sprite.displayWidth / 2 - marge;
      let y = gameHeight - sprite.displayHeight / 2;
      sprite.setPosition(x, y);
   }

   bottomLeft(sprite, marge) {
      let gameHeight = this.sys.game.config.height;
      let x = 0 + sprite.displayWidth / 2 + marge;
      let y = gameHeight - sprite.displayHeight / 2;
      sprite.setPosition(x, y);
   }

   changeAmmo() {
      gameState.currentAmmo.setVisible(false);
   }

   checkAmmo() {
      if (gameState.ammoQuantity <= 10 && gameState.ammoQuantity >= 7) {
         this.changeAmmo();
         gameState.currentAmmo = this.add.sprite(0, 0, 'ammoFull');
      }

      else if (gameState.ammoQuantity <= 6 && gameState.ammoQuantity >= 4) {
         this.changeAmmo();
         gameState.currentAmmo = this.add.sprite(0, 0, 'ammoHalf');
      }

      else if (gameState.ammoQuantity <= 3 && gameState.ammoQuantity >= 1) {
         this.changeAmmo();
         gameState.currentAmmo = this.add.sprite(0, 0, 'ammoLittle');
      }

      else if (gameState.ammoQuantity <= 0) {
         this.changeAmmo();
         gameState.currentAmmo = this.add.sprite(0, 0, 'ammoEmpty');
      }

      gameState.currentAmmo.deph = 1;

      this.changeImgSize(gameState.currentAmmo, 15, 20);
      this.bottomRight(gameState.currentAmmo, 10);
   }

   addMinions() {
      let hit = this.sound.add('hitSound');
      let shoot = this.sound.add('shoot');
      for (let i = 0; i < gameState.boss.length; i++) {
           let enemy = this.add.sprite(0, 5, 'enemy');
           let x = gameState.boss[i].sprite.x;
           let y = gameState.boss[i].sprite.y + (
                   gameState.boss[i].sprite.height / 2);

           enemy.setPosition(x, y);
           this.changeImgSize(enemy, 40, 60);
           enemy.depth = 3;

           enemy.setInteractive();
           enemy.on('pointerup', function () {
               if (gameState.ammoQuantity > 0) {
                   enemy.ignoreDestroy = true;
                   gameState.ammoQuantity -= 1;
                   shoot.play();
                   gameState.score += 1;
                   hit.play();
               }
           })

           gameState.enemies.push(enemy);
       }
   }

   addEnemy() {
      if (gameState.boss.length <= 0) {
         let enemy = this.add.sprite(0, 5, 'enemy');

         let hit = this.sound.add('hitSound');
         let shoot = this.sound.add('shoot');

         let x = this.randomPositionX(enemy);
         enemy.setPosition(x, 5);
         this.changeImgSize(enemy, 40, 60);
         enemy.depth = 3;

         enemy.setInteractive();
         enemy.on('pointerup', function () {
            if (gameState.ammoQuantity > 0) {
               enemy.ignoreDestroy = true;
               gameState.ammoQuantity -= 1;
               gameState.score += 1;
               shoot.play();
               hit.play();
            }
         })

         gameState.enemies.push(enemy);
      }

      else {
          this.addMinions();
      }
   }

   advanceEnemies() {
      gameState.enemies.forEach(function (item) {
         item.y += 1.5;
         item.angle += 1;
      });
   }
    
   checkIfLose() {
      let gameHeight = this.sys.game.config.height;
       for (let i = 0; i < gameState.enemies.length; i++) {
         if (gameState.enemies[i].y >=
             gameHeight) {
             gameState.gamingSound.pause();
             this.scene.stop('PlayScene');
             this.scene.start('GameOver');
         }
      }      
   }

   //create
   create() {

      gameState.loopMarker = {
         name: 'loop',
         start: 0,
         duration: 272.00,
         config: {
            loop: true
         }
      };

      let shoot = this.sound.add('shoot');


      gameState.background = this.add.sprite(0, 0, 'background');
      this.changeImgSize(gameState.background, 280, 300);

      let gameWidth = this.sys.game.config.width;
      let gameHeight = this.sys.game.config.height;

      let pauseButton = this.add.sprite(20, 20, 'pause');
      pauseButton.setInteractive();
      pauseButton.on('pointerup', () => {
          if (gameState.pause == false) {
              gameState.pause = true;
          }
          else {
              gameState.pause = false;
          }

      })

      gameState.background.setPosition(gameWidth / 2, gameHeight / 2);
      gameState.background.setInteractive();
      gameState.background.on('pointerup', () => {
          gameState.ammoQuantity -= 1;
          shoot.play();
      });

      gameState.gamingSound = this.sound.add('gamingSound');
      gameState.gamingSound.addMarker(gameState.loopMarker);
       gameState.gamingSound.play('loop', {
           delay: 0
       });
      gameState.background.depth = 0;

      this.addEnemy();

      gameState.currentAmmo = this.add.sprite(0, 0, 'ammoFull');
      gameState.currentAmmo.depth = 1;

      let reload = this.sound.add('reloadSound');


      gameState.reload = this.add.sprite(0, 0, 'reload');
      gameState.reload.setInteractive();
      gameState.reload.on('pointerup', () => {
         reload.play();
         gameState.ammoQuantity = 10;
      });
      gameState.reload.depth = 1;

      this.changeImgSize(gameState.reload, 15, 20);
      this.bottomLeft(gameState.reload, 10);


      var gameFont = gameState.gameSceneFontSize + ' ' + gameState.gameSceneFont;

      this.add.text(5, gameHeight - 90, gameState.reloadTxt, {
         font: gameFont,
         fill: gameState.fontTextColor
      });

      this.add.text(gameWidth - 50, gameHeight - 90, gameState.ammoTxt, {
         font: gameFont,
         fill: gameState.fontTextColor
      });

      this.add.text(80, gameHeight - 20, gameState.scoreTxt, {
         font: gameFont,
         fill: gameState.fontTextColor
      });

      gameState.showScore = this.add.text(125, gameHeight - 19, gameState.score, {
         font: gameFont,
         fill: gameState.numberTextColor
      });
   }

   update() {
       if (gameState.pause == false) {
           gameState.timePassed += 1;
           if (gameState.timePassed % gameState.timeForNewEnemy == 0) {
               this.addEnemy();
           }

           if (gameState.timePassed % gameState.timeForBoss == 0) {
               this.addBoss();
           }

           gameState.showScore.setText(gameState.score);

           if (gameState.score >= gameState.win) {
               gameState.gamingSound.pause();
               this.scene.stop('PlayScene');
               this.scene.start('YouWon');
           }

           this.checkBosses();
           this.removeZombies();
           this.checkAmmo();

           this.advanceEnemies();
           gameState.boss.forEach(function (item) {
               item.advance();
           });

           this.checkIfLose();
       }
   }
}
