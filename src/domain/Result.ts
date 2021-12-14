import IEntity from "./IEntity";

export default class Result {
  private entity: IEntity;
  private messages: string[];
  private error: boolean;

  constructor(entity: IEntity, messages: string[], error: boolean) {
    this.entity = entity;
    this.messages = messages;
    this.error = error;
  }

  public getEntity() {
    return this.entity;
  }

  public getMessages() {
    return this.messages;
  }

  public getError() {
    return this.error;
  }
}
