import { body } from "express-validator";

export function checkEnumMatchWithArray<T extends { [key: string]: string | number }>(actions: string[], enumType: T): boolean {
    return actions.some(action => Object.values(enumType).includes(action));
}

export function checkEnumMatchWithString<T extends { [key: string]: string }>(action: string, enumType: T): boolean {
  return Object.values(enumType).includes(action);
}

export function createArrayOfExpressValidatorsForBodyNotEmpty(arr: string[]) {
  return arr.map((v) => body(v).notEmpty().withMessage({message: `${v} is required.`}))
}