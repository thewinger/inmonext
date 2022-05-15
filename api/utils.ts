import { Category, Location } from "../generated/graphql"

export const isObject = (value: object) => {
    return !!(value && typeof value === 'object' && !Array.isArray(value))
    // return !!(value && typeof value === 'object' && 'name' in value)
}

export interface Options {
  name: string,
  value: string | number,
}

export const toFormattedArray = (unformattedArray: string[] | Location[] | Category[]) => {

  let listOfObjs: Options[] = []
  let newObj = <Options>{}

  const newObjFunction = (name: string, value: string | number) => {
    newObj = {name: name, value: value}
    return (listOfObjs.push(newObj))
  }

  if (Array.isArray(unformattedArray)) {

    unformattedArray.map((val) => {
      if (typeof val === 'string') {
        newObjFunction(val, val)
      } else if (typeof val === 'object' && (val.__typename === 'Location' || val.__typename ===  'Category')) {
        newObjFunction(val.name!, val.databaseId!)
        if ('children' in val) {
          val.children?.nodes?.map((child) => {
            newObjFunction(`-- ${child.name!}`, child.databaseId!)
          })
        }
      }
    })
    return listOfObjs
  }
  listOfObjs = [{name: "error", value: "error"}]
  return listOfObjs
}





