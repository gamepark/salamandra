import { MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { DivinityType } from './DivinityCard'

export enum BonusType {
  Scroll = 1,
  Points,
  DivinityCard,
  Special,
  Crystal
}

export type ScrollBonus = {
  type: BonusType.Scroll
  count: number
}

export type PointsBonus = {
  type: BonusType.Points
  amount: number
}

export type DivinityCardBonus = {
  type: BonusType.DivinityCard
  divinity: DivinityType
}

export type SpecialBonus = {
  type: BonusType.Special
  effect: (game: MaterialGame) => MaterialMove[]
}

export type CrystalBonus = {
  type: BonusType.Crystal
  amount: number
}

export type Bonus = ScrollBonus | PointsBonus | DivinityCardBonus | SpecialBonus | CrystalBonus

export function scrollBonus(count: number = 1): ScrollBonus {
  return { type: BonusType.Scroll, count }
}

export function pointsBonus(amount: number): PointsBonus {
  return { type: BonusType.Points, amount }
}

export function divinityCardBonus(divinity: DivinityType): DivinityCardBonus {
  return { type: BonusType.DivinityCard, divinity }
}

export function specialBonus(effect: (game: MaterialGame) => MaterialMove[]): SpecialBonus {
  return { type: BonusType.Special, effect }
}

export function crystalBonus(amount: number): CrystalBonus {
  return { type: BonusType.Crystal, amount }
}
