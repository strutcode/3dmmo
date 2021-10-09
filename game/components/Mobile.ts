import Component from '../../engine/Component'
import Vector from '../util/Vector'

const ninetyDegrees = Math.PI / 2
const threeSixtyDegrees = Math.PI * 2
const epsilon = 0.0001

export default class Mobile extends Component {
  public position = new Vector()
  public velocity = new Vector()
  public direction = new Vector()
  public speed = 4
  private orientation = {
    yaw: 0,
    pitch: 0,
  }

  public get yaw() {
    return this.orientation.yaw
  }
  public set yaw(value: number) {
    this.orientation.yaw = value % threeSixtyDegrees
    this.updateDirection()
  }

  public get pitch() {
    return this.orientation.pitch
  }
  public set pitch(value: number) {
    this.orientation.pitch = Math.max(
      epsilon - ninetyDegrees,
      Math.min(value, ninetyDegrees - epsilon),
    )
    this.updateDirection()
  }

  public moveForward(amount: number) {
    this.velocity.x += this.direction.x * amount * this.speed
    this.velocity.y += this.direction.y * amount * this.speed
    this.velocity.z += this.direction.z * amount * this.speed
  }

  public moveRight(amount: number) {
    this.velocity.x += Math.sin(this.yaw + ninetyDegrees) * amount * this.speed
    this.velocity.z += Math.cos(this.yaw + ninetyDegrees) * amount * this.speed
  }

  public lookRight(amount: number) {
    this.yaw += amount * 0.001
  }

  public lookUp(amount: number) {
    this.pitch += amount * 0.001
  }

  private updateDirection() {
    const { pitch, yaw } = this

    this.direction.x = Math.sin(yaw) * Math.cos(pitch)
    this.direction.y = -Math.sin(pitch)
    this.direction.z = Math.cos(yaw) * Math.cos(pitch)
  }
}
