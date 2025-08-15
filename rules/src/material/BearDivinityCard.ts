import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

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

export const bearDivinityCards: BearDivinityCard[] = shuffle(getEnumValues(BearDivinityCard))
