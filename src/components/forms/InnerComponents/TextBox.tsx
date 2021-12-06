import {InnerComponent} from "./InnerComponent";
import {TextComponent} from "../Text";

export class TextBox extends InnerComponent {

  constructor(title?: string, description?: string) {
    super();
    this.title = new TextComponent(title || "Title", 18)
    this.description = new TextComponent(description || "This information will be displayed publicly so be careful what you share.", 14)
  }

  public setTitle(title: TextComponent) {
    this.title = title
    return this
  }

  public setDescription(description: TextComponent) {
    this.description = description
    return this
  }

  protected build(id: string, title: TextComponent): JSX.Element {
    return <div className="md:col-span-1">
      <h3 className="font-medium leading-6 text-gray-900">{title.build()}</h3>
      {this.description ?
      <p className="mt-1 text-gray-500 whitespace-pre-wrap break-all">
        {this.description.build()}
      </p> : <></>
      }
    </div>
  }
}
