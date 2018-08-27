import Animation from '../base/animation'
import DataBus from '../databus'
import Bullet from '../player/bullet';

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 80
const ENEMY_HEIGHT = 100
const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.initExplosionAnimation()
    this.isBossEnemy = false
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
    this.y = -this.height
    this[__.speed] = speed
    this.visible = true
    this.isExist = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新敌机位置
  update() {
    this.y += this[__.speed]

    // 普通敌机飞出屏幕范围，则回收该对象
    if (this.y > window.innerHeight + this.height) {
      databus.removeEnemey(this)
    }
  }

  // 发射子弹
  shoot() {
    if (this.isExist) {
      const bullet = databus.pool.getItemByClass('bullet', Bullet, { direction: 'down', owner: this})
      bullet.init(this.x + this.width / 2 - bullet.width / 2, this.y + this.height / 2, this[__.speed] + 3)
      databus.bullets.push(bullet)
    }
  }
}