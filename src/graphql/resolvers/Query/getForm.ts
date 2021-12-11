import {initialiseDB} from "../../../handlers/firebase-admin";

export default async function getForm(parent, args, context, info) {
  const data = await initialiseDB().collection("forms").doc(args.id).get()
  return {status: true, data: {content: data.get("content")}}
}
