var gameState = {
    goBackSrc: '../images/back.png',
    goBackHoverSrc: '../images/backHover.png',
    gameBackGroundSrc: '../images/backGround.png',
    enemyImgSrc: '../images/enemy.png',
    ammoFullSrc: '../images/ammoFull.png',
    ammoHalfSrc: '../images/ammoHalf.png',
    ammoLittleSrc: '../images/ammoLittle.png',
    ammoEmptySrc: '../images/ammoEmpty.png',
    ammoReloadSrc: '../images/ammoReload.png',
    startButtonSrc: '../images/start.png',
    pauseButtonSrc: '../images/pause.png',
    startButtonHoverSrc: '../images/startHover.png',
    howToPlayButtonSrc: '../images/howToPlay.png',
    howToPlayHoverSrc: '../images/HowToPlayHover.png',
    themeBackGroundSrc: '../images/themeBackGround.png',
    youWonBackGroundSrc: '../images/youWon.png',
    gameOverBackGroundSrc: '../images/gameOver.png',
    gameOverMusic: '../sounds/Monstrous_Dance.ogg',

    clickSoundSrc: '../sounds/click.ogg',
    reloadSoundSrc: '../sounds/reload.ogg',
    shootSoundSrc: '../sounds/shoot.ogg',
    enemyHitSoundSrc: '../sounds/hitTheVirus.ogg',
    gameMusicSrc: '../sounds/gritt_and_sour_chords_Edited.ogg',
    themeMusicSrc: '../sounds/The_Calm.ogg',
    youWonMusicSrc: '../sounds/Red_Friday.ogg',

    gameOverTxt: 'Game Over',
    reloadTxt: 'Reload',
    ammoTxt: 'Ammo',
    scoreTxt: 'Score:',
    instructionsTxt: "How to play:\n\nTouch the Virus with your mouse or finger.\n\nTo know how much alcohol in gel you have,\nlook to the botton right side of the game screen.\n\nIf you don't have gel you cannot remove the virus.\n\nTo reload you must touch at the refill image.",

    gameOverFont: 'Arial',
    gameOverFontSize: '30px',
    gameSceneFont: '14px Arial',
    gameSceneFontSize: '14px',
    instructionsFont: 'Arial',
    instructionFontSize: '13px',

    instructionsColor: '#FFFFFF',
    fontTextColor: '#ff0000',
    numberTextColor: '#FFFFFF',
    gameOverTextColor: '#FF0000',
    gameBackGroundColor: "000000",
    gameWidth: 300,
    gameHeight: 300,

    enemies: [],
    pause: false,
    path: 0,
    timePassed: 0,
    timeForNewEnemy: 71,
    ammoQuantity: 10,
    win: 9999999,
    timeForBoss: 3803,
    boss: [],
    playingTheme: false,
    ThemeAdded: false,
    graphics: [],
    score: 0
};
