import {
  CustomMove,
  FillGapStrategy,
  hideItemId,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { CustomMoveType } from './rules/CustomMove'
import { DoActionsRule } from './rules/DoActionsRule'
import { MemoryType } from './rules/MemoryType'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class SalamandraRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.DoActions]: DoActionsRule
  }

  locationsStrategies = {
    [MaterialType.WhiteSalamanderCard]: {
      [LocationType.WhiteSalamanderStack]: new PositiveSequenceStrategy()
    },
    [MaterialType.BlackSalamanderCard]: {
      [LocationType.BlackSalamanderStack]: new PositiveSequenceStrategy()
    },
    [MaterialType.GroveTile]: {
      [LocationType.GroveStack]: new PositiveSequenceStrategy()
    },
    [MaterialType.BearDivinityCard]: {
      [LocationType.BearDivinityStack]: new PositiveSequenceStrategy()
    },
    [MaterialType.EagleDivinityCard]: {
      [LocationType.EagleDivinityStack]: new PositiveSequenceStrategy()
    },
    [MaterialType.ApprenticeToken]: {
      [LocationType.PlayerApprenticesSpace]: new PositiveSequenceStrategy(),
      [LocationType.PlayerActualRoundApprenticesSpace]: new PositiveSequenceStrategy()
    },
    [MaterialType.FieldTile]: {
      [LocationType.FieldStack]: new PositiveSequenceStrategy(),
      [LocationType.FieldSpace]: new FillGapStrategy()
    },
    [MaterialType.SpellBookCard]: {
      [LocationType.SpellBookSpace]: new FillGapStrategy()
    },
    [MaterialType.ScoreMarker]: {
      [LocationType.Score100MarkerIdlePlace]: new FillGapStrategy(),
      [LocationType.ScorePiste]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.GroveTile]: {
      [LocationType.GroveStack]: hideItemId
    },
    [MaterialType.FieldTile]: {
      [LocationType.FieldStack]: hideItemId
    }
  }

  protected onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (move.type === CustomMoveType.Score) {
      const { player, score } = move.data as { player: PlayerColor; score: number }
      this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
      const newScore = this.getMemory(player).remind(MemoryType.Score)
      moves.push(
        this.material(MaterialType.ScoreMarker)
          .location(LocationType.ScorePiste)
          .id(player)
          .moveItem((item) => ({ ...item.location, id: newScore % 100 }))
      )
    }
    return moves
  }

  giveTime(): number {
    return 60
  }
}
