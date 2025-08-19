export enum BonusType {
  Scroll = 1,
  Points,
  DivinityCard
}

export enum DivinityType {
  Eagle = 1,
  Bear
}

export type ScrollBonus = {
  type: BonusType.Scroll
}

export type PointsBonus = {
  type: BonusType.Points
  amount: number
}

export type DivinityCardBonus = {
  type: BonusType.DivinityCard
  divinity: DivinityType
}

export type Bonus = ScrollBonus | PointsBonus | DivinityCardBonus

export function scrollBonus(): ScrollBonus {
  return { type: BonusType.Scroll }
}

export function pointsBonus(amount: number): PointsBonus {
  return { type: BonusType.Points, amount }
}

export function divinityCardBonus(divinity: DivinityType): DivinityCardBonus {
  return { type: BonusType.DivinityCard, divinity }
}
