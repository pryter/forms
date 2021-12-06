import {CommonComponent} from "./CommonComponent";

export class TextComponent extends CommonComponent {

  public content: string
  public style: string
  public size: number
  public colour: string

  constructor(content: string, size?: number) {
    super()
    this.content = content
    this.size = size || 16
  }

  public setContent(content: string) {
    this.content = content
  }

  public setSize(size: number) {
    this.size = size >= 1 ? size : 1
  }

  public build() {
    return <span style={{fontSize: `${this.size}px`}}>{this.content}</span>
  }

}
