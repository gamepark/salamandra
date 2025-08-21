import { isMoveItem, isMoveItemType, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart, PlayMoveContext } from '@gamepark/rules-api'
import { FieldTileHelper } from '../../material/helper/FieldTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { MemoryType } from '../MemoryType'

export class ActivateApprenticeHelper extends MaterialRulesPart {
  player?: PlayerColor
  fieldTileHelper = new FieldTileHelper(this.game)

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getPlayerMoves() {
    if (this.playerApprenticeTokenInField.length === 0) return []
    return this.playerApprenticeTokenInField.moveItems((item) => ({...item.location, rotation: !item.location.rotation}))
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && this.isActivateApprenticeMove(move)) {
      moves.push(...this.fieldTileHelper.getActivationEffet(move.location))
    }
    return moves
  }

  get playerApprenticeTokenInField() {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
      .rotation(rotation)
  }

  isActivateApprenticeMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldLocationType = this.material(MaterialType.ApprenticeToken).getItem(move.itemIndex).location.type
    return oldLocationType === LocationType.FieldApprenticeSpace
  }
}
