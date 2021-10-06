import Engine from '../engine/Engine'
import Renderer from './systems/Renderer'

export default class Game {
  private engine = new Engine()

  public constructor() {
    this.engine.addSystem(Renderer)
    this.engine.start()
  }
}
