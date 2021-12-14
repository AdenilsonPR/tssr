import Context from "../domain/Context";
import IEntity from "../domain/IEntity";

export default interface IStrategy<E extends IEntity> {
  execute(entity: E, context: Context): void;
}
