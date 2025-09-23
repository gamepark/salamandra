import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helper/NextRuleHelper'
import { TakeGroveTileHelper } from './helper/TakeGroveTileHelper'

export class TakeGroveTileRule extends PlayerTurnRule {
  takeGroveTileHelper = new TakeGroveTileHelper(this.game, true)

  onRuleStart(): MaterialMove[] {
    if (this.takeGroveTileHelper.groveTilesInGame.length === 0) {
      return new NextRuleHelper(this.game).moveToNextRule()
    }
    return []
  }

  getPlayerMoves() {
    return this.takeGroveTileHelper.getPlayerMoves()
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves = this.takeGroveTileHelper.afterItemMove(move, context)
    if (isMoveItemType(MaterialType.GroveTile)(move) && move.location.type === LocationType.PlayerGroveTiles) {
      moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    }
    return moves
  }
}
