import { CustomMove, isCustomMoveType, isMoveItem, ItemMove, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { EffectType } from '../../material/Effect'
import { fieldData, FieldTile, FieldType } from '../../material/FieldTile'
import { FieldTileHelper } from '../../material/helper/FieldTileHelper'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMove'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'

export class ActivateApprenticeHelper extends PlayerTurnRule {
  fieldTileHelper = new FieldTileHelper(this.game)

  constructor(
    game: MaterialGame,
    readonly ignoreResourcesCheck = false
  ) {
    super(game)
  }

  activateRemainingApprentice(): MaterialMove[] {
    if (!this.ignoreResourcesCheck) return []
    const playerApprenticeTokenInField = this.playerApprenticeTokenInField
    if (playerApprenticeTokenInField.length === 0) return []
    return playerApprenticeTokenInField
      .getIndexes()
      .map((index) => this.customMove(CustomMoveType.ActivateApprenticeForGainCrystal, { itemIndex: index, player: this.player }))
  }

  getPlayerMoves() {
    const playerApprenticeTokenInField = this.playerApprenticeTokenInField
    if (playerApprenticeTokenInField.length === 0) return []
    return playerApprenticeTokenInField.getIndexes().map((index) => this.customMove(CustomMoveType.ActivateApprenticeForFieldEffect, index))
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)(move)) return []
    const moves: MaterialMove[] = []
    const apprentice = this.material(MaterialType.ApprenticeToken).index(move.data as number)
    moves.push(apprentice.rotateItem((item) => !item.location.rotation))
    if (this.ignoreResourcesCheck) {
      moves.push(...this.onCustomMoveOnPassAction(move))
    } else {
      moves.push(...this.onCustomMoveOnStepAction(move))
    }

    return moves
  }

  onCustomMoveOnStepAction(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)(move)) return []
    const apprentice = this.material(MaterialType.ApprenticeToken).getItem(move.data as number)
    const moves: MaterialMove[] = []
    moves.push(...this.fieldTileHelper.getActivationEffet(apprentice.location))
    moves.push(...this.fieldTileHelper.payActivation(apprentice.location.parent ?? 0))
    const fieldId = this.material(MaterialType.FieldTile).index(apprentice.location.parent).getItem<FieldTile>()?.id
    if (fieldId) {
      if (fieldData[fieldId].type !== FieldType.Cauldron) {
        this.memorize<RuleId[]>(MemoryType.NextRules, (old?: RuleId[]) => [...(old ?? []), RuleId.DoActions])
      }
    }
    moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    return moves
  }

  onCustomMoveOnPassAction(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)(move)) return []
    const apprentice = this.material(MaterialType.ApprenticeToken).getItem(move.data as number)
    const moves: MaterialMove[] = []
    const field = this.material(MaterialType.FieldTile).index(apprentice.location.parent).getItem<FieldTile>()?.id
    if (field) {
      const effect = fieldData[field].activationEffect
      moves.push(
        this.material(MaterialType.CrystalToken)
          .location(LocationType.PlayerCrystalTokenStock)
          .player(this.player)
          .deleteItem(effect.type === EffectType.Crystal ? effect.amount : 1)
      )
    }
    return moves
  }

  rotateApprentice() {
    return this.playerApprenticeTokenInField.rotateItems((item) => !item.location.rotation)
  }

  get playerApprenticeTokenInField() {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter(
        (item) => item.id !== undefined && item.id === this.player && (this.ignoreResourcesCheck || this.fieldTileHelper.canActivate(item.location.parent ?? 0))
      )
      .rotation(rotation)
  }

  isActivateApprenticeMove(move: ItemMove): boolean {
    if (!isMoveItem(move)) return false
    const oldRotation = this.material(MaterialType.ApprenticeToken).getItem(move.itemIndex).location.rotation
    return oldRotation !== move.location.rotation
  }
}
