import { CustomMove, isCustomMoveType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { CustomMoveType } from './CustomMove'
import { ActivateApprenticeHelper } from './helper/ActivateApprenticeHelper'
import { TakeGroveTileHelper } from './helper/TakeGroveTileHelper'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class ActionsOnPassRule extends PlayerTurnRule {
  activateApprenticeHelper = new ActivateApprenticeHelper(this.game, this.nextPlayer, true)
  takeGroveTileHelper = new TakeGroveTileHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.PlayersWhoPassed, (old?: PlayerColor[]) => (old ? [...old, this.player] : [this.player]))
    return this.activateApprenticeHelper.onRuleStart()
  }

  getPlayerMoves() {
    return [...this.takeGroveTileHelper.getPlayerMoves(), this.customMove(CustomMoveType.Pass)]
  }

  beforeItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.activateApprenticeHelper.beforeItemMove(move, context))
    return moves
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.takeGroveTileHelper.afterItemMove(move, context)
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [
        this.material(MaterialType.DruidTile)
          .location(LocationType.PlayerDruidSpace)
          .player(this.player)
          .moveItem((item) => ({ ...item.location, rotation: !item.location.rotation })),
        this.startPlayerTurn(RuleId.DoActions, this.nextPlayer)
      ]
    }
    return []
  }
}
