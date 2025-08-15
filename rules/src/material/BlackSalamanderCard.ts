import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

export enum BlackSalamanderCard {
  BlackSalamander1 = 1,
  BlackSalamander2,
  BlackSalamander3,
  BlackSalamander4,
  BlackSalamander5,
  BlackSalamander6,
  BlackSalamander7,
  BlackSalamander8
}

export const blackSalamanderCards: BlackSalamanderCard[] = shuffle(getEnumValues(BlackSalamanderCard))
