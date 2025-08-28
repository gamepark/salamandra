import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { Bonus, divinityCardBonus, DivinityType, pointsBonus, specialBonus } from './Bonus'
import { cost, Cost, CostType } from './Cost'
import { FieldColor } from './FieldTile'
import { FieldEffectHelper } from './helper/FieldEffectHelper'
import { Potion } from './Potion'

export enum WhiteSalamanderCard {
  WhiteSalamander1 = 1,
  WhiteSalamander2,
  WhiteSalamander3,
  WhiteSalamander4,
  WhiteSalamander5,
  WhiteSalamander6,
  WhiteSalamander7,
  WhiteSalamander8
}

export const whiteSalamanderCards: WhiteSalamanderCard[] = shuffle(getEnumValues(WhiteSalamanderCard))

export const whiteSalamanderCost: Cost[] = [{ type: CostType.Potion, potion: Potion.Leaf }, cost(2)]

export const whiteSalamanderBonus: Record<WhiteSalamanderCard, Bonus[]> = {
  [WhiteSalamanderCard.WhiteSalamander1]: [pointsBonus(13)],
  [WhiteSalamanderCard.WhiteSalamander2]: [
    divinityCardBonus(DivinityType.Bear),
    specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Green))
  ],
  [WhiteSalamanderCard.WhiteSalamander3]: [pointsBonus(11)],
  [WhiteSalamanderCard.WhiteSalamander4]: [specialBonus((game) => new FieldEffectHelper(game).reactivateApprentice()), pointsBonus(7)],
  [WhiteSalamanderCard.WhiteSalamander5]: [
    specialBonus((game) => new FieldEffectHelper(game).reactivateApprentice()),
    specialBonus((game) => new FieldEffectHelper(game).gainPointsForSpecificField(2, FieldColor.Orange))
  ],
  [WhiteSalamanderCard.WhiteSalamander6]: [specialBonus((game) => new FieldEffectHelper(game).takeGroveTile()), pointsBonus(8)],
  [WhiteSalamanderCard.WhiteSalamander7]: [specialBonus((game) => new FieldEffectHelper(game).takeGroveTile()), pointsBonus(5)],
  [WhiteSalamanderCard.WhiteSalamander8]: [divinityCardBonus(DivinityType.Eagle), pointsBonus(6)]
}
