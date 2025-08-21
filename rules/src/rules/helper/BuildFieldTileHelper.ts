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
  fieldTileHelper = new FieldTileHelper(this.game)
  groveTileHelper = new GroveTileHelper(this.game)

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getPlayerMoves() {
    if (this.fieldTilesInRiver.length === 0) return []
    const moves: MaterialMove[] = []
    this.getPossibleLocations().forEach((location: Location) => {
      moves.push(...this.fieldTilesInRiver.moveItems(location))
    })
    return moves
  }

  getPossibleLocations(): Location[] {
    const locations: Location[] = []
    this.material(MaterialType.FieldTile)
      .location(LocationType.GameLayout)
      .getItems()
      .forEach(({ location }) => {
        const x = location.x ?? 0
        const y = location.y ?? 0
        locations.push({ type: LocationType.GameLayout, x, y: y - 1 })
        locations.push({ type: LocationType.GameLayout, x: x + 1, y })
        locations.push({ type: LocationType.GameLayout, x, y: y + 1 })
        locations.push({ type: LocationType.GameLayout, x: x - 1, y })
      })
    locations.push({ type: LocationType.GameLayout, x: -1, y: 0 })
    locations.push({ type: LocationType.GameLayout, x: 2, y: 0 })

    return locations.filter((location) => this.checkLocationIsEmpty(location))
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.FieldTile)(move) && this.isBuildFieldTileMove(move)) {
      this.memorize(MemoryType.LastFieldBuilded, move.itemIndex)
      moves.push(...this.fieldTileHelper.payFieldCoast(move.itemIndex))
      moves.push(...this.fieldTileHelper.getFieldBonus(move.itemIndex))
      moves.push(...this.groveTileHelper.addGroveInEmptySpace(move.location))
      if (this.fieldTilesInStack.length > 0) {
        const oldLocation = this.material(MaterialType.FieldTile).getItem(move.itemIndex).location
        moves.push(this.fieldTilesInStack.moveItem(oldLocation))
      }
      moves.push(this.startRule(RuleId.ActionsAfterBuildingField))
    }
    return moves
  }

  get fieldTilesInRiver() {
    return this.material(MaterialType.FieldTile)
      .location(LocationType.FieldSpace)
      .filter((item) => this.playerCanBuildFieldTile(item))
  }

  get fieldTilesInStack() {
    return this.material(MaterialType.FieldTile)
      .location(LocationType.FieldStack)
      .maxBy(item => item.location.x ?? 0)
  }

  get playerCrystals() {
    return this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(this.player)
  }

  isBuildFieldTileMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldLocationType = this.material(MaterialType.FieldTile).getItem(move.itemIndex).location.type
    return oldLocationType === LocationType.FieldSpace
  }

  private playerCanBuildFieldTile(item: MaterialItem): boolean {
    const costs = fieldData[item.id as FieldTile].cost
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
