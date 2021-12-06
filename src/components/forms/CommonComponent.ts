export class CommonComponent {

  constructor() {

  }

  private findPrototype(instance) {
    let i = instance.constructor

    while (Object.getPrototypeOf(i) !== null) {
      if (Object.getPrototypeOf(i).name === "CommonComponent") {
        return instance.constructor.name
      }else{
        i = Object.getPrototypeOf(i)
      }
    }
    return false
  }

  public serialise() {
    let serialised = {}

    for (let [key, val] of Object.entries(this)) {

      if (Array.isArray(val)) {
        const output = []
        for (let child of val) {
          if (this.findPrototype(child)) {
            output.push(child.serialise())
          }else{
            output.push({serialisedData: child, isClass: false})
          }
        }

        serialised[key] = output
      }else{

        if (this.findPrototype(val)) {
          serialised[key] = val.serialise()
        }else{
          serialised[key] = {serialisedData: val, isClass: false}
        }

      }
    }

    const name = this.findPrototype(this)

    if (name) {
      return {serialisedData: serialised, isClass: true, serialisedName: name}
    }else{
      return {serialisedData: serialised, isClass: false}
    }
  }

}
