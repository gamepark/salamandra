import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { FieldTileHelper } from '../material/helper/FieldTileHelper'
import { PlaceApprenticeHelper } from './helper/PlaceApprenticeHelper'
import { TakeDivinityCardHelper } from './helper/TakeDivinityCardHelper'
import { MemoryType } from './MemoryType'

export class ActionsAfterBuildingFieldRule extends PlayerTurnRule {
  placeApprenticeHelper = new PlaceApprenticeHelper(this.game, this.nextPlayer, this.remind(MemoryType.LastFieldBuilded))
  takeDivinityCardHelper = new TakeDivinityCardHelper(this.game, this.nextPlayer)
  fieldTileHelper = new FieldTileHelper(this.game)

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
}
