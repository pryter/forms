import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/solid";
import {useContext} from "react";
import {MainContext} from "../../pages/u/[id]";
import {TextInput} from "../forms/InnerComponents/TextInput";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";
import {Dropdown} from "./Dropdown";

export const TextInputEditor = () => {

  const {editing, dynamicCallback} = useContext(MainContext)

  const styles = ["default", "with-add-on", "inset-label", "overlap-label", "pill-shape"]
  const types = [
    {title: "Text", id:"text"},
    {title: "Number", id:"number"},
    {title: "Email", id: "email"}
  ]

  const styleName = {
    default: "Default",
    "with-add-on": "With Leading",
    "inset-label": "Inset Label",
    "overlap-label": "Overlapping Label",
    "pill-shape": "Pill Shaped"
  }

  const next = (now: string) => {
    const index = styles.indexOf(now)

    if (index >= styles.length - 1) {
      return 0
    }

    return index + 1
  }

  const prev = (now: string) => {
    const index = styles.indexOf(now)

    if (index <= 0) {
      return styles.length - 1
    }

    return index - 1
  }

  return (
    <div className="text-gray-800">
      <div>
        <h1 className="font-medium mb-3">Element style</h1>
      </div>
      <div className="pt-2 pb-4 border border-gray-300 rounded-md">
        <div className="flex justify-between items-center border-b px-4 pb-2">
          <ArrowLeftIcon onClick={() => {
            dynamicCallback(() => {
              // @ts-ignore
              (editing as TextInput).setStyle(styles[prev((editing as TextInput).style)])
            })
          }} className="w-5 h-5 text-gray-600 cursor-pointer"/>
          <span className="text-gray-800">{styleName[(editing as TextInput).style]}</span>
          <ArrowRightIcon onClick={() => {
            dynamicCallback(() => {
              // @ts-ignore
              (editing as TextInput).setStyle(styles[next((editing as TextInput).style)])
            })
          }} className="w-5 h-5 text-gray-600 cursor-pointer"/>
        </div>
        <div className="flex flex-col justify-center px-4 mt-2 h-16">
          {(editing as TextInput).toElement()}
        </div>
      </div>
      <div className="mt-6">
        <h1 className="font-medium mb-3">Element data</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={(editing as TextInput).title.content}
                  onChange={(e) => {
                    dynamicCallback(() => {
                      (editing as TextInput).title.content = e.target.value
                    }, e.target.value)
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Font size
              </label>
              <div className="mt-1 w-full flex justify-center space-x-2">
                <button onClick={() => {dynamicCallback(() => {(editing as TextInput).title.setSize((editing as TextInput).title.size - 1)}, (editing as TextInput).title.size)}} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-gray-300 rounded-md">
                  <ChevronLeftIcon className="w-5 h-5"/>
                </button>
                <div>
                  <label htmlFor="email" className="sr-only">
                    size
                  </label>
                  <input
                    type="number"
                    name="size"
                    id="size"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-16 sm:text-sm border-gray-300 rounded-md"
                    value={(editing as TextInput).title.size}
                    onChange={(e) => {
                      dynamicCallback(() => {
                        (editing as TextInput).title.setSize(parseInt(e.target.value))
                      }, e.target.value)
                    }}
                  />
                </div>
                <button onClick={() => {dynamicCallback(() => {(editing as TextInput).title.setSize((editing as TextInput).title.size + 1)}, (editing as TextInput).title.size)}} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-gray-300 rounded-md">
                  <ChevronRightIcon className="w-5 h-5"/>
                </button>
              </div>
            </div>

          </div>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <Dropdown def={types.filter((e) => (e.id === (editing as TextInput).type))[0]} content={types} updater={(selected) => {
                dynamicCallback(() => {
                  (editing as TextInput).type = selected.id
                })
              }
              }/>
            </div>
            {(editing as TextInput).style === "with-add-on" && <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Leading Text
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={(editing as TextInput).addon.content}
                  onChange={(e) => {
                    dynamicCallback(() => {
                      (editing as TextInput).addon.content = e.target.value
                    }, e.target.value)
                  }}
                />
              </div>
            </div>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Placeholder
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={(editing as TextInput).placeholder}
                onChange={(e) => {
                  dynamicCallback(() => {
                    (editing as TextInput).placeholder = e.target.value
                  }, e.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
