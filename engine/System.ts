import Engine from './Engine'

/** A single logical unit of work which processes data contained in Components */
export default class System {
  /** For engine use only */
  public constructor(protected engine: Engine) {}

  /** Called once when the System initializes */
  public start() {}

  /** Called on every engine tick */
  public update() {}
}
