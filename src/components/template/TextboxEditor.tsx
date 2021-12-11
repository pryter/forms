import {Fragment, useContext, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {PaperClipIcon, UserCircleIcon} from '@heroicons/react/solid'
import {MainContext} from "../../pages/u/[id]";
import {TitleComponents} from "../forms/InnerComponents/TitleComponents";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";

const assignees = [
  {name: 'Unassigned', value: null},
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More items...
]

const styles = [
  {
    name: 'Defaults', value: null, icon: <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="font"
                                              className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1" role="img" xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 448 512">
      <path fill="currentColor"
            d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z"></path>
    </svg>
  },
  {
    name: 'Bold',
    value: 'bold',
    icon: <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bold" role="img"
               xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1" viewBox="0 0 384 512">
      <path fill="currentColor"
            d="M333.49 238a122 122 0 0 0 27-65.21C367.87 96.49 308 32 233.42 32H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h31.87v288H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 112h87.76a48 48 0 0 1 0 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 0 1 0 112z"></path>
    </svg>
  }, {
    name: "Underline",
    value: "underline",
    icon: <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="underline" className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1"
               role="img"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor"
            d="M32 64h32v160c0 88.22 71.78 160 160 160s160-71.78 160-160V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H272a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32v160a80 80 0 0 1-160 0V64h32a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H32a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm400 384H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
    </svg>
  }, {
    name: "Italic",
    value: "italic",
    icon: <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="italic" className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1"
               role="img"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path fill="currentColor"
            d="M320 48v32a16 16 0 0 1-16 16h-62.76l-80 320H208a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h62.76l80-320H112a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"></path>
    </svg>
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function TextboxEditor() {

  const {editing, dynamicCallback} = useContext(MainContext)

  const [assigned, setAssigned] = useState(assignees[0])
  const [editingPart, setEditingPart] = useState(null)
  const [style, setStyle] = useState(styles[0])
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {editingPart && <div onClick={() => {
        setEditingPart(null)
      }} className="fixed top-0 left-0 w-full min-h-screen"/>}
      <div
        className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 relative z-10">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
          placeholder="Title"
          value={(editing as TitleComponents).title.content}
          onFocus={() => {
            setEditingPart((editing as TitleComponents).title)
          }}
          onChange={(e) => {
            dynamicCallback(() => {
              (editing as TitleComponents).title.setContent(e.target.value)
            }, e.target.value)
          }}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Write a description..."
          value={(editing as TitleComponents).description.content}
          onFocus={() => {
            setEditingPart((editing as TitleComponents).description)
          }}
          onChange={(e) => {
            dynamicCallback(() => {
              (editing as TitleComponents).description.setContent(e.target.value)
            }, e.target.value)
          }}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9"/>
          </div>
          <div className="h-px"/>
          <div className="py-2">
            <div className="py-px">
              <div className="h-9"/>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-px z-10">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <Transition
          show={editingPart !== null}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3">
            <div className="flex-shrink-0">
              <div className="relative">
                <button onClick={() => {
                  setOpen(true)
                }}
                        className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                  {assigned.value === null ? (
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="text-height"
                         className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path fill="currentColor"
                            d="M304 32H16A16 16 0 0 0 0 48v96a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-32h56v304H80a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-40V112h56v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zm256 336h-48V144h48c14.31 0 21.33-17.31 11.31-27.31l-80-80a16 16 0 0 0-22.62 0l-80 80C379.36 126 384.36 144 400 144h48v224h-48c-14.31 0-21.32 17.31-11.31 27.31l80 80a16 16 0 0 0 22.62 0l80-80C580.64 386 575.64 368 560 368z"></path>
                    </svg>
                  ) : (
                    <img src={assigned.avatar} alt="" className="flex-shrink-0 h-5 w-5 rounded-full"/>
                  )}

                  <span
                    className={classNames(
                      assigned.value === null ? '' : 'text-gray-900',
                      'hidden truncate sm:ml-2 sm:block'
                    )}
                  >
                      {assigned.value === null ? 'Font Size' : assigned.name}
                    </span>
                </button>
                {open && <div onClick={() => {
                  setOpen(false)
                }} className="fixed w-full top-0 left-0 min-h-screen"/>}
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <div className="w-full flex justify-center space-x-2">
                      <button onClick={() => {dynamicCallback(() => {editingPart.setSize(editingPart.size - 1)}, editingPart.size)}} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-gray-300 rounded-md">
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
                          value={editingPart?.size}
                          onChange={(e) => {
                            dynamicCallback(() => {
                              editingPart?.setSize(parseInt(e.target.value))
                            }, e.target.value)
                          }}
                        />
                      </div>
                      <button onClick={() => {dynamicCallback(() => {editingPart.setSize(editingPart.size + 1)}, editingPart.size)}} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-gray-300 rounded-md">
                        <ChevronRightIcon className="w-5 h-5"/>
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>


            <Listbox as="div" value={style} onChange={setStyle} className="flex-shrink-0">
              {({open}) => (
                <>
                  <Listbox.Label className="sr-only">Styles</Listbox.Label>
                  <div className="relative">
                    <Listbox.Button
                      className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                      {style.value === null ? (
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bold" role="img"
                             xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1" viewBox="0 0 384 512">
                          <path fill="currentColor"
                                d="M333.49 238a122 122 0 0 0 27-65.21C367.87 96.49 308 32 233.42 32H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h31.87v288H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 112h87.76a48 48 0 0 1 0 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 0 1 0 112z"></path>
                        </svg>
                      ) : (
                        style.icon
                      )}

                      <span
                        className={classNames(
                          style.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block'
                        )}
                      >
                      {style.value === null ? 'Styles' : style.name}
                    </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {styles.map((assignee) => (
                          <Listbox.Option
                            key={assignee.value}
                            className={({active}) =>
                              classNames(
                                active ? 'bg-gray-100' : 'bg-white',
                                'cursor-default select-none relative py-2 px-3'
                              )
                            }
                            value={assignee}
                          >
                            <div className="flex items-center">
                              {assignee.icon ? (
                                assignee.icon
                              ) : (
                                <UserCircleIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true"/>
                              )}

                              <span className="ml-3 block font-medium truncate">{assignee.name}</span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>

          </div>
        </Transition>
        <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
            >
              <PaperClipIcon className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500" aria-hidden="true"/>
              <span className="text-sm text-gray-500 group-hover:text-gray-600 italic">Attach a file</span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
