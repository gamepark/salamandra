import { getEnumValues } from '@gamepark/rules-api'

export enum Potion {
  Leaf = 1,
  FlowerOrFruit
}

export const potions = getEnumValues(Potion)
