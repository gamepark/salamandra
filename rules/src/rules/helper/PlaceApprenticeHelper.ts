import { isMoveItemType, ItemMove, Location, MaterialGame, MaterialMove, MaterialRulesPart, PlayMoveContext } from '@gamepark/rules-api'
import { FieldTileHelper } from '../../material/helper/FieldTileHelper'
import { GroveTileHelper } from '../../material/helper/GroveTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class PlaceApprenticeHelper extends MaterialRulesPart {
  player?: PlayerColor
  nextPlayer: PlayerColor
  groveTileHelper = new GroveTileHelper(this.game)
  fieldTileHelper = new FieldTileHelper(this.game)

  constructor(game: MaterialGame, nextPlayer: PlayerColor, player = game.rule?.player) {
    super(game)
    this.nextPlayer = nextPlayer
    this.player = player
  }

  getPlayerMoves() {
    if (this.playerApprenticeToken.length === 0) return []

    const moves: MaterialMove[] = []
    this.getPossibleLocations().forEach((location: Location) => {
      moves.push(this.playerApprenticeToken.moveItem(location))
    })
    return moves
  }

  afterItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ApprenticeToken)(move)) {
      moves.push(...this.groveTileHelper.getGroveCrystals(move.location))
      moves.push(...this.fieldTileHelper.getFieldBonus(move.location))
      moves.push(this.startPlayerTurn(RuleId.DoActions, this.nextPlayer))
    }
    return moves
  }

  private getPossibleLocations(): Location[] {
    const locations: Location[] = []
    for (const field of this.fieldsInGame.getIndexes()) {
      for (let x = 0; x < 4; x++) {
        locations.push({
          type: LocationType.FieldApprenticeSpace,
          parent: field,
          x
        })
      }
    }
    return locations.filter((loc) => this.checkLocationIsEmpty(loc))
  }

  private checkLocationIsEmpty(location: Location) {
    return (
      this.material(MaterialType.ApprenticeToken).location((loc) => loc.type === location.type && loc.parent === location.parent && loc.x === location.x)
        .length === 0
    )
  }

  get playerApprenticeToken() {
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.PlayerActualRoundApprenticesSpace)
      .player(this.player)
      .minBy((item) => item.location.x ?? 0)
  }

  get fieldsInGame() {
    return this.material(MaterialType.FieldTile).location(LocationType.GameLayout)
  }
}
