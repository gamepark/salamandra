import { getEnumValues } from '@gamepark/rules-api'

export enum DivinityType {
  Bear = 1,
  Eagle
}

export type DivinityCardId = {
  front: DivinityCard
  back: DivinityType
}

export enum DivinityCard {
  BearDivinity1 = 1,
  BearDivinity2,
  BearDivinity3,
  BearDivinity4,
  BearDivinity5,
  BearDivinity6,
  BearDivinity7,
  BearDivinity8,
  BearDivinity9,
  BearDivinity10,
  BearDivinity11,
  BearDivinity12,

  EagleDivinity1 = 50,
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

export const divinityCards: DivinityCard[] = getEnumValues(DivinityCard)
export const bearDivinityCards: DivinityCard[] = divinityCards.filter((card) => card < DivinityCard.EagleDivinity1)
export const eagleDivinityCards: DivinityCard[] = divinityCards.filter((card) => card >= DivinityCard.EagleDivinity1)

export const divinityCardPoints: Record<DivinityCard, number> = {
  [DivinityCard.BearDivinity1]: 1,
  [DivinityCard.BearDivinity2]: 1,
  [DivinityCard.BearDivinity3]: 1,
  [DivinityCard.BearDivinity4]: 1,
  [DivinityCard.BearDivinity5]: 2,
  [DivinityCard.BearDivinity6]: 2,
  [DivinityCard.BearDivinity7]: 2,
  [DivinityCard.BearDivinity8]: 2,
  [DivinityCard.BearDivinity9]: 3,
  [DivinityCard.BearDivinity10]: 3,
  [DivinityCard.BearDivinity11]: 3,
  [DivinityCard.BearDivinity12]: 3,

  [DivinityCard.EagleDivinity1]: 1,
  [DivinityCard.EagleDivinity2]: 1,
  [DivinityCard.EagleDivinity3]: 1,
  [DivinityCard.EagleDivinity4]: 1,
  [DivinityCard.EagleDivinity5]: 2,
  [DivinityCard.EagleDivinity6]: 2,
  [DivinityCard.EagleDivinity7]: 2,
  [DivinityCard.EagleDivinity8]: 2,
  [DivinityCard.EagleDivinity9]: 4,
  [DivinityCard.EagleDivinity10]: 4,
  [DivinityCard.EagleDivinity11]: 4,
  [DivinityCard.EagleDivinity12]: 4
}
