import System from '../../engine/System'
import Player from '../components/Player'

export default class Input extends System {
  private keys: Record<string, boolean> = {}
  private mouse = {
    x: 0,
    y: 0,
  }

  public start() {
    window.addEventListener('keydown', (ev) => {
      this.keys[ev.key.toLowerCase()] = true
    })
    window.addEventListener('keyup', (ev) => {
      this.keys[ev.key.toLowerCase()] = false
    })

    window.addEventListener('pointermove', (ev) => {
      this.mouse.x += ev.movementX / 314
      this.mouse.y += ev.movementY / 314
    })

    document.body.addEventListener('click', () => {
      document.body.requestPointerLock()
    })
  }

  public update() {
    this.engine.with(Player, (player) => {
      player.yaw += this.mouse.x
      player.pitch += this.mouse.y

      if (this.keys['w']) {
        player.moveForward(1 * this.engine.deltaTime)
      }
      if (this.keys['s']) {
        player.moveForward(-1 * this.engine.deltaTime)
      }
      if (this.keys['a']) {
        player.moveRight(-1 * this.engine.deltaTime)
      }
      if (this.keys['d']) {
        player.moveRight(1 * this.engine.deltaTime)
      }
    })

    this.mouse.x = 0
    this.mouse.y = 0
  }
}
