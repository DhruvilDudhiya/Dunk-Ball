
// You can write more code here

/* START OF COMPILED CODE */

class ResultScene extends Phaser.Scene {

	constructor() {
		super("ResultScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bgBlack
		const bgBlack = this.add.rectangle(540, 960, 1500, 1920);
		bgBlack.isFilled = true;
		bgBlack.fillColor = 0;
		bgBlack.fillAlpha = 0.1;

		// repeat_button
		const repeat_button = this.add.image(540, 1446, "Repeat-button");

		// score_text
		this.add.image(540, 436, "Score-text");

		// best_text
		this.add.image(540, 895, "Best-text");

		// bestScoreTxt
		const bestScoreTxt = this.add.text(540, 1100, "", {});
		bestScoreTxt.scaleX = 1.8;
		bestScoreTxt.scaleY = 1.8;
		bestScoreTxt.setOrigin(0.5, 0.5);
		bestScoreTxt.text = "0";
		bestScoreTxt.setStyle({ "align": "center", "fontSize": "102px", "stroke": "#000000ff", "strokeThickness":13});

		// currentScoreTxt
		const currentScoreTxt = this.add.text(540, 658.07421875, "", {});
		currentScoreTxt.scaleX = 1.8;
		currentScoreTxt.scaleY = 1.8;
		currentScoreTxt.setOrigin(0.5, 0.5);
		currentScoreTxt.text = "0";
		currentScoreTxt.setStyle({ "align": "center", "fontSize": "102px", "stroke": "#000000ff", "strokeThickness":13});

		this.repeat_button = repeat_button;
		this.bestScoreTxt = bestScoreTxt;
		this.currentScoreTxt = currentScoreTxt;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	repeat_button;
	/** @type {Phaser.GameObjects.Text} */
	bestScoreTxt;
	/** @type {Phaser.GameObjects.Text} */
	currentScoreTxt;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.currentScoreTxt.text = localStorage.getItem("currentScore");
		this.bestScoreTxt.text = localStorage.getItem("bestScore");
		this.repeat_button.setInteractive().on("pointerup", () => {
			this.scene.start("Level");
		}, this);

		this.repeat_button.on("pointerover",()=>{
			this.input.setDefaultCursor('pointer');
		})
		this.repeat_button.on("pointerout",()=>{
			this.input.setDefaultCursor('default');
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
