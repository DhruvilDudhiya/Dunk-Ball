
// You can write more code here

/* START OF COMPILED CODE */

class First extends Phaser.Scene {

	constructor() {
		super("First");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// playfont
		const playfont = this.add.image(540, 1390, "Play-button");

		// logo
		this.add.image(610, 630, "Logo");

		this.playfont = playfont;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	playfont;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.playfont.setInteractive().on('pointerdown', function (pointer) {
			console.log("hover");
			//   this.play_button.setTint()
			setTimeout(() => {
				this.scene.start("Level");
			}, 100);
		}, this)

		this.playfont.on("pointerover",()=>{
			this.input.setDefaultCursor('pointer');
		})
		this.playfont.on("pointerout",()=>{
			this.input.setDefaultCursor('default');
		})

		// this.play.on('pointerout',function(pointer){

		// })

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
