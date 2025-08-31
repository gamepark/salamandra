import { isMoveItem, isMoveItemType, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { crystalTokens } from '../../material/CrystalToken'
import { EffectType } from '../../material/Effect'
import { fieldData, FieldTile, FieldType } from '../../material/FieldTile'
import { FieldTileHelper } from '../../material/helper/FieldTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'

export class ActivateApprenticeHelper extends PlayerTurnRule {
  isPassAction: boolean
  fieldTileHelper = new FieldTileHelper(this.game)

  constructor(game: MaterialGame, isPassAction = false) {
    super(game)
    this.isPassAction = isPassAction
  }

  onRuleStart(): MaterialMove[] {
    if (!this.isPassAction) return []
    if (this.playerApprenticeTokenInField.length === 0) return []
    return this.playerApprenticeTokenInField.moveItems((item) => ({ ...item.location, rotation: !item.location.rotation }))
  }

  getPlayerMoves() {
    if (this.playerApprenticeTokenInField.length === 0) return []
    return this.playerApprenticeTokenInField.moveItems((item) => ({ ...item.location, rotation: !item.location.rotation }))
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && this.isActivateApprenticeMove(move)) {
      if (this.isPassAction) return this.beforeItemMoveOnPassAction(move)
      else return this.beforeItemMoveOnStepAction(move)
    }
    return []
  }

  beforeItemMoveOnStepAction(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.ApprenticeToken)(move)) return []
    const moves: MaterialMove[] = []
    moves.push(...this.fieldTileHelper.getActivationEffet(move.location))
    moves.push(...this.fieldTileHelper.payActivation(move.location.parent ?? 0))
    const fieldId = this.material(MaterialType.FieldTile).index(move.location.parent).getItem()?.id
    if (fieldId) {
      if (fieldData[fieldId as FieldTile].type !== FieldType.Cauldron) {
        this.memorize<RuleId[]>(MemoryType.NextRules, (old?: RuleId[]) => [...(old ?? []), RuleId.DoActions])
      }
    }
    moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    return moves
  }

  beforeItemMoveOnPassAction(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.ApprenticeToken)(move)) return []
    const moves: MaterialMove[] = []
    const field = this.material(MaterialType.FieldTile).index(move.location.parent).getItem()?.id
    if (field) {
      const effect = fieldData[field as FieldTile].activationEffect
      moves.push(
        ...this.material(MaterialType.CrystalToken)
          .money(crystalTokens)
          .addMoney(effect.type === EffectType.Crystal ? effect.amount : 1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
      )
    }
    return moves
  }

  get playerApprenticeTokenInField() {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
      .filter((item) => this.isPassAction || this.fieldTileHelper.canActivate(item.location.parent ?? 0))
      .rotation(rotation)
  }

  isActivateApprenticeMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldLocationType = this.material(MaterialType.ApprenticeToken).getItem(move.itemIndex).location.type
    return oldLocationType === LocationType.FieldApprenticeSpace
  }
}
