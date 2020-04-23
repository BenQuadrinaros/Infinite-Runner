class Target extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.enabled = true;
    }

    update(){
        this.x -= game.settings.scrollSpeed*.7;
        if(this.x <= -this.width - 20) {
            this.reset();
        }
    }

    reset() {
        this.y = Math.round(Math.random() * game.config.width/2);
        this.x = game.config.width + Math.round(Math.random() * 30);
        this.enabled = true;
    }


}