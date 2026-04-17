import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  keys: any

  soundLoser: any

  soundWin: any

  soundFood: any

  score: number

  direction: any

  newDirection: any

  addNew: Boolean

  updateDelay: number

  foodSnake: any

  snakeBody: Array<any>

  snakeSprite: any

  sign: any

  textScore: any

  restart: any

  firstCell: any

  lastCell: any

  oldLastCellx: any

  oldLastCelly: any

  snakeNewSprite: any

  constructor() {
    super({ key: 'Game' })
  }

  preload() {
    this.load.image('sign', '/img/Cartel.png')

    this.load.image('restart', '/img/restart.png')

    this.load.image('snake', '/img/bodySnake.png')

    this.load.image('food', '/img/foot1.png')

    this.load.audio('soundFood', '/food.mp3')

    this.load.audio('soundLoser', '/loser.mp3')

    this.load.audio('soundWin', '/win.mp3')
  }
  create() {
    this.keys = this.input.keyboard.addKeys('W,S,A,D')

    this.soundLoser = this.sound.add('soundLoser', { loop: false })

    this.soundWin = this.sound.add('soundWin', { loop: false })

    this.soundFood = this.sound.add('soundFood', { loop: false })

    this.score = 0

    this.direction = ''

    this.newDirection = ''

    this.addNew = false

    this.updateDelay = 0

    this.foodSnake = this.physics.add
      .sprite(460, 180, 'food')

      .setPushable(true)
      .setBounce(1)
      .setBodySize(40, 40)

      .setName('SceneSprite')

    this.snakeBody = []

    this.snakeSprite = this.physics.add
      .sprite(300, 300, 'snake')

      .setPushable(true)
      .setBounce(1)

      .setName('SnakeSprite')

    this.snakeBody.push(this.snakeSprite)

    this.sign = this.add.image(300, 300, 'sign').setDisplaySize(300, 300)

    this.sign.setAlpha(0)

    this.sign.setDepth(1)

    this.textScore = this.add.text(+`300`, +`300`, `Score: ${this.score}`, {
      font: '40px Arial Black',
      color: '#fff',
      align: 'left',
    })

    this.textScore.setAlpha(0)

    this.textScore.setDepth(1)

    this.textScore.setOrigin(0.5, 0.5)

    this.restart = this.add
      .image(300, 380, 'restart')
      .setDisplaySize(40, 40)
      .setInteractive()
      .on('pointerdown', (e) => {
        this.game.resume()

        this.scene.restart()
      })

    this.restart.setAlpha(0)

    this.restart.setDepth(1)
  }
  update() {
    this.updateDelay = this.updateDelay + 1

    if (this.keys.W.isDown) {
      if (this.direction != 'S') {
        this.newDirection = 'W'
      }
    } else if (this.keys.S.isDown) {
      if (this.direction != 'W') {
        this.newDirection = 'S'
      }
    } else if (this.keys.A.isDown) {
      if (this.direction != 'D') {
        this.newDirection = 'A'
      }
    } else if (this.keys.D.isDown) {
      if (this.direction != 'A') {
        this.newDirection = 'D'
      }
    }

    if (this.updateDelay % 20 == 0) {
      this.firstCell = this.firstCell = this.snakeBody[this.snakeBody.length - 1]

      this.lastCell = this.lastCell = this.snakeBody.shift()

      this.oldLastCellx = this.oldLastCellx = this.lastCell.x

      this.oldLastCelly = this.oldLastCelly = this.lastCell.y

      if (this.newDirection) {
        this.direction = this.newDirection
        this.newDirection = ''
      }

      if (this.direction == 'D') {
        this.lastCell.x = this.firstCell.x + 40
        this.lastCell.y = this.firstCell.y
      }

      if (this.direction == 'A') {
        this.lastCell.x = this.firstCell.x - 40
        this.lastCell.y = this.firstCell.y
      }

      if (this.direction == 'W') {
        this.lastCell.x = this.firstCell.x
        this.lastCell.y = this.firstCell.y - 40
      }

      if (this.direction == 'S') {
        this.lastCell.x = this.firstCell.x
        this.lastCell.y = this.firstCell.y + 40
      }

      this.snakeBody.push(this.lastCell)

      this.firstCell = this.lastCell
      if (this.addNew) {
        this.snakeNewSprite = this.physics.add
          .sprite(this.oldLastCellx, this.oldLastCelly, 'snake')

          .setPushable(true)
          .setBounce(1)

          .setName('SnakeSprite snake')

        this.snakeBody.unshift(this.snakeNewSprite)

        this.addNew = false
      }

      this.foodCollision()

      this.wallCollision(this.firstCell)

      this.selfCollision(this.firstCell)
    }

    if (this.score >= 100) {
      this.YouWin()
    }
  }

  foodCollision() {
    if (this.physics.overlap(this.snakeBody, this.foodSnake)) {
      this.addNew = true

      this.foodSnake.setPosition(Phaser.Math.Between(1, 15) * 40 - 20, Phaser.Math.Between(1, 15) * 40 - 20)

      this.score = this.score + 1
      if (this.score < 100) {
        this.soundFood.play()
      }
    }
  }
  selfCollision(head) {
    for (let i = 0; i < this.snakeBody.length - 1; i++) {
      if (head.x == this.snakeBody[i].x && head.y == this.snakeBody[i].y) {
        this.resetGame()
      }
    }
  }
  wallCollision(head) {
    if (head.x >= this.physics.world.bounds.width || head.x < 0 || head.y < 0 || head.y >= this.physics.world.bounds.height) {
      this.resetGame()
    }
  }
  YouWin() {
    this.soundWin.play()

    this.textScore.setText(` You Win\nScore: ${this.score}`)

    this.sign.setAlpha(1)

    this.textScore.setAlpha(1)

    this.restart.setAlpha(1)

    this.game.pause()
  }
  resetGame() {
    this.soundLoser.play()

    this.textScore.setText(`Score: ${this.score}`)

    this.sign.setAlpha(1)

    this.textScore.setAlpha(1)

    this.restart.setAlpha(1)

    this.game.pause()
  }
}
