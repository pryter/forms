import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useContext} from "react";
import {XIcon} from "@heroicons/react/outline";
import {MainContext} from "../../pages";
import {Dropdown} from "./Dropdown";
import {TextboxEditor} from "./TextboxEditor";
import {TextBox} from "../forms/InnerComponents/TextBox";
import {TextInput} from "../forms/InnerComponents/TextInput";
import {Component} from "../forms/Component";
import {TextInputEditor} from "./TextInputEditor";

export const MenuBar = () => {

  const {menu, setMenu, editing, setEditing, targetCard, dynamicCallback} = useContext(MainContext)

  const getEditor = (instance: Component) => {
    switch (instance.constructor.name) {
      case "TextBox":
        return <TextboxEditor/>
      case "TextInput":
        return <TextInputEditor/>
      default:
        return <div>
          <span className="text-gray-600">We couldn&lsquo;t find the right tool for this component :/</span>
        </div>
    }
  }

  return (
    <Transition.Root show={menu} as={Fragment} afterLeave={() => {
      if (!menu) {
        setEditing(null)
      }
    }}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setMenu}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0"/>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">{editing ? "Edit an Element" : "Create an Element"}</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setMenu(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6 space-y-4">
                    {
                      editing ? <>
                        <div>
                          {getEditor(editing)}
                        </div>
                      </> : <div className="space-y-8">
                        <div className="space-y-4 border-b border-gray-300 pb-8">
                          <h1 className="text-gray-800 font-medium">Text Boxes</h1>
                          <div className="flex flex-wrap space-x-12">
                            <div className="flex flex-col items-center">
                              <div onClick={() => {
                                dynamicCallback(() => {
                                  const textBox = new TextBox()
                                  targetCard.appendBody(textBox)
                                  setEditing(textBox)
                                })
                              }} className="w-32 h-32 border border-gray-300 rounded-md shadow-md cursor-pointer">
                                <div className="px-2 mt-8">
                                  <h1 className="text-[14px] text-gray-800 font-medium mb-[2px]">Title</h1>
                                  <div className="h-[6px] w-11/12 bg-gray-600 mb-1 ml-[3px]"/>
                                  <div className="h-[6px] w-9/12 bg-gray-600 mb-1 ml-[3px]"/>
                                  <div className="h-[6px] w-11/12 bg-gray-600 mb-1 ml-[3px]"/>
                                </div>
                              </div>
                              <h1 className="text-gray-700 mt-1">Textbox</h1>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4 border-b border-gray-300 pb-8">
                          <h1 className="text-gray-800 font-medium">Inputs group</h1>
                          <div className="flex flex-wrap space-x-12">
                            <div className="flex flex-col items-center">
                              <div onClick={() => {
                                dynamicCallback(() => {
                                  const input = new TextInput()
                                  targetCard.appendBody(input)
                                  setEditing(input)
                                })
                              }} className="w-32 h-32 border border-gray-300 rounded-md shadow-md">
                                <div className="mt-4 ml-3">
                                  <h1 className="text-xs text-gray-600 font-medium">Username</h1>
                                  <div className="w-24 h-5 rounded-md border border-gray-400">
                                  </div>
                                </div>
                                <div className="mt-2 ml-3">
                                  <h1 className="text-xs text-gray-600 font-medium">Number</h1>
                                  <div className="w-20 h-5 rounded-md border border-gray-400">
                                  </div>
                                </div>
                              </div>
                              <h1 className="text-gray-700 mt-1">Inputs</h1>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-32 h-32 border border-gray-300 rounded-md shadow-md">
                                <div className="mt-4 ml-3">
                                  <h1 className="text-xs text-gray-600 font-medium mb-1">Description</h1>
                                  <div className="relative w-24 h-14 rounded-md border border-gray-400">
                                    <span className="absolute text-[6px] text-gray-400 top-1 px-2 leading-[6px]">&nbsp;&nbsp;&nbsp;Write some description here......</span>
                                  </div>
                                </div>
                              </div>
                              <h1 className="text-gray-700 mt-1">Textarea</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
