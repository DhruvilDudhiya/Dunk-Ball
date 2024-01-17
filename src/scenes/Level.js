// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// container_1
		const container_1 = this.add.container(0, 0);
		container_1.visible = false;

		// board_
		const board_ = this.add.image(217, 103, "Board-");
		board_.scaleX = 0.5;
		board_.scaleY = 0.5;
		container_1.add(board_);

		// net_1
		const net_1 = this.add.image(98, 255, "Net-1");
		net_1.scaleX = 0.5;
		net_1.scaleY = 0.5;
		container_1.add(net_1);

		// net
		const net = this.add.image(88, 161, "net");
		net.scaleX = 0.5;
		net.scaleY = 0.5;
		container_1.add(net);

		// btnCont
		const btnCont = this.add.container(0, 0);

		// sound
		const sound = this.add.image(165, 110, "Sound-button-");
		sound.scaleX = 0.7;
		sound.scaleY = 0.7;
		btnCont.add(sound);

		// sound_Off
		const sound_Off = this.add.image(165, 110, "sound-Off-");
		sound_Off.scaleX = 0.65;
		sound_Off.scaleY = 0.65;
		sound_Off.visible = false;
		btnCont.add(sound_Off);

		// pause_ui
		const pause_ui = this.add.image(930, 110, "Pause-button");
		pause_ui.scaleX = 0.7;
		pause_ui.scaleY = 0.7;
		btnCont.add(pause_ui);

		// play_button
		const play_button = this.add.image(930, 110, "Play-button");
		play_button.scaleX = 0.65;
		play_button.scaleY = 0.65;
		play_button.visible = false;
		btnCont.add(play_button);

		// scoreText
		const scoreText = this.add.text(540, 229, "", {});
		scoreText.setOrigin(0.5, 0.5);
		scoreText.text = "0";
		scoreText.setStyle({ "align": "center", "fontSize": "130px", "stroke": "#000000ff", "strokeThickness":13});

		this.sound = sound;
		this.sound_Off = sound_Off;
		this.pause_ui = pause_ui;
		this.play_button = play_button;
		this.scoreText = scoreText;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	sound;
	/** @type {Phaser.GameObjects.Image} */
	sound_Off;
	/** @type {Phaser.GameObjects.Image} */
	pause_ui;
	/** @type {Phaser.GameObjects.Image} */
	play_button;
	/** @type {Phaser.GameObjects.Text} */
	scoreText;

	/* START-USER-CODE */

  // Write more your code here

  create() {
    this.editorCreate();
	this.rotation = true;
    this.key = 2;
	this.basket = new GameManager(this);
	this.basket.gamePlay();




		// 	// progressCont
		// const progressCont = this.add.container(0, 0);

		// // loading_
		// const loading_ = this.add.image(540, 123, "Loading-");
		// progressCont.add(loading_);

		// // loading_bar
		// const loading_bar = this.add.image(287, 123, "Loading-bar");
		// loading_bar.setOrigin(0, 0.5);
		// progressCont.add(loading_bar);





    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

update() {

	this.basket.particleEmitter.setPosition(this.basket.ball1.x, this.basket.ball1.y);
	this.ballposright();
	this.ballposleft();
	if (!this.rotation == true && this.isLeft == true && this.play_button.visible == false) {
		this.basket.ball1.rotation -= 0.120;
		this.basket.ball1.rotation -= 0.080;
		this.basket.ball1.rotation += 0.050;
		this.basket.ball1.rotation += 0.050;

		// this.partical.x = this.basket.ball1.x-15;
		// this.partical.y = this.basket.ball1.y-15;

		// this.partical.setVelocityX(this.basket.ball1.velocityX);
		// this.partical.setGravityY(this.basket.ball1.gravityY);
		// this.partical.setGravityX(this.basket.ball1.gravityX);
	}
	else if (!this.rotation == true && this.isLeft != true && this.play_button.visible == false) {
		this.basket.ball1.rotation += 0.120;
		this.basket.ball1.rotation += 0.080;
		this.basket.ball1.rotation -= 0.050;
		this.basket.ball1.rotation -= 0.050;

		// this.partical.x = this.basket.ball1.x+15;
		// this.partical.y = this.basket.ball1.y+15;
	}
  }

  ballposright() {
	if (this.basket.ball1.x > 1150) {
		this.basket.ball1.setX(-70);
		this.isLeft = false;
		this.basket.ball1.setVelocityX(400);
		this.basket.ball1.setGravityX(150);
		this.basket.ball1.setGravityY(4000);
	}
  }


  ballposleft() {
	if (this.basket.ball1.x < -70) {
		this.basket.ball1.setX(1150);
		this.isLeft = true;
		this.basket.ball1.setVelocityX(-400);
		this.basket.ball1.setGravityX(-150);
		this.basket.ball1.setGravityY(4000);
	}
  }
}


// if (this.basket.ball1.x >= 1150) {
//   this.key = 2;
//   console.log("object left");
// //   this.basket.ball1.x = 1220;
// //   this.basket.ball1.y = 1200;
//   this.basket.ball1.setVelocityY(-350 * 2.7);
//   this.basket.ball1.setVelocityX(-270 * 1);
// } else if (this.basket.ball1.x <= -70) {
//   this.key = 1;
//   console.log("object right");
// //   this.basket.ball1.x = -140;
// //   this.basket.ball1.y = 1200;
//   this.basket.ball1.setVelocityY(-350 * 2.7);
//   this.basket.ball1.setVelocityX(270 * 1);
// }



// if (this.basket.ball1.x >= 1150) {
// 	this.key = 2;
// 	this.basket.ball1.x = 1220;
// 	this.basket.ball1.setVelocityY(-350 * 2.7);
// 	this.basket.ball1.setVelocityX(-270 * 1);
//   } else if (this.basket.ball1.x <= -70) {
// 	this.key = 1;
// 	this.basket.ball1.x = -140;
// 	this.basket.ball1.setVelocityY(-350 * 2.7);
// 	this.basket.ball1.setVelocityX(270 * 1);
//   }


// update() {
// 	this.ballposright();
// 	this.ballposleft();
//   }



// ballposright() {
// 	if (this.basket.ball1.x > 1150) {
// 		this.basket.ball1.setX(-70);
// 		this.isLeft = false;

// 			this.basket.ball1.setVelocityX(400);
// 			this.basket.ball1.setGravityX(150);
// 			this.basket.ball1.setGravityY(4000);
// 		// this.basket.ball1.setY(1002);
// 		// this.basket.ball1.setY(500);
// 	}
//   }

//   ballposleft() {
// 	if (this.basket.ball1.x < -70) {
// 		this.basket.ball1.setX(1150);
// 		this.isLeft = true;
// 			this.basket.ball1.setVelocityX(-400);
// 			this.basket.ball1.setGravityX(-150);
// 			this.basket.ball1.setGravityY(4000);
// 		// this.basket.ball1.setY(1002);
// 		// this.basket.ball1.setY(500);
// 	}
//   }
// }

