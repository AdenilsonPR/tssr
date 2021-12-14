import IEntity from "./IEntity";

export default class Context implements IEntity {
  private errorMessages: string[];
  private successMessages: string[];
  private isPropagation: boolean;
  private isError: boolean;

  constructor() {
    this.errorMessages = [];
    this.successMessages = [];
    this.isPropagation = false;
    this.isError = false;
  }

  public getErrorMessages() {
    return this.errorMessages;
  }

  public addErrorMessages(errorMessage: string) {
    this.errorMessages.push(errorMessage);

    if (this.errorMessages.length > 0) {
      this.isError = true;
    }
  }

  public getSuccessMessages() {
    return this.successMessages;
  }

  public addSuccessMessages(successMessage: string) {
    this.successMessages.push(successMessage);
  }

  public getStopPropagation() {
    return this.isPropagation;
  }

  public setStopPropagation(stopPropagation: boolean) {
    this.isPropagation = stopPropagation;
  }

  public getError() {
    return this.isError;
  }
}
