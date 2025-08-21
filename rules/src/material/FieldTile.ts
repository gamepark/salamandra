import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { Bonus, pointsBonus, scrollBonus } from './Bonus'
import { cost, Cost } from './Cost'
import { crystalEffect, Effect, IngredientType, potionEffect, primaryResourceEffect, specialEffect } from './Effect'
import { FieldEffectHelper } from './helper/FieldEffectHelper'
import { Potion } from './Potion'
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
  activationEffect: Effect
}

export const fieldData: Record<FieldTile, FieldData> = {
  [FieldTile.Field1]: { cost: [], bonus: [pointsBonus(1)], type: FieldType.Billhook, colors: [FieldColor.Orange], activationEffect: crystalEffect(2) },
  [FieldTile.Field2]: {
    cost: [],
    bonus: [pointsBonus(1)],
    type: FieldType.Billhook,
    colors: [FieldColor.Green],
    activationEffect: primaryResourceEffect(PrimaryResource.Leaf)
  },
  [FieldTile.Field3]: {
    cost: [],
    bonus: [pointsBonus(1)],
    type: FieldType.Billhook,
    colors: [FieldColor.White],
    activationEffect: primaryResourceEffect(PrimaryResource.Flower)
  },
  [FieldTile.Field4]: {
    cost: [],
    bonus: [pointsBonus(1)],
    type: FieldType.Billhook,
    colors: [FieldColor.Purple],
    activationEffect: primaryResourceEffect(PrimaryResource.Fruit)
  },
  [FieldTile.Field5]: {
    cost: [cost(1), cost(1, PrimaryResource.Flower)],
    bonus: [pointsBonus(2)],
    type: FieldType.Billhook,
    colors: [FieldColor.Green],
    activationEffect: primaryResourceEffect(PrimaryResource.Leaf, true)
  },
  [FieldTile.Field6]: {
    cost: [cost(2), cost(1, PrimaryResource.Fruit)],
    bonus: [scrollBonus()],
    type: FieldType.Billhook,
    colors: [FieldColor.Green],
    activationEffect: potionEffect({ ingredientType: IngredientType.PrimaryResource, ingredient: PrimaryResource.Leaf, amount: 1 }, Potion.Leaf)
  },
  [FieldTile.Field7]: {
    cost: [cost(1), cost(1, PrimaryResource.Fruit), cost(1, PrimaryResource.Flower)],
    bonus: [scrollBonus(), pointsBonus(2)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Green],
    activationEffect: specialEffect([{ ingredientType: IngredientType.PrimaryResource, amount: 1 }], (game) =>
      new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Green)
    )
  },
  [FieldTile.Field8]: {
    cost: [cost(2), cost(1, PrimaryResource.Leaf)],
    bonus: [pointsBonus(3)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Green],
    activationEffect: specialEffect([{ ingredientType: IngredientType.PrimaryResource, ingredient: Potion.Leaf, amount: 1 }], (game) =>
      new FieldEffectHelper(game).gainPointsForSpecificField(3, FieldColor.Green)
    )
  },
  [FieldTile.Field9]: {
    cost: [cost(4)],
    bonus: [pointsBonus(2)],
    type: FieldType.Billhook,
    colors: [FieldColor.Orange],
    activationEffect: specialEffect([{ ingredientType: IngredientType.Crystal, amount: 1 }], (game) => new FieldEffectHelper(game).reactivateApprentice())
  },
  [FieldTile.Field10]: {
    cost: [cost(1, PrimaryResource.Fruit), cost(1, PrimaryResource.Flower)],
    bonus: [scrollBonus(), pointsBonus(1)],
    type: FieldType.Billhook,
    colors: [FieldColor.Orange],
    activationEffect: crystalEffect(3)
  },
  [FieldTile.Field11]: {
    cost: [cost(2), cost(1, PrimaryResource.Flower)],
    bonus: [pointsBonus(3)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Orange],
    activationEffect: specialEffect([{ ingredientType: IngredientType.Crystal, amount: 2 }], (game) => new FieldEffectHelper(game).takeScrollAndThreePoints())
  },
  [FieldTile.Field12]: {
    cost: [cost(2, PrimaryResource.Flower)],
    bonus: [scrollBonus(), pointsBonus(2)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Orange],
    activationEffect: specialEffect([{ ingredientType: IngredientType.Crystal, amount: 3 }], (game) =>
      new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Orange)
    )
  },
  [FieldTile.Field13]: {
    cost: [cost(2), cost(1, PrimaryResource.Leaf)],
    bonus: [scrollBonus()],
    type: FieldType.Billhook,
    colors: [FieldColor.White],
    activationEffect: potionEffect({ ingredientType: IngredientType.PrimaryResource, ingredient: PrimaryResource.Flower, amount: 1 }, Potion.FlowerOrFruit)
  },
  [FieldTile.Field14]: {
    cost: [cost(1), cost(1, PrimaryResource.Fruit)],
    bonus: [pointsBonus(2)],
    type: FieldType.Billhook,
    colors: [FieldColor.White],
    activationEffect: primaryResourceEffect(PrimaryResource.Flower, true)
  },
  [FieldTile.Field15]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Leaf)],
    bonus: [scrollBonus(), pointsBonus(1)],
    type: FieldType.Cauldron,
    colors: [FieldColor.White],
    activationEffect: specialEffect([{ ingredientType: IngredientType.Potion, ingredient: Potion.FlowerOrFruit, amount: 1 }], (game) =>
      new FieldEffectHelper(game).gainPointsForSpecificField(3, FieldColor.White)
    )
  },
  [FieldTile.Field16]: {
    cost: [cost(2), cost(1, PrimaryResource.Fruit)],
    bonus: [pointsBonus(3)],
    type: FieldType.Cauldron,
    colors: [FieldColor.White],
    activationEffect: specialEffect([{ ingredientType: IngredientType.PrimaryResource, amount: 1 }], (game) =>
      new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.White)
    )
  },
  [FieldTile.Field17]: {
    cost: [cost(1), cost(1, PrimaryResource.Leaf)],
    bonus: [pointsBonus(2)],
    type: FieldType.Billhook,
    colors: [FieldColor.Purple],
    activationEffect: primaryResourceEffect(PrimaryResource.Fruit, true)
  },
  [FieldTile.Field18]: {
    cost: [cost(2), cost(1, PrimaryResource.Flower)],
    bonus: [scrollBonus()],
    type: FieldType.Billhook,
    colors: [FieldColor.Purple],
    activationEffect: potionEffect({ ingredientType: IngredientType.PrimaryResource, ingredient: PrimaryResource.Fruit, amount: 1 }, Potion.FlowerOrFruit)
  },
  [FieldTile.Field19]: {
    cost: [cost(1), cost(1, PrimaryResource.Leaf), cost(1, PrimaryResource.Flower)],
    bonus: [scrollBonus(), pointsBonus(2)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Purple],
    activationEffect: specialEffect(
      [
        { ingredientType: IngredientType.Crystal, amount: 2 },
        { ingredientType: IngredientType.PrimaryResource, ingredient: PrimaryResource.Fruit, amount: 1 }
      ],
      (game) => new FieldEffectHelper(game).gainPointsForSpecificField(3, FieldColor.Purple)
    )
  },
  [FieldTile.Field20]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Fruit)],
    bonus: [pointsBonus(4)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Purple],
    activationEffect: specialEffect([{ ingredientType: IngredientType.PrimaryResource, ingredient: PrimaryResource.Fruit, amount: 1 }], (game) =>
      new FieldEffectHelper(game).twoPointsByCauldron()
    )
  },
  [FieldTile.Field21]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Fruit)],
    bonus: [scrollBonus(), pointsBonus(1)],
    type: FieldType.Billhook,
    colors: [FieldColor.Orange, FieldColor.Green],
    activationEffect: potionEffect({ ingredientType: IngredientType.Crystal, amount: 3 }, Potion.Leaf)
  },
  [FieldTile.Field22]: {
    cost: [cost(5)],
    bonus: [scrollBonus()],
    type: FieldType.Cauldron,
    colors: [FieldColor.White, FieldColor.Purple],
    activationEffect: specialEffect([{ ingredientType: IngredientType.PrimaryResource, ingredient: PrimaryResource.Leaf, amount: 1 }], (game) =>
      new FieldEffectHelper(game).twoPointsByDivinityCard()
    )
  },
  [FieldTile.Field23]: {
    cost: [cost(1, PrimaryResource.Leaf), cost(1, PrimaryResource.Fruit)],
    bonus: [pointsBonus(4)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Green, FieldColor.Purple],
    activationEffect: specialEffect([{ ingredientType: IngredientType.Crystal, amount: 2 }], (game) =>
      new FieldEffectHelper(game).threePointsBySalamanderCard()
    )
  },
  [FieldTile.Field24]: {
    cost: [cost(1, PrimaryResource.Flower), cost(1, PrimaryResource.Leaf)],
    bonus: [pointsBonus(4)],
    type: FieldType.Cauldron,
    colors: [FieldColor.Orange, FieldColor.White],
    activationEffect: specialEffect([{ ingredientType: IngredientType.Crystal, amount: 3 }], (game) => new FieldEffectHelper(game).threePointsByGroveTile())
  }
}
