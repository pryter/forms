import {parseModule} from "../utils/parseModule";

const fs = require('fs');
const path = require("path")

let exportItems: any = {}

fs.readdirSync(path.join(process.cwd(), "src/graphql/resolvers/Query")).forEach(async function (file) {
  if (file.indexOf(".ts") > -1 && file != "index.ts") {
    exportItems[file.replace('.ts', '')] = require(`./Query/${file.replace(".ts", "")}`)
  }
});

exportItems = parseModule(exportItems)

let exportItems2: any = {}

fs.readdirSync(path.join(process.cwd(), "src/graphql/resolvers/Mutation")).forEach(async function (file) {
  if (file.indexOf(".ts") > -1 && file != "index.ts") {
    exportItems2[file.replace('.ts', '')] = require(`./Mutation/${file.replace(".ts", "")}`)
  }
});

exportItems2 = parseModule(exportItems2)

export {exportItems as Queries, exportItems2 as Mutations}

