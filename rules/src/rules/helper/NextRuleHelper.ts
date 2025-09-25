import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class NextRuleHelper extends MaterialRulesPart {
  player?: number
  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  moveToNextRule() {
    const nextRules: RuleId[] | undefined = this.remind(MemoryType.NextRules) ?? []
    if (nextRules.length > 1) {
      this.memorize(MemoryType.NextRules, nextRules.slice(1))
      return [this.startRule(nextRules[0])]
    }
    if (nextRules.length > 0) {
      this.forget(MemoryType.NextRules)
      return [this.startRule(nextRules[0])]
    }

    return [this.startRule(RuleId.CheckAndUseScrollTokens)]
  }
}
