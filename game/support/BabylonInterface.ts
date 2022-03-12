import {
  AmmoJSPlugin,
  ArcRotateCamera,
  Camera,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  PhysicsImpostor,
  Quaternion,
  Scene,
  SceneLoader,
  TargetCamera,
  Vector3,
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
import Ammo from '../../ammo/ammo.js'
import Vector from '../util/Vector'

enum PhysicsFilter {
  Ground = 0b10,
  Object = 0b100,
  Player = 0b100000,
}

export default class BabylonInterface {
  private static engine?: Engine
  private static scene?: Scene
  private static ammo?: typeof Ammo
  private static playerController: Ammo.btKinematicCharacterController
  private static playerTransform: Ammo.btTransform

  public static async init() {
    if (this.engine) return

    const canvas = document.createElement('canvas')

    document.body.appendChild(canvas)

    const engine = new Engine(canvas)
    const scene = new Scene(engine)
    const light = new HemisphericLight('light', Vector3.Up(), scene)
    const camera = new FreeCamera('camera', Vector3.Zero(), scene)

    camera.minZ = 0.1

    engine.runRenderLoop(() => {
      scene.render()
    })

    this.engine = engine
    this.scene = scene

    await this.loadScene()
    await this.initPhysics()
  }

  private static async loadScene() {
    if (!this.scene) return

    await SceneLoader.AppendAsync('/', 'city.glb', this.scene)
  }

  private static async initPhysics() {
    if (!this.scene) return

    const ammo = await Ammo()
    this.ammo = ammo

    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new AmmoJSPlugin(true, ammo),
    )

    this.scene.meshes.forEach((mesh) => {
      mesh.setParent(null)

      const type = mesh.metadata?.gltf?.extras?.Collider

      if (type === 'Mesh') {
        new PhysicsImpostor(mesh, PhysicsImpostor.MeshImpostor, { mass: 0 })
      } else if (type === 'Box') {
        new PhysicsImpostor(mesh, PhysicsImpostor.BoxImpostor, { mass: 0 })
      } else if (type === 'Plane') {
        new PhysicsImpostor(mesh, PhysicsImpostor.PlaneImpostor, { mass: 0 })
      }
    })

    this.createPlayer()
  }

  private static createPlayer() {
    const Ammo = this.ammo
    if (!Ammo) return

    const world: Ammo.btDiscreteDynamicsWorld = this.scene
      ?.getPhysicsEngine()
      ?.getPhysicsPlugin().world

    const shape = new Ammo.btCapsuleShape(0.6 / 2, 1.7 / 2)

    const transform = new Ammo.btTransform()
    transform.setIdentity()
    transform.setOrigin(new Ammo.btVector3(0, 10, 0))

    const ghost = new Ammo.btPairCachingGhostObject()
    ghost.setWorldTransform(transform)
    ghost.setCollisionShape(shape)
    ghost.setCollisionFlags(16)

    world
      .getPairCache()
      .setInternalGhostPairCallback(new Ammo.btGhostPairCallback())

    this.playerTransform = ghost.getWorldTransform()
    this.playerController = new Ammo.btKinematicCharacterController(
      ghost,
      shape,
      1.1,
    )
    this.playerController.setGravity(0)
    this.playerController.setJumpSpeed(30)

    world.addCollisionObject(
      ghost,
      PhysicsFilter.Player,
      PhysicsFilter.Ground | PhysicsFilter.Object,
    )
    world.addAction(this.playerController)
  }

  public static updatePlayer(velocity: Vector, pitch: number, yaw: number) {
    const Ammo = this.ammo
    if (!Ammo) return

    this.playerController.setWalkDirection(
      new Ammo.btVector3(velocity.x, velocity.y, velocity.z),
    )

    if (!this.scene) return

    const pos = this.playerTransform.getOrigin()

    const camera = this.scene.activeCamera as TargetCamera

    camera.position.x = pos.x()
    camera.position.y = pos.y() + 0.8
    camera.position.z = pos.z()

    const result = new Vector3()
    Vector3.Forward().rotateByQuaternionToRef(
      Quaternion.RotationYawPitchRoll(yaw, pitch, 0),
      result,
    )
    camera.setTarget(camera.position.add(result))
  }
}
