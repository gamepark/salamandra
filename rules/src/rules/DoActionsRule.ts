import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlaceApprenticeHelper } from './helper/PlaceApprenticeHelper'

export class DoActionsRule extends PlayerTurnRule {
  placeApprenticeHelper = new PlaceApprenticeHelper(this.game, this.nextPlayer)

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(...this.placeApprenticeHelper.getPlayerMoves())
    return moves
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.placeApprenticeHelper.afterItemMove(move, context))
    return moves
  }
}
