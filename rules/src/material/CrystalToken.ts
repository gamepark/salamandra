import { getEnumValues } from '@gamepark/rules-api'

export enum CrystalToken {
  Crystal1 = 1,
  Crystal5 = 5
}

export const crystalTokens = getEnumValues(CrystalToken)
