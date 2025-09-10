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
  activateApprenticeHelper = new ActivateApprenticeHelper(this.game, true)
  takeGroveTileHelper = new TakeGroveTileHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.memorize<PlayerColor[]>(MemoryType.PlayersWhoPassed, (old: PlayerColor[]) => [...old, this.player])
    return this.activateApprenticeHelper.activateRemainingApprentice()
  }

  getPlayerMoves() {
    return [...this.takeGroveTileHelper.getPlayerMoves(), this.customMove(CustomMoveType.Pass)]
  }

  afterItemMove(move: ItemMove, context?: PlayMoveContext): MaterialMove[] {
    return this.takeGroveTileHelper.afterItemMove(move, context)
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves: MaterialMove[] = this.activateApprenticeHelper.onCustomMove(move)
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      moves.push(
        this.material(MaterialType.DruidTile)
          .location(LocationType.PlayerDruidSpace)
          .player(this.player)
          .rotateItem((item) => !item.location.rotation),
        this.startRule(RuleId.CheckAndUseScrollTokens)
      )
    }
    return moves
  }
}
