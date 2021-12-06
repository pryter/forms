import {TextComponent} from "../components/forms/Text";
import {TextBox} from "../components/forms/InnerComponents/TextBox";
import {TextInput} from "../components/forms/InnerComponents/TextInput";
import {Card} from "../components/forms/Card";

export const deSerialise = (data: {[key: string]: any}) => {

  const available = {
    TextComponent: TextComponent,
    TextBox: TextBox,
    TextInput: TextInput,
    Card: Card
  }

  if (data.isClass) {
    const instance = new available[data.serialisedName]
    const o = {}
    for (let [key, val] of Object.entries(data.serialisedData)) {
      if (Array.isArray(val)) {
        let output = []
        if (val.length > 0) {
          output = val.map((item) => {
            return deSerialise(item)
          })
        }
        o[key] = output
      }else{
        o[key] = deSerialise(val)
      }
    }

    console.log(o)

    return Object.assign(instance, o)
  }

  return data.serialisedData
}
