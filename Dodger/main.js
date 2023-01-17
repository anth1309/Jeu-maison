var game = new Phaser.Game(1800, 1000);
var vitesse = 500; //variable pour la velocity si *-1 pour neg
var dodger = {
  preload: function () {
    //Chargement image
    game.load.image("fond", "assets/fond.png");
    game.load.image("player", "assets/player.png");
    game.load.image("mechant", "assets/mecht.png");
  },
  create: function () {
    //setup + affichage
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, "fond");
    this.player = game.add.sprite(900, 900, "player");
    this.player.anchor.set(0.5);
    game.physics.arcade.enable(this.player);
    this.cursors = game.input.keyboard.createCursorKeys();

    this.mechants = game.add.group(); //creer un groupe de mechant
    this.timer = game.time.events.loop(200, this.ajouterUnMechant, this);
    //initialisation du score
    this.score = 0;
    this.labelScore = game.add.text(40, 20, "0", {
      font: "40px Arial",
      fill: "#fff",
    }); //deuxieme partie css
  },
  update: function () {
    //Logique du jeu
    game.physics.arcade.overlap(
      this.player,
      this.mechants,
      this.restartGame,
      null,
      this
    ); //gere les colision donc la mort du perso
    this.player.body.velocity.x = 0; //dans update il le fait 60fps donc a chaque fois il fait velocity0
    this.player.body.velocity.y = 0;
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = vitesse * -1;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = vitesse;
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = vitesse * -1;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = vitesse;
    }
    if (this.player.inWorld === false) {
      this.restartGame();
    }
  },
  restartGame: function () {
    game.state.start("dodger");
  },
  ajouterUnMechant: function () {
    let position = Math.floor(Math.random() * 1750) + 1; //1750=largeur ecran moins largeur mechant pour etre sur tout l ecran
    let mechant = game.add.sprite(position, 100, "mechant");
    // this.mechant.anchor.set(0.5);
    game.physics.arcade.enable(mechant);
    mechant.body.gravity.y = 500; //vitesse de la gravite
    this.mechants.add(mechant);
    //qd un mechant est eviter +20 de score
    this.score += 20;
    this.labelScore.text = this.score;
    mechant.checkWorldBounds = true; //verifi si mechant est dans le monde pour ne pas surcharger la memoire
    mechant.outOfBoundsKill = true;
  },
};

game.state.add("dodger", dodger);
game.state.start("dodger");
