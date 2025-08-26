import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class TakeDivinityCardHelper extends MaterialRulesPart {
  player?: PlayerColor
  nextPlayer: PlayerColor

  constructor(game: MaterialGame, nextPlayer: PlayerColor, player = game.rule?.player) {
    super(game)
    this.nextPlayer = nextPlayer
    this.player = player
  }

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
    if (isMoveItemType(MaterialType.BearDivinityCard)(move) || isMoveItemType(MaterialType.EagleDivinityCard)(move)) {
      moves.push(this.startPlayerTurn(RuleId.CheckPassAndEmptyPlaces, this.nextPlayer))
    }
    return moves
  }

  get bearCards() {
    return this.material(MaterialType.BearDivinityCard)
      .location(LocationType.BearDivinityStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  get eagleCards() {
    return this.material(MaterialType.EagleDivinityCard)
      .location(LocationType.EagleDivinityStack)
      .maxBy((item) => item.location.x ?? 0)
  }
}
