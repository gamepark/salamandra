import {
  CustomMove,
  isMoveItemType,
  ItemMove,
  Location,
  MaterialGame,
  MaterialMove,
  MaterialRulesPart,
  PlayMoveContext,
  XYCoordinates
} from '@gamepark/rules-api'
import { crystalTokens } from '../../material/CrystalToken'
import { GroveTileHelper } from '../../material/helper/GroveTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { CustomMoveType } from '../CustomMove'

export class TakeGroveTileHelper extends MaterialRulesPart {
  player?: PlayerColor
  isBonus: boolean
  groveTileHelper = new GroveTileHelper(this.game)

  constructor(game: MaterialGame, isBonus = false, player = game.rule?.player) {
    super(game)
    this.player = player
    this.isBonus = isBonus
  }

  getPlayerMoves() {
    if (this.groveTilesInGame.length === 0) return []
    if (!this.isBonus && this.playerCrystal.getQuantity() < 3) return []
    return this.groveTilesInGame.moveItems({ type: LocationType.PlayerGroveTiles, player: this.player })
  }

  afterItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.GroveTile)(move) && move.location.type === LocationType.PlayerGroveTiles) {
      if (!this.isBonus) {
        moves.push(
          ...this.material(MaterialType.CrystalToken).money(crystalTokens).removeMoney(3, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
        )
      }
      moves.push(...this.groveTileHelper.getGroveBonus(move.itemIndex))
      moves.push(...this.addPointsForSpecificPlayerGrovePosition())
    }

    return moves
  }

  addPointsForSpecificPlayerGrovePosition(): CustomMove[] {
    const nbPlayerGroveTiles = this.material(MaterialType.GroveTile).location(LocationType.PlayerGroveTiles).player(this.player).length

    if (nbPlayerGroveTiles === 2) return [this.customMove(CustomMoveType.Score, { player: this.player, score: 4 })]
    if (nbPlayerGroveTiles === 4) return [this.customMove(CustomMoveType.Score, { player: this.player, score: 3 })]
    if (nbPlayerGroveTiles === 6) return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]

    return []
  }

  get playerCrystal() {
    return this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(this.player)
  }

  get groveTilesInGame() {
    return this.material(MaterialType.GroveTile)
      .location(LocationType.GameLayout)
      .filter((item) => this.isBonus || this.canTakeGroveTile(item.location))
  }

  canTakeGroveTile(location: Partial<Location>): boolean {
    if (location.x === undefined || location.y === undefined) return false
    const playerHasApprenticesInTopRight = this.checkIfPlayerHasApprenticeConnected({ x: location.x + 0.5, y: location.y - 0.5 }, [2, 3])
    const playerHasApprenticesInBottomRight = this.checkIfPlayerHasApprenticeConnected({ x: location.x + 0.5, y: location.y + 0.5 }, [0, 3])
    const playerHasApprenticesInBottomLeft = this.checkIfPlayerHasApprenticeConnected({ x: location.x - 0.5, y: location.y + 0.5 }, [0, 1])
    const playerHasApprenticesInTopLeft = this.checkIfPlayerHasApprenticeConnected({ x: location.x - 0.5, y: location.y - 0.5 }, [1, 2])
    return playerHasApprenticesInTopRight || playerHasApprenticesInBottomRight || playerHasApprenticesInBottomLeft || playerHasApprenticesInTopLeft
  }

  checkIfPlayerHasApprenticeConnected(coordinates: XYCoordinates, apprenticePlaces: number[]): boolean {
    const fieldIndex = this.material(MaterialType.FieldTile)
      .location((loc) => loc.type === LocationType.GameLayout && loc.x === coordinates.x && loc.y === coordinates.y)
      .getIndex()

    return apprenticePlaces.some(
      (place) =>
        this.material(MaterialType.ApprenticeToken)
          .location((loc) => loc.type === LocationType.FieldApprenticeSpace && loc.x === place)
          .parent(fieldIndex)
          .filter((item) => item.id !== undefined && item.id === this.player).length > 0
    )
  }
}
