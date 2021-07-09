import Context from "../domain/Context";
import IEntity from "../domain/IEntity";

export default interface IStrategy<E extends IEntity> {
  add(strategy: IStrategy<E>): IStrategy<E>;

  execute(context: Context<E>): Context<E>;
}
