import { getEnumValues } from '@gamepark/rules-api'

export enum EagleDivinityCard {
  EagleDivinity1 = 1,
  EagleDivinity2,
  EagleDivinity3,
  EagleDivinity4,
  EagleDivinity5,
  EagleDivinity6,
  EagleDivinity7,
  EagleDivinity8,
  EagleDivinity9,
  EagleDivinity10,
  EagleDivinity11,
  EagleDivinity12
}

export const eagleDivinityCards: EagleDivinityCard[] = getEnumValues(EagleDivinityCard)
