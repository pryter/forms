
import {TextBox} from "../components/forms/InnerComponents/TextBox";
import {TextInput} from "../components/forms/InnerComponents/TextInput";
import {TextComponent} from "../components/forms/Text";
import {Card} from "../components/forms/Card";

export const getInstanceName = (instance) => {
  if (instance instanceof TextBox) return "TextBox"
  if (instance instanceof TextInput) return "TextInput"
  if (instance instanceof TextComponent) return "TextComponent"
  if (instance instanceof Card) return "Card"

  return null
}
