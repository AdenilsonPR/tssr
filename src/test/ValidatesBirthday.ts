import { Context, IStrategy } from "../tssr";
import Person from "./Person";

export default class ValidatesBirthday implements IStrategy<Person> {
  execute(entity: Person, context: Context): void {
    const age = entity.getBirthday().getFullYear();

    if (age <= 1900) {
      context.addErrorMessages("Invalid birthday date!");
    }
  }
}
