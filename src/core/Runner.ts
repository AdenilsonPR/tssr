import Context from "../domain/Context";
import IEntity from "../domain/IEntity";
import IStrategy from "./IStrategy";

export default abstract class Runner<E extends IEntity>
  implements IStrategy<E>
{
  add(strategy: IStrategy<E>): IStrategy<E> {
    return new AddStrategy<E>(this, strategy);
  }

  public abstract execute(context: Context<E>): Context<E>;
}

class AddStrategy<E extends IEntity> extends Runner<E> {
  private left: IStrategy<E>;
  private right: IStrategy<E>;

  constructor(left: IStrategy<E>, right: IStrategy<E>) {
    super();
    this.left = left;
    this.right = right;
  }

  execute(context: Context<E>): Context<E> {
    if (!this.left.execute(context).getStopPropagation()) {
      this.right.execute(context);
    }

    return context;
  }
}
