import { getEnumValues } from '@gamepark/rules-api'

export enum DruidTile {
  Day = 1,
  Night
}

export const getDruidTileType = (id: number) => (id % 10) as DruidTile

export const druidTiles = getEnumValues(DruidTile)
