import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'

export class CalculScoresRule extends SimultaneousRule {
  onRuleStart(): MaterialMove[] {
    const moves: MaterialMove[] = []
    return moves
  }

  getActivePlayerLegalMoves(_player: number): MaterialMove[] {
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    return [this.endGame()]
  }
}
