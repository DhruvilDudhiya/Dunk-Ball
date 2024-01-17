
// You can write more code here

/* START OF COMPILED CODE */

class RightBasketPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// board
		const board = scene.add.image(141, 62, "Board-");
		board.scaleX = 0.3;
		board.scaleY = 0.3;
		this.add(board);

		// net1
		const net1 = scene.add.image(60, 150, "Net-1");
		net1.scaleX = 0.3;
		net1.scaleY = 0.3;
		this.add(net1);

		// net
		const net = scene.add.image(54, 94, "net");
		net.scaleX = 0.3;
		net.scaleY = 0.3;
		this.add(net);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
