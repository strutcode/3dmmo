import {
  AmmoJSPlugin,
  ArcRotateCamera,
  Camera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  SceneLoader,
  Vector3,
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
import Ammo from 'ammojs-typed'

export default class BabylonInterface {
  private static engine?: Engine
  private static scene?: Scene
  private static camera?: Camera

  public static async init() {
    if (this.engine) return

    const canvas = document.createElement('canvas')

    document.body.appendChild(canvas)

    const engine = new Engine(canvas)
    const scene = new Scene(engine)
    const cube = MeshBuilder.CreateBox('box', { size: 1 })
    const light = new HemisphericLight('light', Vector3.Up(), scene)
    const camera = new ArcRotateCamera(
      'camera',
      0,
      Math.PI / 4,
      10,
      Vector3.Zero(),
      scene,
    )

    camera.attachControl()

    engine.runRenderLoop(() => {
      scene.render()
    })

    this.engine = engine
    this.scene = scene
    this.camera = camera

    await this.loadScene()
    await this.initPhysics()
  }

  private static async loadScene() {
    if (!this.scene) return

    await SceneLoader.AppendAsync('/', 'dip.glb', this.scene)
  }

  private static async initPhysics() {
    if (!this.scene) return

    const ammo = await Ammo()

    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new AmmoJSPlugin(true, ammo),
    )

    const dip = this.scene.meshes.find((m) => m.name === '__root__')
    new PhysicsImpostor(dip, PhysicsImpostor.MeshImpostor, { mass: 0 })

    const cube = this.scene.meshes.find((m) => m.name === 'box')
    cube.position.y = 5
    new PhysicsImpostor(cube, PhysicsImpostor.BoxImpostor, { mass: 1 })
  }
}
