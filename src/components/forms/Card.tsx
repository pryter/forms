import {TitleComponents} from "./InnerComponents/TitleComponents";
import {BodyComponents} from "./InnerComponents/BodyComponents";
import {InnerComponent} from "./InnerComponents/InnerComponent";
import {Component} from "./Component";
import {useContext} from "react";
import {MainContext} from "../../pages";
import {TextBox} from "./InnerComponents/TextBox";
import {PlusIcon} from "@heroicons/react/solid";

export class Card extends Component {

  public titleComponents: TitleComponents[]
  public bodyComponents: BodyComponents[]

  constructor(titleComponents?: TitleComponents[], bodyComponents?: BodyComponents[], id? :string) {
    super(id)

    this.titleComponents = titleComponents || []
    this.bodyComponents = bodyComponents || []
  }

  public getElementById(id: string) {
    return [...this.titleComponents, ...this.bodyComponents].find((i) => (i.id === id))
  }

  public appendBody(bodyComponent: BodyComponents) {
    this.bodyComponents.push(bodyComponent)
  }

  public appendTitle(titleComponent: TitleComponents) {
    this.titleComponents.push(titleComponent)
  }

  public deleteBody(id: string) {
    this.bodyComponents = this.bodyComponents.filter(item => (
      item.id !== id
    ))
  }

  public setBody(bodyComponents: BodyComponents[]) {
    this.bodyComponents = bodyComponents
  }

  public setTitle(titleComponents: TitleComponents[]) {
    this.titleComponents = titleComponents
  }

  public build(setMenu, setTargetCard, setEditing) {

    return(
      <div key={this.id} className="bg-white shadow px-4 py-5 rounded-md sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {this.titleComponents.length > 0 ? this.titleComponents.map((item => (item.toElement(this.id, (target) => {
              setMenu(true)
              setEditing(target)
            })))) :
            <button
              type="button"
              onClick={() => {
                setTargetCard(this)
                setMenu(true)
                const title = new TextBox()
                this.setTitle([title])
                setEditing(title)
              }}
              className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">Create a heading component</span>
            </button>
          }


          <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
            {this.bodyComponents.length > 0 ? <> {
              this.bodyComponents.map(item => (item.toElement(this.id, (target) => {
                setMenu(true)
                setEditing(target)
              })))
            }
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setTargetCard(this)
                      setMenu(true)
                    }}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Insert new component
                  </button>
                </div>
              </> :
              <button
                type="button"
                onClick={() => {
                  setTargetCard(this)
                  setMenu(true)
                }}
                className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                  />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-900">Create a body component</span>
              </button>}
          </div>
        </div>
      </div>
    )

  }

}
