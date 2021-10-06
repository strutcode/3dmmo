import System from '../../engine/System'
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core'

export default class Renderer extends System {
  public start() {
    const canvas = document.createElement('canvas')

    document.body.appendChild(canvas)

    const engine = new Engine(canvas)
    const scene = new Scene(engine)
    const cube = MeshBuilder.CreateBox('box', { size: 1 })
    const light = new HemisphericLight('light', Vector3.Up(), scene)
    const camera = new ArcRotateCamera(
      'camera',
      0,
      0,
      10,
      Vector3.Zero(),
      scene,
    )

    camera.attachControl()

    engine.runRenderLoop(() => {
      scene.render()
    })
  }
}
