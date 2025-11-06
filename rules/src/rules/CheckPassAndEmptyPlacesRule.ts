import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { CostType } from '../material/Cost'
import { EffectType } from '../material/Effect'
import { fieldData, FieldTile } from '../material/FieldTile'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PrimaryResource } from '../material/PrimaryResource'
import { PlayerColor } from '../PlayerColor'
import { BuildFieldTileHelper } from './helper/BuildFieldTileHelper'
import { PlaceApprenticeHelper } from './helper/PlaceApprenticeHelper'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class CheckPassAndEmptyPlacesRule extends PlayerTurnRule {
  placeApprenticeHelper = new PlaceApprenticeHelper(this.game)
  buildFieldTileHelper = new BuildFieldTileHelper(this.game, true)

  onRuleStart(_move: RuleMove, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove[] {
    const playersWhoPassed = this.remind<PlayerColor[]>(MemoryType.PlayersWhoPassed)
    if (playersWhoPassed.length === this.game.players.length) {
      return [this.startSimultaneousRule(RuleId.PrepareNextRound)]
    }

    if (playersWhoPassed.includes(this.player)) {
      return [this.startRule(RuleId.CheckAndUseScrollTokens)]
    }

    const playerHaveApprenticeToPlace = this.placeApprenticeHelper.playerApprenticeToken.length > 0
    const cantPlaceApprentice = this.placeApprenticeHelper.possibleLocations.length === 0
    const cantBuildFieldTile = !this.checkIfPlayerCanBuildTile()
    if (playerHaveApprenticeToPlace && cantPlaceApprentice && cantBuildFieldTile) {
      return []
    }
    return [this.startRule(RuleId.DoActions)]
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(...this.buildFieldTileHelper.getPlayerMoves())
    return moves
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.buildFieldTileHelper.beforeItemMove(move, context))
    return moves
  }

  checkIfPlayerCanBuildTile() {
    return this.fieldTilesInRiver.some((tile) => {
      const cost = fieldData[tile.id].cost
      let canBuildThisTile = true
      cost.forEach((c) => {
        if (c.type === CostType.Crystal) {
          const playerCrystals = this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(this.player).getQuantity()
          if (playerCrystals < c.amount) {
            canBuildThisTile = false
          }
        }
        if (c.type === CostType.Resource) {
          if (this.getPlayerApprenticeTokenInField(c.resource).length === 0) {
            canBuildThisTile = false
          }
        }
      })
      return canBuildThisTile
    })
  }

  get fieldTilesInRiver() {
    return this.material(MaterialType.FieldTile).location(LocationType.FieldSpace).getItems<FieldTile>()
  }

  getPlayerApprenticeTokenInField(resource: PrimaryResource) {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
      .filter((item) => this.fieldEffectIsCorrectResource(item.location.parent ?? 0, resource))
      .rotation(rotation)
  }

  private fieldEffectIsCorrectResource(number: number, resource: PrimaryResource): boolean {
    const fieldId = this.material(MaterialType.FieldTile).index(number).getItem<FieldTile>()?.id
    if (fieldId) {
      const effect = fieldData[fieldId].activationEffect
      if (effect.type === EffectType.PrimaryResource && effect.resource === resource) {
        return true
      }
    }
    return false
  }
}
