import {useState} from "react";
import {uid} from "uid";

export type DynamicCallback = (callback: () => void, dep?:any) => void

export interface useUpdateStateType {
  updateState: () => void,
  dynamicCallback: DynamicCallback
}

export const useUpdateState = () => {

  const [updatingDep, setUpdatingDep] = useState(null)

  const updateState = (dep: any) => {
    setUpdatingDep(dep)
  }

  const dynamicCallback = (callback: () => void , dep?: any) => {
    callback()
    if (dep) {
      updateState(dep)
      return
    }

    const randomDep = uid(6)
    updateState(randomDep)
  }

  return {updateState, dynamicCallback}
}
