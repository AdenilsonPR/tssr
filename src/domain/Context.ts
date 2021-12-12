import IEntity from "./IEntity";

export default class Context<E> implements IEntity {
  private entity: E;
  private errorMessages: string[];
  private successMessages: string[];
  private stopPropagation: boolean;

  constructor(entity: E) {
    this.entity = entity;
    this.errorMessages = [];
    this.successMessages = [];
    this.stopPropagation = false;
  }

  public getEntity() {
    return this.entity;
  }

  public setEntity(entity: E) {
    this.entity = entity;
  }

  public getErrorMessages() {
    return this.errorMessages;
  }

  public setErrorMessages(errorMessage: string) {
    this.errorMessages.push(errorMessage);
  }

  public getSuccessMessages() {
    return this.successMessages;
  }

  public setSuccessMessages(successMessage: string) {
    this.successMessages.push(successMessage);
  }

  public getStopPropagation() {
    return this.stopPropagation;
  }

  public setStopPropagation(stopPropagation: boolean) {
    this.stopPropagation = stopPropagation;
  }
}
