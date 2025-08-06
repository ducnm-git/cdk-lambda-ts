import { spfEntry } from "../model/model"

export class JsonError extends Error {}

export class missingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`)
  }
}

export function validateSpfEntry(arg: any) {
  if ((arg as spfEntry).id == undefined) {
    throw new missingFieldError('id');
  }
  if ((arg as spfEntry).name == undefined) {
    throw new missingFieldError('name');
  }
  if ((arg as spfEntry).location == undefined) {
    throw new missingFieldError('location');
  }
}