import Engine from '../engine/Engine'
import Player from './components/Player'
import Input from './systems/Input'
import Physics from './systems/Physics'
import Renderer from './systems/Renderer'

export default class Game {
  private engine = new Engine()

  public constructor() {
    this.engine.addSystem(Input)
    this.engine.addSystem(Renderer)
    this.engine.addSystem(Physics)

    this.engine.createEntity([Player])

    this.engine.start()
  }
}
