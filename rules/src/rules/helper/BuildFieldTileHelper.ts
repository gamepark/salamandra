import {
  isMoveItem,
  isMoveItemType,
  ItemMove,
  Location,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  MaterialRulesPart,
  PlayMoveContext
} from '@gamepark/rules-api'
import { CostType } from '../../material/Cost'
import { fieldData, FieldTile } from '../../material/FieldTile'
import { FieldTileHelper } from '../../material/helper/FieldTileHelper'
import { GroveTileHelper } from '../../material/helper/GroveTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PrimaryResource } from '../../material/PrimaryResource'
import { PlayerColor } from '../../PlayerColor'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'

export class BuildFieldTileHelper extends MaterialRulesPart {
  player?: PlayerColor
  isFree: boolean
  fieldTileHelper = new FieldTileHelper(this.game)
  groveTileHelper = new GroveTileHelper(this.game)

  constructor(game: MaterialGame, isFree = false, player = game.rule?.player) {
    super(game)
    this.player = player
    this.isFree = isFree
  }

  getPlayerMoves() {
    if (this.fieldTilesInRiver.length === 0) return []
    const moves: MaterialMove[] = []
    this.possibleLocations.forEach((location: Location) => {
      moves.push(...this.fieldTilesInRiver.moveItems(location))
    })
    return moves
  }

  get possibleLocations(): Location[] {
    const locations: Location[] = []
    const tileInPlace = this.material(MaterialType.FieldTile).location(LocationType.GameLayout).getItems()

    for (const { location } of tileInPlace) {
      const x = location.x ?? 0
      const y = location.y ?? 0
      locations.push({ type: LocationType.GameLayout, x, y: y - 1 })
      locations.push({ type: LocationType.GameLayout, x: x + 1, y })
      locations.push({ type: LocationType.GameLayout, x, y: y + 1 })
      locations.push({ type: LocationType.GameLayout, x: x - 1, y })
    }

    locations.push({ type: LocationType.GameLayout, x: -1, y: 0 })
    locations.push({ type: LocationType.GameLayout, x: 2, y: 0 })

    return locations.filter((location) => this.checkLocationIsEmpty(location))
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.FieldTile)(move) || !this.isBuildFieldTileMove(move)) return moves

    this.memorize(MemoryType.LastFieldBuilded, move.itemIndex)
    if (!this.isFree) {
      moves.push(...this.fieldTileHelper.payFieldCoast(move.itemIndex))
      moves.push(...this.fieldTileHelper.getFieldBonus(move.itemIndex))
    }
    if (this.grovesInStack.length) {
      moves.push(...this.groveTileHelper.getEmptyGroveLocations(move.location).map((loc) => this.grovesInStack.moveItem(loc)))
    }
    if (this.fieldTilesInStack.length > 0) {
      const oldLocation = this.material(MaterialType.FieldTile).getItem(move.itemIndex).location
      moves.push(this.fieldTilesInStack.moveItem(oldLocation))
    }
    moves.push(this.startRule(this.isFree ? RuleId.DoActions : RuleId.ActionsAfterBuildingField))

    return moves
  }

  get fieldTilesInRiver() {
    return this.material(MaterialType.FieldTile)
      .location(LocationType.FieldSpace)
      .filter<FieldTile>((item) => this.isFree || this.playerCanBuildFieldTile(item))
  }

  get fieldTilesInStack() {
    return this.material(MaterialType.FieldTile)
      .location(LocationType.FieldStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  get playerCrystals() {
    return this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(this.player)
  }

  get grovesInStack() {
    return this.material(MaterialType.GroveTile)
      .location(LocationType.GroveStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  isBuildFieldTileMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldLocationType = this.material(MaterialType.FieldTile).getItem(move.itemIndex).location.type
    return oldLocationType === LocationType.FieldSpace
  }

  private playerCanBuildFieldTile(item: MaterialItem<PlayerColor, LocationType, FieldTile>): boolean {
    const costs = fieldData[item.id].cost
    let canPay = true

    costs.forEach((cost) => {
      if (cost.type === CostType.Crystal && this.playerCrystals.getQuantity() < cost.amount) {
        canPay = false
      }
      if (cost.type === CostType.Resource) {
        const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, this.player)
        if (playerResources[cost.resource] < cost.amount) {
          canPay = false
        }
      }
    })

    return canPay
  }

  private checkLocationIsEmpty(location: Location): boolean {
    if (location.x === 0 && location.y === 0) return false
    if (location.x === 1 && location.y === 0) return false
    return this.material(MaterialType.FieldTile).location((loc) => loc.type === location.type && loc.x === location.x && loc.y === location.y).length === 0
  }
}
