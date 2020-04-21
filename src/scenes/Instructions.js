class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }

    create() {
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY + (2*textSpacer), "Use (↑) & (↓) arrows or (W) & (S) keys\nto move and (Left Mouse Click) to Fire", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY, "Ski through gates to earn points.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY - textSpacer, "Shoot the targets to get more time.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY - (2*textSpacer), "Avoid obstacles to avoid losing time.", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY - (3.5*textSpacer), "Press (↓) to go back to the menu.", menuConfig).setOrigin(.5);
    }

    update() {
        
    }
}