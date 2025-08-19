import { getEnumValues } from '@gamepark/rules-api'

export enum PrimaryResource {
  Leaf = 1,
  Flower,
  Fruit
}

export const primaryResources = getEnumValues(PrimaryResource)
