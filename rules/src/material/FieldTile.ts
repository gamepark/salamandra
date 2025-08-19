import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { pointsBonus, Bonus, scrollBonus } from './Bonus'
import { cost, Cost } from './Cost'
import { PrimaryResource } from './PrimaryResource'

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

export enum FieldType {
  Cauldron = 1,
  Billhook
}

export enum FieldColor {
  Orange = 1,
  Green,
  White,
  Purple
}

export type FieldData = {
  cost: Cost[]
  bonus: Bonus[]
  type: FieldType
  colors: FieldColor[]
}

export const fieldData: Record<FieldTile, FieldData> = {
  [FieldTile.Field1]: { cost: [], bonus: [pointsBonus(1)], type: FieldType.Billhook, colors: [FieldColor.Orange] },
  [FieldTile.Field2]: { cost: [], bonus: [pointsBonus(1)], type: FieldType.Billhook, colors: [FieldColor.Green] },
  [FieldTile.Field3]: { cost: [], bonus: [pointsBonus(1)], type: FieldType.Billhook, colors: [FieldColor.White] },
  [FieldTile.Field4]: { cost: [], bonus: [pointsBonus(1)], type: FieldType.Billhook, colors: [FieldColor.Purple] },
  [FieldTile.Field5]: { cost: [cost(1), cost(1, PrimaryResource.Flower)], bonus: [pointsBonus(2)], type: FieldType.Billhook, colors: [FieldColor.Green] },
  [FieldTile.Field6]: { cost: [cost(2), cost(1, PrimaryResource.Fruit)], bonus: [scrollBonus()], type: FieldType.Billhook, colors: [FieldColor.Green] },
  [FieldTile.Field7]: {
    cost: [cost(1), cost(1, PrimaryResource.Fruit), cost(1, PrimaryResource.Flower)],
    bonus: [scrollBonus(), pointsBonus(2)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Green]
  },
  [FieldTile.Field8]: { cost: [cost(2), cost(1, PrimaryResource.Leaf)], bonus: [pointsBonus(3)], type: FieldType.Cauldron, colors: [FieldColor.Green] },
  [FieldTile.Field9]: { cost: [cost(4)], bonus: [pointsBonus(2)], type: FieldType.Billhook, colors: [FieldColor.Orange] },
  [FieldTile.Field10]: {
    cost: [cost(1, PrimaryResource.Fruit), cost(1, PrimaryResource.Flower)],
    bonus: [scrollBonus(), pointsBonus(1)],
    type: FieldType.Billhook,
    colors: [FieldColor.Orange]
  },
  [FieldTile.Field11]: { cost: [cost(2), cost(1, PrimaryResource.Flower)], bonus: [pointsBonus(3)], type: FieldType.Cauldron, colors: [FieldColor.Orange] },
  [FieldTile.Field12]: { cost: [cost(2, PrimaryResource.Flower)], bonus: [scrollBonus(), pointsBonus(2)], type: FieldType.Cauldron, colors: [FieldColor.Orange] },
  [FieldTile.Field13]: { cost: [cost(2), cost(1, PrimaryResource.Leaf)], bonus: [scrollBonus()], type: FieldType.Billhook, colors: [FieldColor.White] },
  [FieldTile.Field14]: { cost: [cost(1), cost(1, PrimaryResource.Fruit)], bonus: [pointsBonus(2)], type: FieldType.Billhook, colors: [FieldColor.White] },
  [FieldTile.Field15]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Leaf)],
    bonus: [scrollBonus(), pointsBonus(1)],
    type: FieldType.Cauldron,
    colors: [FieldColor.White]
  },
  [FieldTile.Field16]: { cost: [cost(2), cost(1, PrimaryResource.Fruit)], bonus: [pointsBonus(3)], type: FieldType.Cauldron, colors: [FieldColor.White] },
  [FieldTile.Field17]: { cost: [cost(1), cost(1, PrimaryResource.Leaf)], bonus: [pointsBonus(2)], type: FieldType.Billhook, colors: [FieldColor.Purple] },
  [FieldTile.Field18]: { cost: [cost(2), cost(1, PrimaryResource.Flower)], bonus: [scrollBonus()], type: FieldType.Billhook, colors: [FieldColor.Purple] },
  [FieldTile.Field19]: {
    cost: [cost(1), cost(1, PrimaryResource.Leaf), cost(1, PrimaryResource.Flower)],
    bonus: [scrollBonus(), pointsBonus(2)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Purple]
  },
  [FieldTile.Field20]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Fruit)],
    bonus: [pointsBonus(4)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Purple]
  },
  [FieldTile.Field21]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Fruit)],
    bonus: [scrollBonus(), pointsBonus(1)],
    type: FieldType.Billhook,
    colors: [FieldColor.Orange, FieldColor.Green]
  },
  [FieldTile.Field22]: { cost: [cost(5)], bonus: [scrollBonus()], type: FieldType.Cauldron, colors: [FieldColor.White, FieldColor.Purple] },
  [FieldTile.Field23]: {
    cost: [cost(1, PrimaryResource.Leaf), cost(1, PrimaryResource.Fruit)],
    bonus: [pointsBonus(4)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Green, FieldColor.Purple]
  },
  [FieldTile.Field24]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Leaf)],
    bonus: [pointsBonus(4)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Orange, FieldColor.White]
  }
}
