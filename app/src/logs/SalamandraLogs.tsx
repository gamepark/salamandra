import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCreateItemType, isCustomMoveType, isDeleteItemType, isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { ActivateApprenticeForCrystalLog } from './entries/ActivateApprenticeForCrystalLog.tsx'
import { ActivateFieldLog } from './entries/ActivateFieldLog.tsx'
import { BuildTileLog } from './entries/BuildTileLog.tsx'
import { ExchangeResourceLog } from './entries/ExchangeResourceLogLog.tsx'
import { PassLog } from './entries/PassLog.tsx'
import { PlaceApprenticeLog } from './entries/PlaceApprenticeLog.tsx'
import { PlaceOnSpellbookLog } from './entries/PlaceOnSpellbookLog.tsx'
import { ScoreLog } from './entries/ScoreLog.tsx'
import { SpendCrystalLog } from './entries/SpendCrystalLog.tsx'
import { TakeDivinityLog } from './entries/TakeDivinityLog.tsx'
import { TakeGroveLog } from './entries/TakeGroveLog.tsx'
import { TakeSalamandraLog } from './entries/TakeSalamandraLog.tsx'
import { WinCrystalLog } from './entries/WinCrystalLog.tsx'
import { WinScrollLog } from './entries/WinScrollLog.tsx'

export class SalamandraLogs implements LogDescription<MaterialMove> {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext): MovePlayedLogDescription | undefined {
    const game = context.game
    if (isMoveItemType(MaterialType.ApprenticeToken)(move)) {
      const rules = new SalamandraRules(game)
      const item = rules.material(MaterialType.ApprenticeToken).getItem(move.itemIndex)
      if (item.location.type === LocationType.PlayerActualRoundApprenticesSpace && move.location.type === LocationType.FieldApprenticeSpace) {
        return {
          Component: PlaceApprenticeLog,
          player: item.id
        }
      }
    }

    if (isCustomMoveType(CustomMoveType.ActivateApprenticeForGainCrystal)(move)) {
      return {
        Component: ActivateApprenticeForCrystalLog,
        player: move.data.player
      }
    }

    if (
      isMoveItemType(MaterialType.DivinityCard)(move) &&
      (move.location.type === LocationType.PlayerBearCards || move.location.type === LocationType.PlayerEagleCards)
    ) {
      return {
        Component: TakeDivinityLog,
        player: move.location.player
      }
    }

    if (
      isMoveItemType(MaterialType.SalamanderCard)(move) &&
      (move.location.type === LocationType.PlayerWhiteSalamanderCards || move.location.type === LocationType.PlayerBlackSalamanderCards)
    ) {
      return {
        Component: TakeSalamandraLog,
        player: move.location.player
      }
    }

    if (isMoveItemType(MaterialType.GroveTile)(move) && move.location.type === LocationType.PlayerGroveTiles) {
      return {
        Component: TakeGroveLog,
        player: context.action.playerId
      }
    }

    if (isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)(move)) {
      return {
        Component: ActivateFieldLog,
        player: context.action.playerId
      }
    }

    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && move.location.type === LocationType.SpellBookApprenticeSpace) {
      return {
        Component: PlaceOnSpellbookLog,
        player: context.action.playerId
      }
    }

    if (isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)) {
      return {
        Component: ExchangeResourceLog,
        player: context.action.playerId
      }
    }

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return {
        Component: PassLog,
        player: context.action.playerId
      }
    }

    if (isCustomMoveType(CustomMoveType.Score)(move)) {
      return {
        Component: ScoreLog,
        depth: 1
      }
    }

    if (isCreateItemType(MaterialType.ScrollToken)(move)) {
      return {
        Component: WinScrollLog,
        depth: 1
      }
    }

    if (isCreateItemType(MaterialType.CrystalToken)(move)) {
      return {
        Component: WinCrystalLog,
        depth: 1
      }
    }

    if (isDeleteItemType(MaterialType.CrystalToken)(move)) {
      return {
        Component: SpendCrystalLog,
        depth: 1
      }
    }

    if (isMoveItemType(MaterialType.FieldTile)(move) && move.location.type === LocationType.GameLayout) {
      return {
        Component: BuildTileLog,
        player: context.action.playerId
      }
    }

    return
  }
}
