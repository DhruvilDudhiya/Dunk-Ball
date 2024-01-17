class GameManager {
  constructor(oScene) {
    this.oScene = oScene;
  }

  gamePlay() {
    // Add ball

    this.addTopBasket();

    this.ball1 = this.oScene.physics.add.image(200, 960, "Basketball-");
    this.ball1.setScale(0.25, 0.25);
    this.ball1.setName("ball");
    this.ball1.setOrigin(0.5);
    this.ball1.setCircle(226, 28, 28);
    this.ball1.refreshBody();
    this.ball1.visible = true;
    this.ball1.setGravityY(2000);
    this.ball1.setBounceY(0.6);

    this.particles = this.oScene.add.particles("round-black"); // Replace 'particle-image' with your particle image key
    this.particleEmitter = this.particles.createEmitter({
      x: this.ball1.x, // Initial X position (this.ball1's X position)
      y: this.ball1.y, // Initial Y position (this.ball1's Y position)
      speed: { min: -10, max: 10 }, // Adjust as needed
      angle: { min: 0, max: 360 }, // Adjust as needed
      scale: { start: 0.18, end: 0 },
      frequency: 100,
    //   gravityY: 100,
    //   lifespan: { min: 100, max: 200 },
      blendMode: "ADD", // Adjust blending mode as needed
    });
    this.particleEmitter.stop();

    this.setLeft();
    this.setRight();

    this.leftBasket.x = -350;
    this.leftBasketRing.x = -350;

    this.rightBasket.x = 1430;
    this.rightBasketRing.x = 1430;

    this.ground = this.oScene.physics.add.staticImage(531, 1724, "bg_image");
    this.ground.scaleX = 1;
    this.ground.scaleY = 0.08;
    this.ground.alpha = 0.4;
    this.ground.visible = false;
    this.ground.refreshBody();

    this.oScene.physics.add.collider(this.ball1, this.ground);

    this.oScene.input.on("pointerup", this.onClickEvent, this);

    this.setUpColliders();
    setTimeout(() => {
      // this.basket1AnimationIn();
      this.y = Math.floor(Math.random() * (700 - 400) + 400);
      this.basket2AnimationIn();
    }, 100);

    this.oScene.pause_ui.setInteractive().on("pointerdown", () => {
      this.oScene.pause_ui.visible = false;
      this.oScene.play_button.visible = true;
      this.oScene.physics.world.pause();
    });
    this.oScene.play_button.setInteractive().on("pointerdown", () => {
      this.oScene.pause_ui.visible = true;
      this.oScene.play_button.visible = false;
      this.oScene.physics.world.resume();
    });

    this.oScene.pause_ui.on("pointerover", () => {
      this.oScene.input.setDefaultCursor("pointer");
    });
    this.oScene.pause_ui.on("pointerout", () => {
      this.oScene.input.setDefaultCursor("default");
    });
    this.oScene.play_button.on("pointerover", () => {
      this.oScene.input.setDefaultCursor("pointer");
    });
    this.oScene.play_button.on("pointerout", () => {
      this.oScene.input.setDefaultCursor("default");
    });
    this.oScene.sound.on("pointerover", () => {
      this.oScene.input.setDefaultCursor("pointer");
    });
    this.oScene.sound.on("pointerout", () => {
      this.oScene.input.setDefaultCursor("default");
    });

    this.oScene.sound.setInteractive().on("pointerdown", () => {
      this.oScene.sound_Off.visible =
        this.oScene.sound_Off.visible == false ? true : false;
    });

    this.startGame();
    this.oScene.physics.world.resume();
  }

  startGame() {
    this.outerBar = this.oScene.add.sprite(540, 123, "Loading1");
    this.outerBar.setOrigin(0.5);

    this.innerBar = this.oScene.add
      .sprite(540 / 2 + 17, 123, "Loading-bar1")
      .setScale(1, 1.1);
    this.innerBar.setOrigin(0, 0.5);

    this.loadingBall = this.oScene.add
      .sprite(this.innerBar.x, this.innerBar.y, "For-loading-(basketball)")
      .setScale(1);
    this.loadingBall.setOrigin(0, 0.5);
    this.innerBarWidth = this.innerBar.displayWidth;

    this.maskGraphics = this.oScene.make.graphics();
    this.maskGraphics.fillStyle(0xffffff);
    this.maskGraphics.fillRect(
      this.innerBar.x,
      this.innerBar.y - this.innerBar.displayHeight / 2,
      this.innerBar.displayWidth,
      this.innerBar.displayHeight
    );

    this.innerBar.setMask(this.maskGraphics.createGeometryMask());

    const loadingDuration = 6000;
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
      if (this.oScene.play_button.visible == false) {
        currentInterval++;
      }
      this.loadingBall.x = (this.innerBarWidth - 60) * currentProgress + 280;

      if (currentProgress >= 1) {
        if (
          Number(localStorage.getItem("bestScore")) <=
          Number(this.oScene.scoreText.text)
        ) {
          localStorage.setItem("bestScore", Number(this.oScene.scoreText.text));
          localStorage.setItem(
            "currentScore",
            Number(this.oScene.scoreText.text)
          );
        } else {
          localStorage.setItem(
            "bestScore",
            Number(localStorage.getItem("bestScore"))
          );
          localStorage.setItem(
            "currentScore",
            Number(this.oScene.scoreText.text)
          );
        }
        this.oScene.scene.stop("Level");
        this.oScene.scene.start("ResultScene");
        clearInterval(this.progressInterval);
        // this.scene.start("First");
      }
    };

    this.progressInterval = setInterval(updateProgressBar, intervalDuration);
  }

  basket1AnimationIn() {
    this.tween11 = this.oScene.tweens.add({
      targets: this.leftBasket,
      duration: 600,
      x: 0,
      ease: "Power",
      repeat: 0,
      onComplete: () => {
        // this.setLeftBasketY();
      },
    });
    this.tween12 = this.oScene.tweens.add({
      targets: this.leftBasketRing,
      duration: 600,
      x: 0,
      ease: "Power",
      repeat: 0,
      onComplete: () => {},
    });
    this.setLeftBasketY();
  }

  basket1AnimationOut() {
    this.tween11 = this.oScene.tweens.add({
      targets: this.leftBasket,
      duration: 600,
      x: -2000,
      ease: "Power",
      repeat: 0,
      onComplete: () => {
        this.setLeftBasketY();
      },
    });
    this.tween12 = this.oScene.tweens.add({
      targets: this.leftBasketRing,
      duration: 600,
      x: -2000,
      ease: "Power",
      repeat: 0,
      onComplete: () => {
        this.setLeftBasketY();
      },
    });
  }

  basket2AnimationIn() {
    this.tween21 = this.oScene.tweens.add({
      targets: this.rightBasket,
      duration: 600,
      x: 760,
      ease: "Power",
      repeat: 0,
      onComplete: () => {
        // this.setRightBasketY();
      },
    });
    this.tween22 = this.oScene.tweens.add({
      targets: this.rightBasketRing,
      duration: 600,
      x: 760,
      ease: "Power",
      repeat: 0,
      onComplete: () => {},
    });
    this.setRightBasketY();
  }
  basket2AnimationOut() {
    this.tween21 = this.oScene.tweens.add({
      targets: this.rightBasket,
      duration: 600,
      x: 3080,
      ease: "Power",
      repeat: 0,
      onComplete: () => {
        this.setRightBasketY();
      },
    });
    this.tween22 = this.oScene.tweens.add({
      targets: this.rightBasketRing,
      duration: 600,
      x: 3080,
      ease: "Power",
      repeat: 0,
      onComplete: () => {
        this.setRightBasketY();
      },
    });
  }

  setLeftBasketY() {
    this.leftBasket.y = this.y;
    this.leftBasketRing.y = this.y;
  }
  setRightBasketY() {
    this.rightBasket.y = this.y;
    this.rightBasketRing.y = this.y;
  }

  setUpColliders() {
    //collider /w ball and rod1
    // this.oScene.physics.add.collider(this.ball1, this.lTempLine1);
    // collidere b/w ball and rod2
    // this.oScene.physics.add.collider(this.ball1, this.lTempLine2);
    this.oScene.physics.add.collider(
      this.ball1,
      this.lTempLine2,
      this.updateRateBoundaryPhysics1,
      null,
      this
    );
    //collider /w ball and rod1
    // this.oScene.physics.add.collider(this.ball1, this.rTempLine1);
    // collidere b/w ball and rod2
    // this.oScene.physics.add.collider(this.ball1, this.rTempLine2);
    this.oScene.physics.add.collider(
      this.ball1,
      this.rTempLine2,
      this.updateRateBoundaryPhysics2,
      null,
      this
    );
    // collder b/w ball and lboard
    this.oScene.physics.add.collider(
      this.ball1,
      this.lboard,
      this.updateBoundaryPhysics1,
      null,
      this
    );
    // collder b/w ball and rboard
    this.oScene.physics.add.collider(
      this.ball1,
      this.rboard,
      this.updateBoundaryPhysics2,
      null,
      this
    );

    this.oScene.physics.add.collider(this.ball1, this.lTempColl);

    this.oScene.physics.add.collider(this.ball1, this.rTempColl);

    this.collider1 = this.oScene.physics.add.overlap(
      this.ball1,
      this.rTempLine1,
      () => {
        this.rTempColl.destroy();
		console.log("Overlapping");
        // this.oScene.physics.world.removeCollider(this.collider1);
        this.y = Math.floor(Math.random() * (700 - 400) + 400);
        console.log(this.ball1.x, this.ball1.y);
	    	this.smoke1 = this.oScene.add.sprite(this.rTempLine1.x , this.rTempLine1.y,"Ring-1");
        this.rightBasket.add(this.smoke1);
        this.smoke1.anims.play("ring_animation");
        setTimeout(() => {
          this.oScene.scoreText.text = Number(this.oScene.scoreText.text) + 1;
          this.oScene.key = 1;
          this.basket1AnimationIn();
          this.basket2AnimationOut();
          // loading_bar
          this.rTempLine1 = this.oScene.physics.add.image(110, 195, "eCont1");
          this.rTempLine1.scaleX = 0.05;
          this.rTempLine1.scaleY = 0.1;
          this.rTempLine1.setSize(1300, 110);
          this.rTempLine1.refreshBody();
          this.rTempLine1.setImmovable(true);
          this.rTempLine1.visible = false;
          this.rightBasket.add(this.rTempLine1);

          // loading_bar
          this.rTempColl = this.oScene.physics.add.image(110, 235, "eCont1");
          this.rTempColl.scaleX = 0.05;
          this.rTempColl.scaleY = 0.1;
          this.rTempColl.setSize(1300, 110);
          this.rTempColl.refreshBody();
          this.rTempColl.setImmovable(true);
          this.rTempColl.visible = false;
          this.rightBasket.add(this.rTempColl);
          this.updateAll();
        }, 700);
        this.oScene.isLeft = true;
        this.rTempLine1.destroy();
      },
      null,
      this
    );

    this.collider2 = this.oScene.physics.add.overlap(
      this.ball1,
      this.lTempLine1,
      () => {
        this.lTempColl.destroy();
        // this.oScene.physics.world.removeCollider(this.collider2);
        this.y = Math.floor(Math.random() * (700 - 400) + 400);
        console.log(this.ball1.x, this.ball1.y);
        setTimeout(() => {
          this.oScene.scoreText.text = Number(this.oScene.scoreText.text) + 1;
          this.oScene.key = 2;
          this.basket1AnimationOut();
          this.basket2AnimationIn();
          // loading_bar
          this.lTempLine1 = this.oScene.physics.add.image(220, 195, "eCont1");
          this.lTempLine1.scaleX = 0.05;
          this.lTempLine1.scaleY = 0.1;
          this.lTempLine1.setSize(1300, 110);
          this.lTempLine1.refreshBody();
          this.lTempLine1.setImmovable(true);
          this.lTempLine1.visible = false;
          this.leftBasket.add(this.lTempLine1);

          // loading_bar
          this.lTempColl = this.oScene.physics.add.image(220, 235, "eCont1");
          this.lTempColl.scaleX = 0.05;
          this.lTempColl.scaleY = 0.1;
          this.lTempColl.setSize(1300, 110);
          this.lTempColl.refreshBody();
          this.lTempColl.setImmovable(true);
          this.lTempColl.visible = false;
          this.leftBasket.add(this.lTempColl);

        //   this.rRing = this.oScene.add.image(250, 300, "Ring-1");
        //   this.rightBasketRing.add(this.rRing);
        //   this.lRing.anims.play("ring_animation", true);

          this.updateAll();
        }, 700);
        this.oScene.isLeft = false;
        this.lTempLine1.destroy();
      },
      null,
      this
    );
  }

  updateAll() {
    this.onClickScore();
    this.setUpColliders();
    this.updateTimer();
  }

  updateTimer() {
    clearInterval(this.progressInterval);
    this.innerBar.destroy();
    this.outerBar.destroy();
    this.maskGraphics.destroy();
    this.loadingBall.destroy();

    this.startGame();
  }

  updateBoundaryPhysics1() {
    if (this.ball1.x <= 110) {
      this.ball1.setVelocityX(-300);
      this.ball1.setVelocityY(-900);
    } else {
      this.ball1.setVelocityX(150);
    }
  }
  updateBoundaryPhysics2() {
    if (this.ball1.x >= 970) {
      this.ball1.setVelocityX(300);
      this.ball1.setVelocityY(-900);
    } else {
      this.ball1.setVelocityX(-150);
    }
  }

  updateRateBoundaryPhysics1() {
    // let rx = this.rnet.x;
    // let ry = this.rnet.y;
    // this.tween11 = this.oScene.tweens.add({
    // 	targets: this.leftBasket,
    // 	duration: 50,
    // 	angle: 5,
    // 	ease: 'yoyo',
    // 	repeat: 0,
    // 	onComplete : () => {
    // 		this.tween11 = this.oScene.tweens.add({
    // 			targets: this.leftBasket,
    // 			duration: 50,
    // 			angle: 0,
    // 			ease: 'yoyo',
    // 			repeat: 0,
    // 			onComplete : () => {

    // 			}
    // 		});
    // 	}
    // });
    // this.tween12 = this.oScene.tweens.add({
    // 	targets: this.lnet,
    // 	duration: 50,
    // 	angle: 5,
    // 	x: rx-40,
    // 	y: ry-17,
    // 	ease: 'yoyo',
    // 	repeat: 0,
    // 	onComplete : () => {
    // 		this.tween12 = this.oScene.tweens.add({
    // 			targets: this.lnet,
    // 			duration: 50,
    // 			angle: 0,
    // 			x: rx,
    // 			y: ry,
    // 			ease: 'yoyo',
    // 			repeat: 0,
    // 			onComplete : () => {

    // 			}
    // 		});
    // 	}
    // });

    if (this.ball1.x <= 312) {
      this.ball1.setVelocityX(-200);
    } else if (this.ball1.x > 312) {
      this.ball1.setVelocityX(200);
    }
  }
  updateRateBoundaryPhysics2() {
    // this.rightBasket.setOrigin(1, 0.5);
    // this.rnet.setOrigin(1, 0.5);
    // let rx = this.rnet.x;
    // let ry = this.rnet.y;

    // this.tween21 = this.oScene.tweens.add({
    // 	targets: this.rightBasket,
    // 	duration: 30,
    // 	angle: -5,
    // 	ease: 'yoyo',
    // 	repeat: 0,
    // 	onComplete : () => {
    // 		this.tween21 = this.oScene.tweens.add({
    // 			targets: this.rightBasket,
    // 			duration: 30,
    // 			angle: 0,
    // 			ease: 'yoyo',
    // 			repeat: 0,
    // 			onComplete : () => {

    // 			}
    // 		});
    // 	}
    // });
    // this.tween22 = this.oScene.tweens.add({
    // 	targets: this.rnet,
    // 	duration: 30,
    // 	angle: -5,
    // 	x: rx+40,
    // 	y: ry+17,
    // 	ease: 'yoyo',
    // 	repeat: 0,
    // 	onComplete : () => {
    // 		this.tween22 = this.oScene.tweens.add({
    // 			targets: this.rnet,
    // 			duration: 30,
    // 			x: rx,
    // 			y: ry,
    // 			angle: 0,
    // 			ease: 'yoyo',
    // 			repeat: 0,
    // 			onComplete : () => {

    // 			}

    // 		});
    // 	}

    // });

    if (this.ball1.x <= 768) {
      this.ball1.setVelocityX(-200);
    } else if (this.ball1.x > 768) {
      this.ball1.setVelocityX(200);
    }
  }

  // updateBoundaryPhysics1() {
  // 	this.ball1.setVelocityX(-30);
  // }
  // updateBoundaryPhysics2() {
  // 	this.ball1.setVelocityX(30);
  // }

  // this.time.delayedCall(3000, function() {
  // 	emitters.destroy();
  // });
  // emitters.setParticleLifespan(time);

  // emitters.on('complete', function(emitters) {

  // })

  onClickEvent(p, g) {
    // To start emitting particles
    this.particleEmitter.start();

    // // To stop emitting particles
    setTimeout(() => {
      this.particleEmitter.stop();
    }, 2000);

    if (!g.length) {
      this.oScene.rotation = false;
      if (this.oScene.key == 2) {
        this.moveRight();
      } else if (this.oScene.key == 1) {
        this.moveLeft();
      }
    }
  }
  onClickScore() {
    if (this.oScene.key == 2) {
      this.ball1.setVelocityX(400);
      this.ball1.setGravityX(150);
      this.ball1.setGravityY(4000);
    } else if (this.oScene.key == 1) {
      this.ball1.setVelocityX(-400);
      this.ball1.setGravityX(-150);
      this.ball1.setGravityY(4000);
    }
  }

  //ball move right
  moveRight() {
    this.ball1.setVelocityY(-550 * 2.7);
    this.ball1.setVelocityX(400);
    this.ball1.setGravityX(50);
    this.ball1.setGravityY(4000);
  }
  // Ball move left
  moveLeft() {
    this.ball1.setVelocityY(-550 * 2.7);
    this.ball1.setVelocityX(-400);
    this.ball1.setGravityX(-50);
    this.ball1.setGravityY(4000);
  }

  setLeft() {
    // leftBasket
    this.leftBasket = this.oScene.add.container(0, 500);

    // net1
    this.lnet1 = this.oScene.physics.add.image(77, 124, "Net-1");
    this.lnet1.scaleX = 0.5;
    this.lnet1.scaleY = 0.5;
    this.lnet1.flipX = true;
    this.leftBasket.add(this.lnet1);

    // loading_bar
    this.lTempLine1 = this.oScene.physics.add.image(220, 195, "eCont1");
    this.lTempLine1.scaleX = 0.05;
    this.lTempLine1.scaleY = 0.1;
    this.lTempLine1.setSize(1300, 110);
    this.lTempLine1.refreshBody();
    this.lTempLine1.setImmovable(true);
    this.lTempLine1.visible = false;
    this.leftBasket.add(this.lTempLine1);

    // loading_bar
    this.lTempColl = this.oScene.physics.add.image(220, 235, "eCont1");
    this.lTempColl.scaleX = 0.05;
    this.lTempColl.scaleY = 0.1;
    this.lTempColl.setSize(1300, 110);
    this.lTempColl.refreshBody();
    this.lTempColl.setImmovable(true);
    this.lTempColl.visible = false;
    this.leftBasket.add(this.lTempColl);

    // loading_bar
    this.lTempLine3 = this.oScene.physics.add.image(235, 200, "eCont1");
    this.lTempLine3.scaleX = 0.05;
    this.lTempLine3.scaleY = 0.1;
    this.lTempLine3.setSize(1300, 110);
    this.lTempLine3.refreshBody();
    this.lTempLine3.setImmovable(true);
    this.lTempLine3.visible = false;
    this.leftBasket.add(this.lTempLine3);

    // loading_bar
    this.lTempLine2 = this.oScene.physics.add.image(295, 172, "Basketball-");
    this.lTempLine2.scaleX = 0.015;
    this.lTempLine2.scaleY = 0.015;
   
    this.lTempLine2.refreshBody();
    this.lTempLine2.setImmovable(true);
    this.lTempLine2.visible = true;
    this.leftBasket.add(this.lTempLine2);

    this.lnet1.setOrigin(0, 0);

   
  }

  setRight() {
    // rightBasket
    this.rightBasket = this.oScene.add.container(760, 500);

    // net1
    this.rnet1 = this.oScene.physics.add.image(251, 124, "Net-1");
    this.rnet1.scaleX = 0.5;
    this.rnet1.scaleY = 0.5;
    // this.rnet1.refreshBody();
    this.rightBasket.add(this.rnet1);

    // loading_bar
    this.rTempLine1 = this.oScene.physics.add.image(110, 195, "eCont1");
    this.rTempLine1.scaleX = 0.05;
    this.rTempLine1.scaleY = 0.1;
    this.rTempLine1.setSize(1300, 110);
    this.rTempLine1.refreshBody();
    this.rTempLine1.setImmovable(true);
    this.rTempLine1.visible = false;
    this.rightBasket.add(this.rTempLine1);

    // loading_bar
    this.rTempColl = this.oScene.physics.add.image(110, 235, "eCont1");
    this.rTempColl.scaleX = 0.05;
    this.rTempColl.scaleY = 0.1;
    this.rTempColl.setSize(1300, 110);
    this.rTempColl.refreshBody();
    this.rTempColl.setImmovable(true);
    this.rTempColl.visible = false;
    this.rightBasket.add(this.rTempColl);

    // loading_bar
    this.rTempLine3 = this.oScene.physics.add.image(95, 200, "eCont1");
    this.rTempLine3.scaleX = 0.05;
    this.rTempLine3.scaleY = 0.1;
    this.rTempLine3.setSize(1300, 110);
    this.rTempLine3.refreshBody();
    this.rTempLine3.setImmovable(true);
    this.rTempLine3.visible = false;
    this.rightBasket.add(this.rTempLine3);

    // loading_bar
    this.rTempLine2 = this.oScene.physics.add.image(33, 172, "Basketball-");
    this.rTempLine2.scaleX = 0.015;
    this.rTempLine2.scaleY = 0.015;
    // this.rTempLine2.setCircle(226, 28, 28);
    this.rTempLine2.refreshBody();
    this.rTempLine2.setImmovable(true);
    this.rTempLine2.visible = true;
    this.rightBasket.add(this.rTempLine2);

    this.rnet1.setOrigin(1, 0);

    // this.rightBasket.bringToTop(this.rnet1);
  }

  addTopBasket() {
    this.leftBasketRing = this.oScene.add.container(0, 500);
    // board
    this.lboard = this.oScene.physics.add.image(95, 105, "Board-");
    this.lboard.scaleX = 0.5;
    this.lboard.scaleY = 0.5;
    this.lboard.flipX = true;
    this.lboard.setSize(180, 430);
    this.lboard.setImmovable(true);
    this.leftBasketRing.add(this.lboard);

    this.lnet = this.oScene.physics.add.image(76, 380, "net");
    this.lnet.scaleX = 0.5;
    this.lnet.scaleY = 0.5;
    this.lnet.flipX = true;
    this.leftBasketRing.add(this.lnet);

    // ring_1

    this.rightBasketRing = this.oScene.add.container(760, 500);

    // board
    this.rboard = this.oScene.physics.add.image(231, 105, "Board-");
    this.rboard.scaleX = 0.5;
    this.rboard.scaleY = 0.5;
    this.rboard.setSize(180, 430);
    this.rboard.setImmovable(true);
    this.rightBasketRing.add(this.rboard);

    this.rnet = this.oScene.physics.add.image(250, 380, "net");
    this.rnet.scaleX = 0.5;
    this.rnet.scaleY = 0.5;
    this.rightBasketRing.add(this.rnet);

    this.rnet.setOrigin(1, 1);
    this.lnet.setOrigin(0, 1);

  }
}
