class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }

    create() {
        this.add.text(centerX, centerY, "Use (↑) & (↓) arrows or (W) & (S) keys\nto move and (Left Mouse Click) to Fire", menuConfig).setOrigin(.5);
    }
}