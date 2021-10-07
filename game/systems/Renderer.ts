import System from '../../engine/System'
import BabylonInterface from '../support/BabylonInterface'

export default class Renderer extends System {
  public async start() {
    BabylonInterface.init()
  }
}
