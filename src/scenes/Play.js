class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images
        this.load.image('skyBG', './assets/SkyBackground.png');
        this.load.image('treeBG', './assets/treeBackgrounLayer.png');
        this.load.image('mountainBG', './assets/mountainBackgrounLayer.png');
        this.load.image('snowGround', './assets/snowLayer.png');
        this.load.image('player', './assets/player.png');
        this.load.image('rock', './assets/rock.png');
        this.load.image('stump', './assets/stump.png');
        this.load.image('gate', './assets/slalomGate.png');
        this.load.image('target', './assets/target.png');
        this.load.image('reticle','./assets/reticleF.png');

        //load animations
        this.load.image('gunShotAnim', './assets/playerShootAnim.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 0
        });
        this.load.image('targetBreakAnim', './assets/TargetBreakAnim.png');
        this.load.atlas('playerS', './assets/spritesheet.png', './assets/sprites.json');

        //load audio
        //this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("GatePass", "./assets/GatePass.wav");
        this.load.audio("ObsHit", "./assets/ObsHit.wav");
        this.load.audio("ShotFired", "./assets/ShotFired.wav");
        this.load.audio("TargetBreak", "./assets/TargetBreak.wav");
        this.load.audio("music", "./assets/BackgroundMusic.wav");
        this.load.audio("GameOver", "./assets/GameOver.wav");
    }

    create() {
        game.input.mouse.capture = true;
        this.faster = 50;
        this.singleClick = 0;
        this.mouseDown = false;

        //make anims
        this.anims.create({
            key: 'idle',
            frameRate:15,
            frames: this.anims.generateFrameNames('playerS', {prefix: 'idle', end: 5}),
            repeat: -1
        });
        this.anims.create({
            key: 'shoot',
            frameRate:15,
            frames: this.anims.generateFrameNames('playerS', {prefix: 'shoot', end: 2}),
            repeat: 0
        });

        this.anims.create({
            key: 'stumble',
            frameRate:15,
            frames: this.anims.generateFrameNames('playerS', {prefix: 'trip', end: 5}),
            repeat: 0
        });


        //place backgrounds
        //this.starfield = this.add.tileSprite(0,0,640,480,"starfield").setOrigin(0,0);
        this.skyBG = this.add.tileSprite(0, 0, 640, 480, 'skyBG').setOrigin(0, 0);
        this.mountainBG = this.add.tileSprite(0, 0, game.config.width, game.config.height / 2, 'mountainBG').setOrigin(0, 0);
        this.snow = this.add.tileSprite(0, 10, game.config.width, game.config.height, 'snowGround').setOrigin(0, 0).setScale(1, 4);
        this.treeBG = this.add.tileSprite(0, 0, game.config.width, game.config.height / 2 + 50, 'treeBG').setOrigin(0, 0);

        //start up looping background music
        this.music = this.sound.add("music");
        this.music.loop = true;
        this.music.volume = .7;
        this.music.play();

        //decraese target hit volume
        this.targetHit = this.sound.add("TargetBreak");
        this.targetHit.volume = .1;

        //keys for movement
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //place assets into the scene
        this.obs1 = new Obstacle(this, 0, 0, 'rock').setOrigin(0, 0);
        this.obs1.reset();
        this.obs2 = new Obstacle(this, 0, 0, 'stump').setOrigin(0, 0);
        this.obs2.reset();
        this.obs2.x += 45 + Math.round(Math.random() * 25);
        this.obs3 = new Obstacle(this, 0, 0, 'rock').setOrigin(0, 0);
        this.obs3.reset();
        this.obs2.x += 120 + Math.round(Math.random() * 45);
        this.gate1 = new Gate(this, 0, 0, 'gate').setOrigin(0, 0);
        this.gate1.reset();
        this.gate2 = new Gate(this, 0, 0, 'gate').setOrigin(0, 0);
        this.gate2.reset();
        this.gate2.x += 90 + Math.round(Math.random() * 100);

        this.tar1 = new Target(this, 0, 0, 'target', 0, 1).setOrigin(0, 0);
        this.tar1.reset();

        this.tar2 = new Target(this, 0, 0, 'target', 0, 0).setOrigin(0, 0);
        this.tar2.reset();
        //player object


        this.p1 = new Player(this, 40, 2 * game.config.height / 3, 'player').setOrigin(0, 0).play('idle');

        this.blizzard = this.add.tileSprite(0, -game.config.height, game.config.width, game.config.height, 'snowGround').setOrigin(0, 0).setScale(1, 8);
        this.blizzard.alpha = 0;

        //game timer and game over
        this.gameOver = false;
        this.canLeave = false;
        //timer variables
        this.totalTime = 15;
        this.timer = this.time.addEvent({
            delay: this.totalTime * 1000,
            callback: () => {
                this.delayGameOver()
            },
            loop: false,
            callbackScope: this
        });

        //add top-border for UI
        //this.add.rectangle(0,0,640,110,0x151565).setOrigin(0,0);
        this.scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#A0A0A0",
            color: "#1010B5",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        };
        this.labelConfig =
            {
                fontFamily: "Courier",
                fontSize: "14px",
                color: "#000",
                align: "right",
                padding: {
                    top: 5,
                    bottom: 5
                },
            };

        this.p1Score = 0;

        //UI labels and timers
        this.timeLeftLable = this.add.text(game.config.width - 160, 24, "TIME LEFT", this.labelConfig);
        this.timeLeft = this.add.text(game.config.width - 160, 54, this.timer.delay, this.scoreConfig);

        this.scoreLabel = this.add.text(69, 24, "SCORE", this.labelConfig);
        this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);

        this.hScoreLabel = this.add.text(69, 94,"H SCORE",this.labelConfig);
        this.hScore = this.add.text(69,114,highscore,this.scoreConfig);

        //UI controls
        this.add.text(game.config.width / 3, 24, "(↑)/(W) & (↓)/(S) to move", this.labelConfig);
        this.add.text(game.config.width / 3 - 34, 54, "(Spacebar) to fire at the reticle", this.labelConfig);

        //REPLACE WITH ASSETS
        //aiming reticle
        // this.add.rectangle(game.config.width / 2 + game.config.width / 7, 200, 10, 10, 0xFACADE).setOrigin(0, 0);
        // this.add.rectangle(game.config.width / 2 + game.config.width / 4.5, 200, 10, 10, 0xFACADE).setOrigin(0, 0);
        this.add.sprite(11*game.config.width/16,200,'reticle').setScale(2,2);

        //REPLACE WITH ASSETS

        //fading controls
        this.upperControl = this.add.text(50, 4 * game.config.height / 7, "(↑)/(W)", this.labelConfig);
        this.lowerControl = this.add.text(50, 6 * game.config.height / 7, "(↓)/(S)", this.labelConfig);
        this.forwardControl = this.add.text(100, 5 * game.config.height / 7, "(Spacebar) to fire", this.labelConfig);
    }

    update() {

        //check for gameOver
        if (this.gameOver) {
            game.settings.scrollSpeed = 0;
        }
        if (this.gameOver && this.canLeave) {
            //check for highscore
            if (this.p1Score > highscore){
                highscore = this.p1Score;
                this.add.text(game.config.width/2,7*game.config.height/8,'New High Score!',this.scoreConfig).setOrigin(.5);
            }
            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.sound.play("menuSelect");
                this.time.addEvent({
                    delay: 1300,
                    callback: () => {
                        this.scene.restart();
                    },
                    loop: false,
                    callbackScope: this
                });
            } else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                this.sound.play("menuSelect");
                this.sound.play("menuSelect");
                this.time.addEvent({
                    delay: 1300,
                    callback: () => {
                        this.scene.start("menuScene");
                    },
                    loop: false,
                    callbackScope: this
                });
            }
        } else {
            //update everything in game
            if (game.settings.scrollSpeed < 1 && this.faster > 50) {
                this.faster = 50;
            }
            this.faster--;
            if (this.faster <= 0) {
                this.faster = 500;
                game.settings.scrollSpeed += .5;
            }
            if (game.settings.scrollSpeed >= 4.5 && this.blizzard.alpha < .6) {
                this.blizzard.alpha += .001;
            } else if (this.blizzard.alpha > 0) {
                this.blizzard.alpha -= .005;
            }
            this.music.rate = 1 + (game.settings.scrollSpeed / 100);
            this.upperControl.alpha -= .002;
            this.lowerControl.alpha -= .002;
            this.forwardControl.alpha -= .002;

            this.skyBG.tilePositionX += game.settings.scrollSpeed / 4;
            this.mountainBG.tilePositionX += game.settings.scrollSpeed / 2;
            this.treeBG.tilePositionX += game.settings.scrollSpeed;
            this.snow.tilePositionX += game.settings.scrollSpeed;
            this.blizzard.tilePositionX += 2 * game.settings.scrollSpeed;

            let gunShot = this.add.sprite(this.p1.x, this.p1.y - 15, "gunShotAnim").setOrigin(0, 0);
            gunShot.alpha = 0;
            this.p1.update();
            gunShot.y = this.p1.y - 15;

            this.obs1.update();
            this.obs2.update();
            this.obs3.update();
            this.gate1.update();
            this.gate2.update();
            this.tar1.update();
            this.tar2.update();

            if (Phaser.Input.Keyboard.JustDown(keySpace) && this.p1.moveable) {
                this.p1.play('shoot').once('animationcomplete', () => {
                   this.p1.play('idle');
                });

                this.p1.moveable = false;
                //gunShot.alpha = 1;
                this.sound.play("ShotFired");
                if (game.settings.scrollSpeed <= 0) {
                    game.settings.scrollSpeed = 0;
                }
                this.animTimer = this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        spriteDestroy(gunShot);
                        this.p1.moveable = true;
                    },
                    loop: false,
                    callbackScope: this
                });
                if (this.tar1.x < game.config.width / 2 + game.config.width / 4.5 && this.tar1.x > game.config.width / 2 + game.config.width / 7) {
                    let t1Break = this.add.sprite(this.tar1.x - 5, this.tar1.y - 10, "targetBreakAnim").setOrigin(0, 0);
                    setTimeout(function () {
                        spriteDestroy(t1Break)
                    }, 200);
                    this.targetHit.play();
                    this.timer.delay += 2500;
                    this.totalTime += 3;
                    this.tar1.reset();
                    if (game.settings.scrollSpeed <= 3) {
                        game.settings.scrollSpeed += .5;
                    }
                }

                if (this.tar2.x < game.config.width / 2 + game.config.width / 4.5 && this.tar2.x > game.config.width / 2 + game.config.width / 7) {
                    let t2Break = this.add.sprite(this.tar2.x - 5, this.tar2.y - 10, "targetBreakAnim").setOrigin(0, 0);
                    setTimeout(function () {
                        spriteDestroy(t2Break)
                    }, 200);
                    this.targetHit.play();
                    this.timer.delay += 2500;
                    this.totalTime += 3;
                    this.tar2.reset();
                    if (game.settings.scrollSpeed <= 3) {
                        game.settings.scrollSpeed += .5;
                    }
                }
            }

            //update timer
            this.timeLeft.text = Math.round(this.totalTime - this.timer.getElapsedSeconds());

            //make sure obs and gates are not overlapping
            if (this.checkOverlap(this.obs1, this.obs2)) {
                this.obs1.reset();
            }
            if (this.checkOverlap(this.obs1, this.obs3)) {
                this.obs1.reset();
            }
            if (this.checkOverlap(this.obs1, this.gate1)) {
                this.obs1.reset();
            }
            if (this.checkOverlap(this.obs1, this.gate2)) {
                this.obs1.reset();
            }
            if (this.checkOverlap(this.obs2, this.obs3)) {
                this.obs2.reset();
            }
            if (this.checkOverlap(this.obs2, this.gate1)) {
                this.obs2.reset();
            }
            if (this.checkOverlap(this.obs2, this.gate2)) {
                this.obs2.reset();
            }
            if (this.checkOverlap(this.obs3, this.gate1)) {
                this.obs3.reset();
            }
            if (this.checkOverlap(this.obs3, this.gate2)) {
                this.obs3.reset();
            }
            if (this.checkOverlap(this.gate1, this.gate2)) {
                this.gate1.reset();
            }

            //check collisions against player
            if (this.checkCollision(this.p1, this.obs1)) {
                this.sound.play("ObsHit");
                //stumble animation
                this.p1.play('stumble').once('animationcomplete', () =>{
                  this.p1.play('idle')
                });
                this.timer.delay -= 5000;
                this.totalTime -= 5;
                this.obs1.enabled = false;
                //console.log("hit obs1");
                game.settings.scrollSpeed -= 1.5;
                if (game.settings.scrollSpeed < 0) {
                    game.settings.scrollSpeed = 0;
                }
            }
            if (this.checkCollision(this.p1, this.obs2)) {
                this.sound.play("ObsHit");
                //stumble animation
                this.p1.play('stumble').once('animationcomplete', () =>{
                    this.p1.play('idle')
                });
                this.timer.delay -= 5000;
                this.totalTime -= 5;
                this.obs2.enabled = false;
                //console.log("hit obs2");
                game.settings.scrollSpeed -= 1.5;
                if (game.settings.scrollSpeed < 0) {
                    game.settings.scrollSpeed = 0;
                }
            }
            if (this.checkCollision(this.p1, this.obs3)) {
                this.sound.play("ObsHit");
                //stumble animation
                this.p1.play('stumble').once('animationcomplete', () =>{
                    this.p1.play('idle')
                });
                this.timer.delay -= 5000;
                this.totalTime -= 5;
                this.obs3.enabled = false;
                //console.log("hit obs3");
                game.settings.scrollSpeed -= 2;
                if (game.settings.scrollSpeed < 0) {
                    game.settings.scrollSpeed = 0;
                }
            }
            if (this.checkCollision(this.p1, this.gate1)) {
                this.sound.play("GatePass");
                this.p1Score += 10;
                this.gate1.enabled = false;
                this.scoreLeft.text = this.p1Score;

            }
            if (this.checkCollision(this.p1, this.gate2)) {
                this.sound.play("GatePass");
                this.p1Score += 10;
                this.gate2.enabled = false;
                this.scoreLeft.text = this.p1Score;
            }
        }
    }

    checkCollision(player, other) {
        if (!(other.enabled)) {
            return false;
        } else if (player.x + player.width / 2 < other.x + other.width / 2 && player.x + player.width > other.x + other.width / 10 &&
            player.y < other.y + other.height / 2 && player.y + 3 * player.height / 4 > other.y) {
            return true;
        }
    }

    checkOverlap(one, two) {
        if (one.x - one.width < two.x + two.width && one.x + one.width > two.x - two.width &&
            one.y - one.height < two.y + two.height && one.y + one.height > two.y - two.height) {
            return true;
        }
    }

    delayGameOver() {
        game.settings.scrollSpeed = 0;
        this.music.pause();
        this.sound.play("GameOver");
        this.gameOver = true;
        this.delayGO = this.time.addEvent({
            delay: 1200,
            callback: () => {
                this.displayGameOver()
            },
            loop: false,
            callbackScope: this
        });
    }

    displayGameOver() {
        //game over screen with options to restart or go back to menu
        this.scoreConfig.fontSize = "48px";
        this.scoreConfig.fixedWidth = 0;
        this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", this.scoreConfig).setOrigin(.5);
        this.scoreConfig.fontSize = "32px";
        this.playText = this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Press (↑) to restart the game.", this.scoreConfig).setOrigin(.5);
        this.playText = this.add.text(game.config.width / 2, game.config.height / 2 + 128, "Press (↓) to return to the menu.", this.scoreConfig).setOrigin(.5);
        this.canLeave = true;
    }
}

function spriteDestroy(sprite) {
    sprite.destroy()
}