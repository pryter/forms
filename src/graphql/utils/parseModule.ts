type CommonModule = {[name: string]: {default: any}}
type NestedModule = {[name: string]: any}

export const parseModule = (modules: CommonModule) => {

  const nestedModule: NestedModule = {}

  for (const [moduleName, Content] of Object.entries(modules)) {
    nestedModule[moduleName] = Content.default
  }

  return nestedModule
}
