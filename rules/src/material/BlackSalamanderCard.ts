import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { Bonus, crystalBonus, pointsBonus, scrollBonus, specialBonus } from './Bonus'
import { cost, Cost, CostType } from './Cost'
import { FieldColor } from './FieldTile'
import { FieldEffectHelper } from './helper/FieldEffectHelper'
import { Potion } from './Potion'

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

export const blackSalamanderCost: Cost[] = [{ type: CostType.Potion, potion: Potion.FlowerOrFruit }, cost(1)]

export const blackSalamanderBonus: Record<BlackSalamanderCard, Bonus[]> = {
  [BlackSalamanderCard.BlackSalamander1]: [scrollBonus(), scrollBonus(), crystalBonus(3)],
  [BlackSalamanderCard.BlackSalamander2]: [scrollBonus(), scrollBonus(), pointsBonus(4)],
  [BlackSalamanderCard.BlackSalamander3]: [scrollBonus(), crystalBonus(5)],
  [BlackSalamanderCard.BlackSalamander4]: [scrollBonus(), scrollBonus(), pointsBonus(2)],
  [BlackSalamanderCard.BlackSalamander5]: [scrollBonus(), specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.White))],
  [BlackSalamanderCard.BlackSalamander6]: [scrollBonus(), specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Purple))],
  [BlackSalamanderCard.BlackSalamander7]: [scrollBonus(), specialBonus((game) => new FieldEffectHelper(game).twoPointsByDivinityCard())],
  [BlackSalamanderCard.BlackSalamander8]: [scrollBonus(), scrollBonus()]
}
