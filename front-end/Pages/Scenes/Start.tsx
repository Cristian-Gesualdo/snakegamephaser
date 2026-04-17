import Phaser from 'phaser'

export default class Start extends Phaser.Scene {
  constructor() {
    super({ key: 'Start' })
  }

  preload() {
    this.load.image('fondoStart', '/img/presentacionSnake.jpeg')

    this.load.image('playStart', '/img/PlayFlecha.png')
  }
  create() {
    this.add.image(300, 300, 'fondoStart').setDisplaySize(600, 600)

    this.add
      .image(130, 405, 'playStart')
      .setDisplaySize(130, 80)
      .setInteractive()
      .on('pointerdown', (e) => {
        this.scene.start('Game')
      })
  }
}
