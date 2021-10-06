import Entity from './Entity'

/** A simple data container to be processed by Systems */
export default class Component {
  public constructor(public entity: Entity) {}
}
