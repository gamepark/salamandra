import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'

export enum FieldTile {
  Field1 = 1,
  Field2,
  Field3,
  Field4,
  Field5,
  Field6,
  Field7,
  Field8,
  Field9,
  Field10,
  Field11,
  Field12,
  Field13,
  Field14,
  Field15,
  Field16,
  Field17,
  Field18,
  Field19,
  Field20,
  Field21,
  Field22,
  Field23,
  Field24
}

export const startFieldTiles: FieldTile[] = [FieldTile.Field1, FieldTile.Field2, FieldTile.Field3, FieldTile.Field4]

export const fieldTiles: FieldTile[] = shuffle(getEnumValues(FieldTile).filter((field) => !startFieldTiles.includes(field)))
