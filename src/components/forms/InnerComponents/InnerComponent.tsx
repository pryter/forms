import {uid} from "uid";
import {Component} from "../Component";
import {TextComponent} from "../Text";

export class InnerComponent extends Component {

  public title: TextComponent
  public description: undefined | TextComponent

  constructor(id?: string) {
    super(id)
  }

  protected build(id: string, title: TextComponent) {

    return <></>

  }

  public toElement(parentId?: string, clickAction?: (target: Component) => void) {
    const id = `${this.id}${parentId && `-${parentId}`}`
    const Element = () => (this.build(id, this.title))
    return <div key={id} className="cursor-pointer" onClick={() => {clickAction &&  clickAction(this)}}>
      <Element/>
    </div>
  }

}
