import {getInstanceName} from "./getInstanceName";

export const serialise = (instance) => {
  let serialised = {}

  for (let [key, val] of Object.entries(instance)) {

    if (Array.isArray(val)) {
      const output = []
      for (let child of val) {
        if (getInstanceName(child) !== null) {
          output.push(serialise(child))
        }else{
          output.push({serialisedData: child, isClass: false})
        }
      }

      serialised[key] = output
    }else{

      if (getInstanceName(val) !== null) {
        serialised[key] = serialise(val)
      }else{
        serialised[key] = {serialisedData: val, isClass: false}
      }

    }
  }

  const name = getInstanceName(instance)

  if (name) {
    return {serialisedData: serialised, isClass: true, serialisedName: name}
  }else{
    return {serialisedData: serialised, isClass: false}
  }
}
