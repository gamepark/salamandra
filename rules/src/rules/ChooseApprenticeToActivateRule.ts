import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { ActivateApprenticeHelper } from './helper/ActivateApprenticeHelper'
import { RuleId } from './RuleId'

export class ChooseApprenticeToActivateRule extends PlayerTurnRule {
  activateApprenticeHelper = new ActivateApprenticeHelper(this.game, this.nextPlayer)

  getPlayerMoves() {
    return this.activateApprenticeHelper.getPlayerMoves()
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && this.activateApprenticeHelper.isActivateApprenticeMove(move)) {
      return [this.startRule(RuleId.CheckAndUseScrollTokens)]
    }
    return []
  }
}
