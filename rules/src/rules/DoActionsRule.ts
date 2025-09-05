import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { ActivateSalamanderTempleHelper } from './helper/ActivateSalamanderTempleHelper'
import { PlaceApprenticeHelper } from './helper/PlaceApprenticeHelper'
import { ActivateApprenticeHelper } from './helper/ActivateApprenticeHelper'
import { BuildFieldTileHelper } from './helper/BuildFieldTileHelper'
import { CustomMoveType } from './CustomMove'
import { RuleId } from './RuleId'

export class DoActionsRule extends PlayerTurnRule {
  placeApprenticeHelper = new PlaceApprenticeHelper(this.game)
  activateApprenticeHelper = new ActivateApprenticeHelper(this.game)
  activateSalamanderTempleHelper = new ActivateSalamanderTempleHelper(this.game)
  buildFieldTileHelper = new BuildFieldTileHelper(this.game)

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const placeApprenticeMoves = this.placeApprenticeHelper.getPlayerMoves()
    if (placeApprenticeMoves.length === 0) {
      moves.push(this.customMove(CustomMoveType.Pass))
    } else {
      moves.push(...placeApprenticeMoves)
    }

    moves.push(...this.buildFieldTileHelper.getPlayerMoves())
    moves.push(...this.activateApprenticeHelper.getPlayerMoves())
    moves.push(...this.activateSalamanderTempleHelper.getPlayerMoves())
    return moves
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.placeApprenticeHelper.beforeItemMove(move, context))
    moves.push(...this.buildFieldTileHelper.beforeItemMove(move, context))
    moves.push(...this.activateApprenticeHelper.beforeItemMove(move, context))
    moves.push(...this.activateSalamanderTempleHelper.beforeItemMove(move, context))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.activateApprenticeHelper.onCustomMove(move))
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      moves.push(this.startRule(RuleId.ActionsOnPass))
    }
    return moves
  }
}
