import { getEnumValues } from '@gamepark/rules-api'
import { Bonus, crystalBonus, divinityCardBonus, DivinityType, pointsBonus, scrollBonus, specialBonus } from './Bonus'
import { cost, Cost, CostType } from './Cost'
import { FieldColor } from './FieldTile'
import { FieldEffectHelper } from './helper/FieldEffectHelper'
import { Potion } from './Potion'

export enum SalamanderCard {
  BlackSalamander1 = 1,
  BlackSalamander2,
  BlackSalamander3,
  BlackSalamander4,
  BlackSalamander5,
  BlackSalamander6,
  BlackSalamander7,
  BlackSalamander8,

  WhiteSalamander1 = 50,
  WhiteSalamander2,
  WhiteSalamander3,
  WhiteSalamander4,
  WhiteSalamander5,
  WhiteSalamander6,
  WhiteSalamander7,
  WhiteSalamander8
}

export enum SalamanderCardColor {
  White = 1,
  Black
}

export const salamanderCards: SalamanderCard[] = getEnumValues(SalamanderCard)
export const blackSalamanderCards: SalamanderCard[] = salamanderCards.filter((c) => c < SalamanderCard.WhiteSalamander1)
export const whiteSalamanderCards: SalamanderCard[] = salamanderCards.filter((c) => c >= SalamanderCard.WhiteSalamander1)

export const blackSalamanderCost: Cost[] = [{ type: CostType.Potion, potion: Potion.FlowerOrFruit }, cost(1)]
export const whiteSalamanderCost: Cost[] = [{ type: CostType.Potion, potion: Potion.Leaf }, cost(2)]

export const salamanderBonus: Record<SalamanderCard, Bonus[]> = {
  [SalamanderCard.BlackSalamander1]: [scrollBonus(), scrollBonus(), crystalBonus(3)],
  [SalamanderCard.BlackSalamander2]: [scrollBonus(), scrollBonus(), pointsBonus(4)],
  [SalamanderCard.BlackSalamander3]: [scrollBonus(), crystalBonus(5)],
  [SalamanderCard.BlackSalamander4]: [scrollBonus(), scrollBonus(), pointsBonus(2)],
  [SalamanderCard.BlackSalamander5]: [scrollBonus(), specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.White))],
  [SalamanderCard.BlackSalamander6]: [scrollBonus(), specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Purple))],
  [SalamanderCard.BlackSalamander7]: [scrollBonus(), specialBonus((game) => new FieldEffectHelper(game).twoPointsByDivinityCard())],
  [SalamanderCard.BlackSalamander8]: [scrollBonus(), scrollBonus()],

  [SalamanderCard.WhiteSalamander1]: [pointsBonus(13)],
  [SalamanderCard.WhiteSalamander2]: [
    divinityCardBonus(DivinityType.Bear),
    specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Green))
  ],
  [SalamanderCard.WhiteSalamander3]: [pointsBonus(11)],
  [SalamanderCard.WhiteSalamander4]: [specialBonus((game) => new FieldEffectHelper(game).reactivateApprentice()), pointsBonus(7)],
  [SalamanderCard.WhiteSalamander5]: [
    specialBonus((game) => new FieldEffectHelper(game).reactivateApprentice()),
    specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Orange))
  ],
  [SalamanderCard.WhiteSalamander6]: [specialBonus((game) => new FieldEffectHelper(game).takeGroveTile()), pointsBonus(8)],
  [SalamanderCard.WhiteSalamander7]: [specialBonus((game) => new FieldEffectHelper(game).takeGroveTile()), pointsBonus(5)],
  [SalamanderCard.WhiteSalamander8]: [divinityCardBonus(DivinityType.Eagle), pointsBonus(6)]
}

export const salamanderCardPoints: Record<SalamanderCard, number> = {
  [SalamanderCard.BlackSalamander1]: 1,
  [SalamanderCard.BlackSalamander2]: 1,
  [SalamanderCard.BlackSalamander3]: 1,
  [SalamanderCard.BlackSalamander4]: 2,
  [SalamanderCard.BlackSalamander5]: 2,
  [SalamanderCard.BlackSalamander6]: 2,
  [SalamanderCard.BlackSalamander7]: 3,
  [SalamanderCard.BlackSalamander8]: 2,

  [SalamanderCard.WhiteSalamander1]: 1,
  [SalamanderCard.WhiteSalamander2]: 1,
  [SalamanderCard.WhiteSalamander3]: 1,
  [SalamanderCard.WhiteSalamander4]: 2,
  [SalamanderCard.WhiteSalamander5]: 2,
  [SalamanderCard.WhiteSalamander6]: 2,
  [SalamanderCard.WhiteSalamander7]: 3,
  [SalamanderCard.WhiteSalamander8]: 2
}
