import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlaceApprenticeHelper } from './helper/PlaceApprenticeHelper'
import { ActivateApprenticeHelper } from './helper/ActivateApprenticeHelper'
import { BuildFieldTileHelper } from './helper/BuildFieldTileHelper'
import { CustomMoveType } from './CustomMove'
import { RuleId } from './RuleId'

export class DoActionsRule extends PlayerTurnRule {
  placeApprenticeHelper = new PlaceApprenticeHelper(this.game, this.nextPlayer)
  activateApprenticeHelper = new ActivateApprenticeHelper(this.game, this.nextPlayer)
  buildFieldTileHelper = new BuildFieldTileHelper(this.game)

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const placeApprenticeMoves = this.placeApprenticeHelper.getPlayerMoves()
    if (placeApprenticeMoves.length === 0) {
      moves.push(this.customMove(CustomMoveType.Pass))
    } else {
      moves.push(...placeApprenticeMoves)
    }
    moves.push(...this.activateApprenticeHelper.getPlayerMoves())
    moves.push(...this.buildFieldTileHelper.getPlayerMoves())
    return moves
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.placeApprenticeHelper.beforeItemMove(move, context))
    moves.push(...this.activateApprenticeHelper.beforeItemMove(move, context))
    moves.push(...this.buildFieldTileHelper.beforeItemMove(move, context))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startRule(RuleId.ActionsOnPass)]
    }
    return []
  }
}
