import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { FieldTileHelper } from '../material/helper/FieldTileHelper'
import { PlaceApprenticeHelper } from './helper/PlaceApprenticeHelper'
import { TakeDivinityCardHelper } from './helper/TakeDivinityCardHelper'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class ActionsAfterBuildingFieldRule extends PlayerTurnRule {
  placeApprenticeHelper = new PlaceApprenticeHelper(this.game, this.remind(MemoryType.LastFieldBuilded))
  takeDivinityCardHelper = new TakeDivinityCardHelper(this.game)
  fieldTileHelper = new FieldTileHelper(this.game)

  onRuleStart(): MaterialMove[] {
    const canPlaceApprentice = this.placeApprenticeHelper.getPlayerMoves().length > 0
    const canTakeDivinityCard = this.fieldTileHelper.checkIfAtLeastOneFieldAroundIsOfSameColor(this.remind(MemoryType.LastFieldBuilded))
    if (!canPlaceApprentice && !canTakeDivinityCard) {
      return [this.startRule(RuleId.CheckAndUseScrollTokens)]
    }
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(...this.placeApprenticeHelper.getPlayerMoves())
    if (this.fieldTileHelper.checkIfAtLeastOneFieldAroundIsOfSameColor(this.remind(MemoryType.LastFieldBuilded))) {
      moves.push(...this.takeDivinityCardHelper.getPlayerMoves())
    }
    return moves
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.placeApprenticeHelper.beforeItemMove(move, context))
    moves.push(...this.takeDivinityCardHelper.beforeItemMove(move, context))
    return moves
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.takeDivinityCardHelper.afterItemMove(move, context))
    return moves
  }
}
