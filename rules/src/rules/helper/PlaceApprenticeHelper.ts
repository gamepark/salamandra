import { isMoveItem, isMoveItemType, ItemMove, Location, MaterialGame, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { FieldTileHelper } from '../../material/helper/FieldTileHelper'
import { GroveTileHelper } from '../../material/helper/GroveTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class PlaceApprenticeHelper extends PlayerTurnRule {
  fieldIndex?: number
  groveTileHelper = new GroveTileHelper(this.game)
  fieldTileHelper = new FieldTileHelper(this.game)

  constructor(game: MaterialGame, fieldIndex?: number) {
    super(game)
    this.fieldIndex = fieldIndex
  }

  getPlayerMoves() {
    if (this.playerApprenticeToken.length === 0) return []

    const moves: MaterialMove[] = []
    this.getPossibleLocations().forEach((location: Location) => {
      moves.push(this.playerApprenticeToken.moveItem((item) => ({ ...location, rotation: item.location.rotation })))
    })
    return moves
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && this.isPlaceApprenticeMove(move)) {
      moves.push(...this.groveTileHelper.getGroveCrystals(move.location))
      if (move.location.x === 0) {
        moves.push(...this.fieldTileHelper.getFieldBonus(move.location.parent!))
      }
      moves.push(this.startRule(RuleId.CheckAndUseScrollTokens))
    }
    return moves
  }

  getPossibleLocations(): Location[] {
    if (this.fieldIndex !== undefined) return this.getPossibleLocationsOnSpecificFieldTile()
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

  private getPossibleLocationsOnSpecificFieldTile(): Location[] {
    if (this.fieldIndex === undefined) return []
    const locations: Location[] = []
    for (let x = 0; x < 4; x++) {
      locations.push({
        type: LocationType.FieldApprenticeSpace,
        parent: this.fieldIndex,
        x
      })
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

  isPlaceApprenticeMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldLocationType = this.material(MaterialType.ApprenticeToken).getItem(move.itemIndex).location.type
    return oldLocationType === LocationType.PlayerActualRoundApprenticesSpace
  }
}
