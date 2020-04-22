class Player extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.moveDistance = 5;
    }

    update(){
        //w or up Arrow - move up
        if (Phaser.Input.Keyboard.JustDown(keyUP)||Phaser.Input.Keyboard.JustDown(keyW)){
            //make sure player stays in bottom half of screen
            if (this.y <=game.config.height/2){
            //move player up
             this.y+=this.moveDistance;
            }
        }
        //s key or down arrow - move down
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) || Phaser.Input.Keyboard.JustDown(keyS)){
            //make sure player does not go off screen
            if (this.y<=game.config.height){
                this.y-=this.moveDistance;
            }
        }
    }

}