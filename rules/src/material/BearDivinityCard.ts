import { getEnumValues } from '@gamepark/rules-api'

export enum BearDivinityCard {
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
  BearDivinity12
}

export const bearDivinityCards: BearDivinityCard[] = getEnumValues(BearDivinityCard)

export const bearDivinityCardPoints: Record<BearDivinityCard, number> = {
  [BearDivinityCard.BearDivinity1]: 1,
  [BearDivinityCard.BearDivinity2]: 1,
  [BearDivinityCard.BearDivinity3]: 1,
  [BearDivinityCard.BearDivinity4]: 1,
  [BearDivinityCard.BearDivinity5]: 2,
  [BearDivinityCard.BearDivinity6]: 2,
  [BearDivinityCard.BearDivinity7]: 2,
  [BearDivinityCard.BearDivinity8]: 2,
  [BearDivinityCard.BearDivinity9]: 4,
  [BearDivinityCard.BearDivinity10]: 4,
  [BearDivinityCard.BearDivinity11]: 4,
  [BearDivinityCard.BearDivinity12]: 4
}
