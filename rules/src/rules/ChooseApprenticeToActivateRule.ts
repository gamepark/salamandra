import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { ActivateApprenticeHelper } from './helper/ActivateApprenticeHelper'
import { NextRuleHelper } from './helper/NextRuleHelper'

export class ChooseApprenticeToActivateRule extends PlayerTurnRule {
  activateApprenticeHelper = new ActivateApprenticeHelper(this.game, true)

  getPlayerMoves() {
    return this.activateApprenticeHelper.rotateApprentice()
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && this.activateApprenticeHelper.isActivateApprenticeMove(move)) {
      return new NextRuleHelper(this.game).moveToNextRule()
    }
    return []
  }
}
