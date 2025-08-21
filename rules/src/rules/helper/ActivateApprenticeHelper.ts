import { isMoveItem, isMoveItemType, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart, PlayMoveContext } from '@gamepark/rules-api'
import { fieldData, FieldTile, FieldType } from '../../material/FieldTile'
import { FieldTileHelper } from '../../material/helper/FieldTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class ActivateApprenticeHelper extends MaterialRulesPart {
  player?: PlayerColor
  nextPlayer: PlayerColor
  fieldTileHelper = new FieldTileHelper(this.game)

  constructor(game: MaterialGame, nextPlayer: PlayerColor, player = game.rule?.player) {
    super(game)
    this.nextPlayer = nextPlayer
    this.player = player
  }

  getPlayerMoves() {
    if (this.playerApprenticeTokenInField.length === 0) return []
    return this.playerApprenticeTokenInField.moveItems((item) => ({ ...item.location, rotation: !item.location.rotation }))
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && this.isActivateApprenticeMove(move)) {
      moves.push(...this.fieldTileHelper.getActivationEffet(move.location))
      moves.push(...this.fieldTileHelper.payActivation(move.location.parent ?? 0))
      const fieldId = this.material(MaterialType.FieldTile).index(move.location.parent).getItem()?.id
      if (fieldId) {
        if (fieldData[fieldId as FieldTile].type === FieldType.Cauldron) {
          moves.push(this.startPlayerTurn(RuleId.DoActions, this.nextPlayer))
        }
      }
    }
    return moves
  }

  get playerApprenticeTokenInField() {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
      .filter((item) => this.fieldTileHelper.canActivate(item.location.parent ?? 0))
      .rotation(rotation)
  }

  isActivateApprenticeMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldLocationType = this.material(MaterialType.ApprenticeToken).getItem(move.itemIndex).location.type
    return oldLocationType === LocationType.FieldApprenticeSpace
  }
}
