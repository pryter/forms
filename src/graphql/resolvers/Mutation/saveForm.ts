import {initialiseDB} from "../../../handlers/firebase-admin";

export default async function saveForm(parent, args, context, info) {
  const pointer = initialiseDB().collection("forms").doc(args.id)
  await pointer.set({content: args.content})
  return true
}
