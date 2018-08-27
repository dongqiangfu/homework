import Sprite from '../base/sprite'
import DataBus from '../databus'

const BULLET_IMG_SRC = 'images/bullet.png';
const BULLET_WIDTH = 50;
const BULLET_HEIGHT = 50;

const BULLET_DOWN_IMG_SRC = 'images/bullet-down.png'
const BULLET_DOWN_WIDTH = 25;
const BULLET_DOWN_HEIGHT = 40;

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

export default class Bullet extends Sprite {
  constructor({ direction, owner } = { direction: 'up' }) {
    if (direction == 'up') {
      super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
    }
    else if (direction == 'down') {
      super(BULLET_DOWN_IMG_SRC, BULLET_DOWN_WIDTH, BULLET_DOWN_HEIGHT)
    }
    this.direction = direction;

    this.owner = owner;
  }
  init(x, y, speed) {
    this.x = x
    this.y = y
    this[__.speed] = speed
    this.visible = true
  }
  // 每一帧更新子弹位置
  update() {
    if (this.direction == 'up') {
      this.y -= this[__.speed]

      // 超出屏幕外回收自身
      if (this.y < -this.height)
        databus.removeBullets(this)
    }
    else {
      this.y += this[__.speed]
      if (this.y > window.innerHeight + this.height)
        databus.removeBullets(this)
    }
  }
}