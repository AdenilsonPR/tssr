import BuilderRunner from "../core/BuilderRunner";
import Person from "./Person";
import ValidatesBirthday from "./ValidatesBirthday";
import ValidatesName from "./ValidatesName";

let person = new Person();
person.setName("");
person.setBirthday(new Date("01/01/1000"));

const context = new BuilderRunner()
  .add(new ValidatesName())
  .add(new ValidatesBirthday())
  .execute(person);

console.log(context);
