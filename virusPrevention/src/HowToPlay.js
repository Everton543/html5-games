class HowToPlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HowToPlay' });
    }

    preload() {
        this.load.image('goBack', gameState.goBackSrc);
        this.load.image('goBackHover', gameState.goBackHoverSrc);
        this.load.audio('click', gameState.clickSoundSrc);
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
        let instructionFont = gameState.instructionFontSize + ' ' + gameState.instructionsFont;

        this.add.text(15, 50, gameState.instructionsTxt,
            {
                font: instructionFont,
                fill: gameState.instructionsColor
            });


        let gameHeight = this.sys.game.config.height;
        let x = 60;
        let y = gameHeight - 50;
        let back = this.add.sprite(0, 0, 'goBack');
        this.changeImgSize(back, 40, 70);
        back.setPosition(x, y);

        let click = this.sound.add('click');

        back.setInteractive();
        back.on('pointerup', () => {
            click.play();
            this.scene.stop('HowToPlay');
            this.scene.start('Theme');
        });

        back.on('pointerover', () => {
            back = this.add.sprite(x, y, 'goBackHover');
        });

        back.on('pointerout', () => {
            back.setVisible(false);
            back = this.add.sprite(x, y, 'goBack');
        });
    }
};