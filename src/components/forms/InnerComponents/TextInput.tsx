import {InnerComponent} from "./InnerComponent";
import {TextComponent} from "../Text";
import {inspect} from "util";

type styles = "default" | "with-add-on" | "inset-label" | "overlap-label" | "pill-shape"

export class TextInput extends InnerComponent {

  public placeholder: string | undefined
  public style: styles
  public type: "email" | "text" | "number" = "text"
  public addon: TextComponent = new TextComponent("https://")

  constructor(title?: string, description?: string, placeholder?: string, style?: styles) {
    super();
    this.title = new TextComponent(title || "Input Title", 14)
    this.placeholder = placeholder || "Placeholder here.."
    this.style = style || "default"
  }

  public setStyle(style: styles) {
    this.style = style
  }

  private buildFromStyle(id: string,style: styles) {
    switch (style) {
      case "default":
        return <div>
          <label htmlFor={id} className="block font-medium text-gray-700">
            {this.title.build()}
          </label>
          <div className="mt-1">
            <input
              type={this.type}
              name={id}
              id={id}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder={this.placeholder}
            />
          </div>
        </div>
      case "with-add-on":
        return (
          <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {this.title.build()}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          {this.addon.build()}
        </span>
              <input
                type={this.type}
                name={id}
                id={id}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder={this.placeholder}
              />
            </div>
          </div>
        )
      case "inset-label":
        return (
          <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label htmlFor={id} className="block text-xs font-medium text-gray-900">
              {this.title.build()}
            </label>
            <input
              type={this.type}
              name={id}
              id={id}
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder={this.placeholder}
            />
          </div>
        )
      case "overlap-label":
        return (
          <div className="mt-1 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label
              htmlFor={id}
              className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
            >
              {this.title.build()}
            </label>
            <input
              type={this.type}
              name={id}
              id={id}
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder={this.placeholder}
            />
          </div>
        )
      case "pill-shape":
        return (<div>
          <label htmlFor={id} className="ml-px pl-4 block text-sm font-medium text-gray-700">
            {this.title.build()}
          </label>
          <div className="mt-1">
            <input
              type={this.type}
              name={id}
              id={id}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
              placeholder={this.placeholder}
            />
          </div>
        </div>)

    }
  }

  protected build(id: string, title: TextComponent): JSX.Element {
    return this.buildFromStyle(id, this.style)
  }

}
