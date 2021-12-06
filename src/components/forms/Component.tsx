import {uid} from "uid";
import {CommonComponent} from "./CommonComponent";

export class Component extends CommonComponent {

  public readonly id: string

  constructor(id?: string) {
    super()
    if (id) {
      this.id = id
      return
    }

    this.id = Component.generateId()
  }

  protected static generateId() {
    return uid(12)
  }

}
