import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { ScoreHelper } from './helper/ScoreHelper'

export class CalculScoresRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    new ScoreHelper(this.game).setTotalScore()
    return [this.endGame()]
  }
}
