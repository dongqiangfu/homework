import Player from './player/index'
import Enemy from './npc/enemy'
import BossEnemy from './npc/bossEnemy.js'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
let ctx = canvas.getContext('2d')
let databus = new DataBus()
const ENEMY_SPEED = 3
const NUM_NORMAL_ENEMY = 10   // 普通敌机数量
const BOSSENEMY_LIFE = 10     // boss敌机生命值
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.bossEnemy = null   // boss敌机对象
    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate(playerLevel) {
    if (databus.score < NUM_NORMAL_ENEMY) {
      // 如果用户当前得分低于普通敌机数量，则呈现普通模式，敌机自由出现
      if (databus.frame % 100 === 0) {//敌机出现频率
        let enemy = databus.pool.getItemByClass('enemy', Enemy)
        enemy.init(ENEMY_SPEED)
        databus.enemys.push(enemy)
      }
    } else {
      // 如果用户当前得分高于普通敌机数量，则不再出现普通敌机，转而出现boss敌机
      if (this.bossEnemy == null) {
        // 如果boss敌机对象不存在，则创建新的boss敌机
        let bossEnemy = databus.pool.getItemByClass('enemy', BossEnemy)
        bossEnemy.init()
        databus.enemys.push(bossEnemy)
        this.bossEnemy = bossEnemy
      }
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this

    databus.bullets.forEach((bullet) => {
      for (let i = 0, il = databus.enemys.length; i < il; i++) {
        let enemy = databus.enemys[i]
        if (bullet.owner instanceof Enemy) {
          if (this.player.isCollideWith(bullet)) {
            databus.gameOver = true;
            break
          }
        } else if (bullet.owner instanceof Player) {
          if (!enemy.isBossEnemy) {
            // 如果是普通敌机
            if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
              // 且该敌机未在播放爆炸动画，且该敌机被玩家击中
              enemy.playAnimation();
              that.music.playExplosion();
              bullet.visible = false;
              databus.score += 1
              enemy.isExist = false;
            }
          } else {
            // 如果是boss敌机
            if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
              // boss敌机被玩家击中，且未正在播放爆炸动画
              if (enemy.nShot < BOSSENEMY_LIFE) {
                // 总共击中次数小于boss敌机生命值，则不播放爆炸动画，而是增加总击中次数
                enemy.nShot += 1
                databus.score += 1
                bullet.visible = false
              } else {
                // 总击中次数等于boss敌机生命值时，播放爆炸动画
                enemy.playAnimation()
                that.music.playExplosion()
                bullet.visible = false
                databus.score += 1
                enemy.isExist = false
                databus.gameOver = true
              }
            }
          }
        }
      }
    });
    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let enemy = databus.enemys[i]

      if (this.player.isCollideWith(enemy)) {
        databus.gameOver = true

        break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    this.player.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.touchHandler = this.touchEventHandler.bind(this)
      canvas.addEventListener("touchstart", this.touchHandler)
      this.gameinfo.renderGameOver(ctx, databus.score)
      this.bossEnemy = null
      return;
    }

    window.requestAnimationFrame(this.loop.bind(this), canvas);
  }

  // 游戏逻辑更新主函数
  update() {

    this.bg.update()

    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.update()
      })

    this.enemyGenerate()
    this.player.level = Math.max(1, Math.ceil(databus.score / 30));

    this.collisionDetection()

    if (databus.frame % 50 === 0) {//飞机炮弹发射频率
      this.player.shoot()
      this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    databus.enemys.forEach(enemy => {
      //const enemyShootPositions = [-enemy.height + ENEMY_SPEED * 10, -enemy.height + ENEMY_SPEED * 60];
      if (databus.frame % 80 === 0
        /*enemyShootPositions.indexOf(enemy.y) !== -1*/) {
        enemy.shoot();
        this.music.playShoot();
      }
    });
  }
}
