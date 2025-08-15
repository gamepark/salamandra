import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

export enum WhiteSalamanderCard {
  WhiteSalamander1 = 1,
  WhiteSalamander2,
  WhiteSalamander3,
  WhiteSalamander4,
  WhiteSalamander5,
  WhiteSalamander6,
  WhiteSalamander7,
  WhiteSalamander8
}

export const whiteSalamanderCards: WhiteSalamanderCard[] = shuffle(getEnumValues(WhiteSalamanderCard))
