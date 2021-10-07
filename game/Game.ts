import Engine from '../engine/Engine'
import Physics from './systems/Physics'
import Renderer from './systems/Renderer'

export default class Game {
  private engine = new Engine()

  public constructor() {
    this.engine.addSystem(Renderer)
    this.engine.addSystem(Physics)
    this.engine.start()
  }
}
