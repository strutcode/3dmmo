import Component from './Component'

/** A simple container for Components to relate them to each other */
export default class Entity {
  public id = 0
  public components = new Map<typeof Component, Component[]>()

  /** For engine use only */
  public constructor() {}

  /** Produces a list of components on this entity from a prototype. May be empty array. */
  public getComponents<T extends typeof Component>(type: T): InstanceType<T>[] {
    return (this.components.get(type) ?? []) as InstanceType<T>[]
  }

  /** Returns the first component of a type on this entity, or undefined */
  public getComponent<T extends typeof Component>(
    type: T,
  ): InstanceType<T> | undefined {
    return (this.components.get(type) ?? [])[0] as InstanceType<T> | undefined
  }

  /** Returns the first component of a type on this entity or throws an error */
  public requireComponent<T extends typeof Component>(
    type: T,
  ): InstanceType<T> {
    const list = this.components.get(type)

    if (!list || !list.length) {
      throw new Error(
        `Missing required component ${type.name} on entity #${this.id}`,
      )
    }

    return list[0] as InstanceType<T>
  }

  /** Runs the callback with the specified component as an argument if it exists */
  public with<T extends typeof Component>(
    type: T,
    callback: (component: InstanceType<T>) => void,
  ) {
    const component = this.getComponent(type)

    if (component) {
      callback(component)
    }
  }
}
