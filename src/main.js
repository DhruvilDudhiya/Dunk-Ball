
window.addEventListener('load', function () {

	 game = new Phaser.Game({
		width: 1080,
		height: 1920,
		type: Phaser.AUTO,
        transparent : true,
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics : {
			default : 'arcade',
			arcade : {
				gravity : false,
				debug : false,
			},
		}
	});
	
	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
	game.scene.add("First", First);
	game.scene.add("ResultScene", ResultScene);

});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}