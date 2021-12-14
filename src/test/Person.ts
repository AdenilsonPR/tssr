import { IEntity } from "../tssr";

export default class Person implements IEntity {
  private name!: string;
  private birthday!: Date;

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getBirthday() {
    return this.birthday;
  }

  public setBirthday(birthday: Date) {
    this.birthday = birthday;
  }
}
