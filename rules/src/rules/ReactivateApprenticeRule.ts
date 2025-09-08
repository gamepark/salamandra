import { isMoveItem, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NextRuleHelper } from './helper/NextRuleHelper'
import { MemoryType } from './MemoryType'

export class ReactivateApprenticeRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.playerApprenticeTokenInField.length === 0) return new NextRuleHelper(this.game).moveToNextRule()
    return []
  }

  getPlayerMoves() {
    if (this.playerApprenticeTokenInField.length === 0) return []
    return this.playerApprenticeTokenInField.rotateItems((item) => !item.location.rotation)
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && this.isReactivateApprenticeMove(move)) {
      return new NextRuleHelper(this.game).moveToNextRule()
    }
    return []
  }

  get playerApprenticeTokenInField() {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
      .rotation(!rotation)
  }

  isReactivateApprenticeMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldLocationType = this.material(MaterialType.ApprenticeToken).getItem(move.itemIndex).location.type
    return oldLocationType === LocationType.FieldApprenticeSpace
  }
}
