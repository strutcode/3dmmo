import System from '../../engine/System'
import Player from '../components/Player'
import BabylonInterface from '../support/BabylonInterface'

export default class Physics extends System {
  public async start() {
    BabylonInterface.init()
  }

  public update() {
    this.engine.with(Player, (player) => {
      player.velocity.y = -9.87 * this.engine.deltaTime

      BabylonInterface.updatePlayer(player.velocity, player.pitch, player.yaw)

      player.velocity.x = 0
      player.velocity.y = 0
      player.velocity.z = 0
    })
  }
}
