class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }

    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "26px",
            backgroundColor: "#F0F0F0",
            color: "#2020F0",
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

        //(↑) & (↓)
        this.add.text(centerX, centerY + (2.5*textSpacer), "Use (↑) & (↓) arrows or (W) & (S) keys\nto move and (Left Mouse Click) to Fire", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY, "Ski through gates to earn points.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY - (.5*textSpacer), "Shoot the targets to get more time.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY - (1.5*textSpacer), "Avoid obstacles to avoid losing time.", menuConfig).setOrigin(.5);
        menuConfig.fontSize = "32px";
        this.backText = this.add.text(centerX, centerY - (3*textSpacer), "Click here or press (↓)\nto go back to the menu.", menuConfig).setOrigin(.5).setInteractive();

        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
        }
        this.backText.on('pointerdown',() => {
            this.scene.start("menuScene");
        });
    }
}