class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio files
        this.load.audio("menuSelect", "./assets/menuSelect.wav");
    }
    
    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "32px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        // (↑) & (↓)
        menuConfig.fontSize = "48px";
        this.add.text(centerX, centerY - (2.5*textSpacer), "Alpine Adventure", menuConfig).setOrigin(.5);
        menuConfig.fontSize = "32px";
        this.playText = this.add.text(centerX, centerY + textSpacer, "Click here or press (↑) \nto start Alpine Adventure.", menuConfig).setOrigin(.5).setInteractive();
        this.instructionsText = this.add.text(centerX, centerY + (2.5*textSpacer), "Click here or press (↓) \nfor gameplay instructions.", menuConfig).setOrigin(.5).setInteractive();

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.singleClick = 0;
    }

    update() {
        if(game.input.mousePointer.isDown){
            this.singleClick++;
        } else if(!(game.input.mousePointer.isDown)){
            this.singleClick = 0;
        }
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.sound.play("menuSelect");
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play("menuSelect");
            this.scene.start("instructionScene");
        }
        if(this.singleClick == 1) {
            this.playText.on('pointerdown',() => {
                this.sound.play("menuSelect");
                this.scene.start("playScene");
            });
            this.instructionsText.on('pointerdown',() => {
                this.sound.play("menuSelect");
                this.scene.start("instructionScene");
            });
        }
    }
}
