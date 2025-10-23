import { getEnumValues } from '@gamepark/rules-api'
import { Bonus, divinityCardBonus, pointsBonus, scrollBonus } from './Bonus'
import { DivinityType } from './DivinityCard'

export enum GroveTile {
  Grove1 = 1,
  Grove2,
  Grove3,
  Grove4,
  Grove5,
  Grove6,
  Grove7,
  Grove8,
  Grove9,
  Grove10,
  Grove11,
  Grove12,
  Grove13,
  Grove14,
  Grove15,
  Grove16,
  Grove17,
  Grove18,
  Grove19,
  Grove20,
  Grove21,
  Grove22,
  Grove23,
  Grove24,
  Grove25,
  Grove26,
  Grove27,
  Grove28,
  Grove29,
  Grove30
}

export const groveTiles: GroveTile[] = getEnumValues(GroveTile)

export type GroveData = {
  bonus: Bonus[]
  crystals: number[]
}

export const groveData: Record<GroveTile, GroveData> = {
  [GroveTile.Grove1]: { bonus: [scrollBonus(), pointsBonus(1)], crystals: [0, 1, 1, 0] },
  [GroveTile.Grove2]: { bonus: [scrollBonus(), pointsBonus(1)], crystals: [0, 0, 1, 1] },
  [GroveTile.Grove3]: { bonus: [scrollBonus(), pointsBonus(2)], crystals: [1, 1, 1, 0] },
  [GroveTile.Grove4]: { bonus: [scrollBonus(), pointsBonus(2)], crystals: [1, 1, 0, 1] },
  [GroveTile.Grove5]: { bonus: [scrollBonus()], crystals: [0, 0, 0, 1] },
  [GroveTile.Grove6]: { bonus: [divinityCardBonus(DivinityType.Bear)], crystals: [1, 0, 1, 0] },
  [GroveTile.Grove7]: { bonus: [divinityCardBonus(DivinityType.Eagle)], crystals: [1, 0, 1, 1] },
  [GroveTile.Grove8]: { bonus: [scrollBonus()], crystals: [0, 0, 1, 0] },
  [GroveTile.Grove9]: { bonus: [scrollBonus(), pointsBonus(1)], crystals: [1, 1, 0, 0] },
  [GroveTile.Grove10]: { bonus: [scrollBonus(), pointsBonus(1)], crystals: [1, 0, 0, 1] },
  [GroveTile.Grove11]: { bonus: [divinityCardBonus(DivinityType.Bear)], crystals: [0, 0, 0, 1] },
  [GroveTile.Grove12]: { bonus: [scrollBonus()], crystals: [1, 0, 0, 0] },
  [GroveTile.Grove13]: { bonus: [scrollBonus()], crystals: [0, 1, 0, 0] },
  [GroveTile.Grove14]: { bonus: [divinityCardBonus(DivinityType.Eagle)], crystals: [0, 1, 0, 1] },
  [GroveTile.Grove15]: { bonus: [divinityCardBonus(DivinityType.Eagle)], crystals: [0, 1, 0, 0] },
  [GroveTile.Grove16]: { bonus: [divinityCardBonus(DivinityType.Bear)], crystals: [1, 1, 1, 0] },
  [GroveTile.Grove17]: { bonus: [pointsBonus(5)], crystals: [1, 1, 0, 1] },
  [GroveTile.Grove18]: { bonus: [pointsBonus(5)], crystals: [0, 1, 1, 1] },
  [GroveTile.Grove19]: { bonus: [pointsBonus(4)], crystals: [1, 1, 0, 0] },
  [GroveTile.Grove20]: { bonus: [pointsBonus(4)], crystals: [1, 0, 0, 1] },
  [GroveTile.Grove21]: { bonus: [pointsBonus(4)], crystals: [0, 1, 1, 0] },
  [GroveTile.Grove22]: { bonus: [pointsBonus(4)], crystals: [0, 0, 1, 1] },
  [GroveTile.Grove23]: { bonus: [pointsBonus(3)], crystals: [0, 1, 0, 0] },
  [GroveTile.Grove24]: { bonus: [pointsBonus(3)], crystals: [0, 0, 0, 1] },
  [GroveTile.Grove25]: { bonus: [pointsBonus(3)], crystals: [0, 0, 1, 0] },
  [GroveTile.Grove26]: { bonus: [pointsBonus(3)], crystals: [0, 0, 1, 0] },
  [GroveTile.Grove27]: { bonus: [scrollBonus(), pointsBonus(2)], crystals: [0, 1, 1, 1] },
  [GroveTile.Grove28]: { bonus: [scrollBonus(), pointsBonus(2)], crystals: [1, 0, 1, 1] },
  [GroveTile.Grove29]: { bonus: [pointsBonus(3)], crystals: [1, 0, 0, 0] },
  [GroveTile.Grove30]: { bonus: [pointsBonus(3)], crystals: [1, 0, 0, 0] }
}
