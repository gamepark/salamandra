import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

export enum GroveTile {
  Grove1 = 1,
  Grove2,
  Grove3,
  Grove4,
  Grove5,
  Grove6,
  Grove7,
  Grove8,
  Grove9,
  Grove10,
  Grove11,
  Grove12,
  Grove13,
  Grove14,
  Grove15,
  Grove16,
  Grove17,
  Grove18,
  Grove19,
  Grove20,
  Grove21,
  Grove22,
  Grove23,
  Grove24,
  Grove25,
  Grove26,
  Grove27,
  Grove28,
  Grove29,
  Grove30
}

export const groveTiles: GroveTile[] = shuffle(getEnumValues(GroveTile))
