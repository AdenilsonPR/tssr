import { Context, IStrategy } from "../tssr";
import Person from "./Person";

export default class ValidatesName implements IStrategy<Person> {
  execute(entity: Person, context: Context): void {
    const name = entity.getName();

    if (!name) {
      context.addErrorMessages("The name field is required!");
    }
  }
}
