import {CheckIcon, PlusIcon} from '@heroicons/react/solid'
import {createContext, Dispatch, Fragment, SetStateAction, useEffect, useState} from "react";
import {Card} from "../components/forms/Card";
import {MenuBar} from "../components/template/MenuBar";
import {DynamicCallback, useUpdateState} from "../hooks/useUpdateState";
import {Component} from "../components/forms/Component";
import {TitleComponents} from "../components/forms/InnerComponents/TitleComponents";
import {BodyComponents} from "../components/forms/InnerComponents/BodyComponents";
import {deSerialise} from "../utils/deSerialise";

interface MainContextType {
  menu: boolean,
  setMenu: Dispatch<SetStateAction<boolean>>,
  editing: Component | TitleComponents | BodyComponents,
  setEditing: Dispatch<SetStateAction<Component>>
  dynamicCallback: DynamicCallback,
  targetCard: Card,
  setTargetCard: Dispatch<SetStateAction<Card>>
}

export const MainContext = createContext<MainContextType>(null)

export default function Home() {

  const [cards, setCards] = useState<Array<Card> | []>([])
  const [menu, setMenu] = useState(false)
  const [targetCard, setTargetCard] = useState<Card | null>(null)
  const {dynamicCallback} = useUpdateState()
  const [editing, setEditing] = useState(null)

  const steps = [
    { id: '01', name: 'Job details', href: '#', status: 'complete' },
    { id: '02', name: 'Application form', href: '#', status: 'current' },
    { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
  ]

  const save = () => {
    const data = cards.map((i) => (i.serialise()))
    localStorage.setItem("save", JSON.stringify(data))
  }

  const load = () => {
    const save = localStorage.getItem("save")
    if (save) {
      const obj = JSON.parse(save)
      setCards(obj.map((i) => (deSerialise(i))))
    }
  }

  return (
    <MainContext.Provider value={{menu, setMenu, editing, setEditing, dynamicCallback, targetCard, setTargetCard}}>
      <MenuBar/>
      <div className="px-6 py-6 min-h-screen bg-gray-100">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/*<nav aria-label="Progress">*/}
          {/*  <ol role="list" className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">*/}
          {/*    {steps.map((step, stepIdx) => (*/}
          {/*      <li key={step.name} className="relative md:flex-1 md:flex">*/}
          {/*        {step.status === 'complete' ? (*/}
          {/*          <a href={step.href} className="group flex items-center w-full">*/}
          {/*      <span className="px-6 py-4 flex items-center text-sm font-medium">*/}
          {/*        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">*/}
          {/*          <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />*/}
          {/*        </span>*/}
          {/*        <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>*/}
          {/*      </span>*/}
          {/*          </a>*/}
          {/*        ) : step.status === 'current' ? (*/}
          {/*          <a href={step.href} className="px-6 py-4 flex items-center text-sm font-medium" aria-current="step">*/}
          {/*      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">*/}
          {/*        <span className="text-indigo-600">{step.id}</span>*/}
          {/*      </span>*/}
          {/*            <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>*/}
          {/*          </a>*/}
          {/*        ) : (*/}
          {/*          <a href={step.href} className="group flex items-center">*/}
          {/*      <span className="px-6 py-4 flex items-center text-sm font-medium">*/}
          {/*        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">*/}
          {/*          <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>*/}
          {/*        </span>*/}
          {/*        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>*/}
          {/*      </span>*/}
          {/*          </a>*/}
          {/*        )}*/}

          {/*        {stepIdx !== steps.length - 1 ? (*/}
          {/*          <>*/}
          {/*            /!* Arrow separator for lg screens and up *!/*/}
          {/*            <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">*/}
          {/*              <svg*/}
          {/*                className="h-full w-full text-gray-300"*/}
          {/*                viewBox="0 0 22 80"*/}
          {/*                fill="none"*/}
          {/*                preserveAspectRatio="none"*/}
          {/*              >*/}
          {/*                <path*/}
          {/*                  d="M0 -2L20 40L0 82"*/}
          {/*                  vectorEffect="non-scaling-stroke"*/}
          {/*                  stroke="currentcolor"*/}
          {/*                  strokeLinejoin="round"*/}
          {/*                />*/}
          {/*              </svg>*/}
          {/*            </div>*/}
          {/*          </>*/}
          {/*        ) : null}*/}
          {/*      </li>*/}
          {/*    ))}*/}
          {/*  </ol>*/}
          {/*</nav>*/}

          {cards.length <= 0 && <button
            type="button"
            onClick={() => {setCards([new Card()])}}
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
            <span className="mt-2 block text-sm font-medium text-gray-900">Create a card component</span>
          </button>}

          {cards.map((item) => {
            return item.build(setMenu, setTargetCard, setEditing)
          })}

          {cards.length > 0 &&
          <div className="flex justify-center">
            <button
              onClick={() => {
                setCards((prev) => ([...prev, new Card()]))
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create new card
            </button>
          </div>
          }

          <div className="flex justify-end">
            <button
              onClick={load}
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Load
            </button>
            <button
              type="button"
              onClick={save}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </MainContext.Provider>
  )
}
