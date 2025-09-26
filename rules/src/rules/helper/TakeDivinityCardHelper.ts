import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class TakeDivinityCardHelper extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    if (this.bearCards.length > 0) {
      moves.push(
        this.bearCards.moveItem({
          type: LocationType.PlayerBearCards,
          player: this.player
        })
      )
    }
    if (this.eagleCards.length > 0) {
      moves.push(
        this.eagleCards.moveItem({
          type: LocationType.PlayerEagleCards,
          player: this.player
        })
      )
    }
    return moves
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (
      isMoveItemType(MaterialType.DivinityCard)(move) &&
      (move.location.type === LocationType.PlayerBearCards || move.location.type === LocationType.PlayerEagleCards)
    ) {
      moves.push(this.startRule(RuleId.CheckAndUseScrollTokens))
    }
    return moves
  }

  afterItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (!isMoveItemType(MaterialType.DivinityCard)(move)) return []
    if (move.location.type !== LocationType.PlayerBearCards && move.location.type !== LocationType.PlayerEagleCards) return []
    const item = this.material(MaterialType.DivinityCard).index(move.itemIndex).getItem(move.itemIndex)
    const deck = item.location.type === LocationType.PlayerBearCards ? this.bearCards : this.eagleCards
    return [deck.rotateItem(true)]
  }

  get bearCards() {
    return this.material(MaterialType.DivinityCard).location(LocationType.BearDivinityStack).deck()
  }

  get eagleCards() {
    return this.material(MaterialType.DivinityCard).location(LocationType.EagleDivinityStack).deck()
  }
}
