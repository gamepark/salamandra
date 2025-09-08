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

export const eagleDivinityCardPoints: Record<EagleDivinityCard, number> = {
  [EagleDivinityCard.EagleDivinity1]: 1,
  [EagleDivinityCard.EagleDivinity2]: 1,
  [EagleDivinityCard.EagleDivinity3]: 1,
  [EagleDivinityCard.EagleDivinity4]: 1,
  [EagleDivinityCard.EagleDivinity5]: 2,
  [EagleDivinityCard.EagleDivinity6]: 2,
  [EagleDivinityCard.EagleDivinity7]: 2,
  [EagleDivinityCard.EagleDivinity8]: 2,
  [EagleDivinityCard.EagleDivinity9]: 4,
  [EagleDivinityCard.EagleDivinity10]: 4,
  [EagleDivinityCard.EagleDivinity11]: 4,
  [EagleDivinityCard.EagleDivinity12]: 4
}
