import { MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Potion } from './Potion'
import { PrimaryResource } from './PrimaryResource'

export enum EffectType {
  Crystal,
  PrimaryResource,
  Potion,
  Special
}

export enum IngredientType {
  PrimaryResource = 1,
  Potion,
  Crystal
}

export type Ingredient = {
  ingredientType: IngredientType
  ingredient?: PrimaryResource | Potion
  amount: number
}

export type CrystalEffect = {
  type: EffectType.Crystal
  amount: number
}

export type PrimaryResourceEffect = {
  type: EffectType.PrimaryResource
  resource: PrimaryResource
  amount: number
  hasCrystal: boolean
}

export type PotionEffect = {
  type: EffectType.Potion
  ingredient: Ingredient
  potion: Potion
}

export type SpecialEffect = {
  type: EffectType.Special
  ingredients: Ingredient[]
  effect: (game: MaterialGame) => MaterialMove[]
}

export type Effect = CrystalEffect | PrimaryResourceEffect | PotionEffect | SpecialEffect

export function crystalEffect(amount: number): CrystalEffect {
  return { type: EffectType.Crystal, amount }
}

export function primaryResourceEffect(resource: PrimaryResource, hasCrystal = false, amount = 1): PrimaryResourceEffect {
  return { type: EffectType.PrimaryResource, resource, amount, hasCrystal }
}

export function potionEffect(ingredient: Ingredient, potion: Potion): PotionEffect {
  return { type: EffectType.Potion, ingredient, potion }
}

export function specialEffect(ingredients: Ingredient[], effect: (game: MaterialGame) => MaterialMove[]): SpecialEffect {
  return { type: EffectType.Special, ingredients, effect }
}
