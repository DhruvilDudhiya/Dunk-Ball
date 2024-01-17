
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// container
		const container = this.add.container(0, 0);

		// logo1
		this.add.image(610, 630, "Logo1");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		localStorage.setItem("bestScore", 0);
		localStorage.setItem("currentScore", 0);



		this.outerBar = this.add.sprite(540, 1700, "Loading1");
		this.outerBar.setOrigin(0.5);

		this.innerBar = this.add.sprite(
			540 / 2 + 17,
			1700,
			"Loading-bar1"
		).setScale(1, 1.1);
		this.innerBar.setOrigin(0, 0.5);


		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();
		this.maskGraphics.fillStyle(0xffffff);
		this.maskGraphics.fillRect(
			this.innerBar.x,
			this.innerBar.y - this.innerBar.displayHeight / 2,
			this.innerBar.displayWidth,
			this.innerBar.displayHeight
			);
			
		this.loadingBall = this.add.sprite(this.innerBar.x, this.innerBar.y, "For-loading-(basketball)").setScale(1);
		this.loadingBall.setOrigin(0, 0.5);

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());

		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			const currentProgress = currentInterval * progressIncrement;
			 // Replace with your game object image
			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);

			
			this.loadingBall.x = (this.innerBarWidth-60) * currentProgress + 280;

			currentInterval++;

			if (currentProgress >= 1) {
				clearInterval(progressInterval);
				this.scene.start("First");
			}
		};

		const progressInterval = setInterval(updateProgressBar, intervalDuration);


		// this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
