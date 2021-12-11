import {uid} from "uid";
import {Component} from "../Component";
import {TextComponent} from "../Text";
import {motion} from "framer-motion"

export class InnerComponent extends Component {

  public title: TextComponent
  public description: undefined | TextComponent

  constructor(id?: string) {
    super(id)
  }

  protected build(id: string, title: TextComponent) {

    return <></>

  }

  public toElement(parentId?: string, clickAction?: (target: Component) => void, editing? :boolean) {
    const id = `${this.id}${parentId && `-${parentId}`}`
    const Element = () => (this.build(id, this.title))
    return <motion.div initial={editing && {y: -10}} animate={{y: 0}} layout={"position"} key={id} className={editing ? "cursor-pointer" : ""} onClick={() => {clickAction &&  clickAction(this)}}>
      <Element/>
    </motion.div>
  }

}
