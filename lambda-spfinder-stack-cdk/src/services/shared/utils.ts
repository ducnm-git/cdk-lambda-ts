import { JsonError } from "./validator"
import { randomUUID } from "crypto"

export function createRandomId(){
  // replace v4() from uuid
  return randomUUID()
}

export function parseJSON(arg:string) {
  try {
    return JSON.parse(arg)
  } catch (error) {
    throw new JsonError(error.message)
    
  }
}