import Context from "../domain/Context";
import IEntity from "../domain/IEntity";
import Result from "../domain/Result";
import IStrategy from "./IStrategy";

export default class BuilderRunner<E extends IEntity> {
  private strategies: IStrategy<E>[];

  constructor() {
    this.strategies = [];
  }

  add(strategy: IStrategy<E>) {
    this.strategies.push(strategy);
    return this;
  }

  execute(entity: E) {
    const context: Context = new Context();

    for (let index = 0; index < this.strategies.length; index++) {
      if (context.getStopPropagation()) {
        break;
      }

      this.strategies[index].execute(entity, context);
    }

    if (!context.getError()) {
      return new Result(
        entity,
        context.getSuccessMessages(),
        context.getError()
      );
    }

    return new Result(entity, context.getErrorMessages(), context.getError());
  }
}
