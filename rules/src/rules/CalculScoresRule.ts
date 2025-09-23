import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ScoreHelper } from './helper/ScoreHelper'
import { MemoryType } from './MemoryType'

export class CalculScoresRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    for (const player of this.game.players) {
      const helper = new ScoreHelper(this.game, player)
      this.memorize(MemoryType.Score, (s?: number) => (s ?? 0) + helper.endOfGameScore, player)
    }
    return [this.endGame()]
  }
}
