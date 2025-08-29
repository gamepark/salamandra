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
import { crystalTokens } from './material/CrystalToken'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PrimaryResource, primaryResources } from './material/PrimaryResource'
import { PlayerColor } from './PlayerColor'
import { ActionsAfterBuildingFieldRule } from './rules/ActionsAfterBuildingFieldRule'
import { ActionsOnPassRule } from './rules/ActionsOnPassRule'
import { CalculScoresRule } from './rules/CalculScoresRule'
import { CheckAndUseScrollTokensRule } from './rules/CheckAndUseScrollTokensRule'
import { CheckPassAndEmptyPlacesRule } from './rules/CheckPassAndEmptyPlacesRule'
import { ChooseApprenticeToActivateRule } from './rules/ChooseApprenticeToActivateRule'
import { CustomMoveType } from './rules/CustomMove'
import { DoActionsRule } from './rules/DoActionsRule'
import { NextRuleHelper } from './rules/helper/NextRuleHelper'
import { MemoryType } from './rules/MemoryType'
import { PrepareNextRoundRule } from './rules/PrepareNextRoundRule'
import { ReactivateApprenticeRule } from './rules/ReactivateApprenticeRule'
import { RuleId } from './rules/RuleId'
import { TakeGroveTileRule } from './rules/TakeGroveTileRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class SalamandraRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  rules = {
    [RuleId.DoActions]: DoActionsRule,
    [RuleId.ActionsAfterBuildingField]: ActionsAfterBuildingFieldRule,
    [RuleId.ActionsOnPass]: ActionsOnPassRule,
    [RuleId.CheckPassAndEmptyPlaces]: CheckPassAndEmptyPlacesRule,
    [RuleId.PrepareNextRound]: PrepareNextRoundRule,
    [RuleId.CalculScores]: CalculScoresRule,
    [RuleId.ChooseApprenticeToActivate]: ChooseApprenticeToActivateRule,
    [RuleId.ReactivateApprentice]: ReactivateApprenticeRule,
    [RuleId.TakeGroveTile]: TakeGroveTileRule,
    [RuleId.CheckAndUseScrollTokens]: CheckAndUseScrollTokensRule
  }

  locationsStrategies = {
    [MaterialType.WhiteSalamanderCard]: {
      [LocationType.WhiteSalamanderStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerWhiteSalamanderCards]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.ScrollToken]: {
      [LocationType.PlayerScrollTokenStock]: new PositiveSequenceStrategy()
    },
    [MaterialType.BlackSalamanderCard]: {
      [LocationType.BlackSalamanderStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerBlackSalamanderCards]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.GroveTile]: {
      [LocationType.GroveStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerGroveTiles]: new PositiveSequenceStrategy()
    },
    [MaterialType.BearDivinityCard]: {
      [LocationType.BearDivinityStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerBearCards]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.EagleDivinityCard]: {
      [LocationType.EagleDivinityStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerEagleCards]: new PositiveSequenceStrategy('y')
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

  getLegalMoves(player: PlayerColor): MaterialMove[] {
    const legalMoves = super.getLegalMoves(player)
    const crystals = this.material(MaterialType.CrystalToken).player(player)
    if (this.isTurnToPlay(player)) {
      if (crystals.getQuantity() >= 4) {
        primaryResources.forEach((resource) => {
          legalMoves.push(this.customMove(CustomMoveType.PayCristalsToGainResource, { player, resource }))
        })
      }
      if (this.getPlayerApprenticeTokenInField(player).length > 0) {
        legalMoves.push(this.customMove(CustomMoveType.ActivateApprenticeForGainCrystal, { player }))
      }
    }
    return legalMoves
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
          .moveItem((item) => ({ ...item.location, id: newScore % 100, x: undefined }))
      )
    }
    if (move.type === CustomMoveType.PayCristalsToGainResource) {
      const { player, resource } = move.data as { player: PlayerColor; resource: PrimaryResource }
      moves.push(...this.material(MaterialType.CrystalToken).money(crystalTokens).removeMoney(4, { type: LocationType.PlayerCrystalTokenStock, player }))
      const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, player)
      playerResources[resource] += 1
    }
    if (move.type === CustomMoveType.ActivateApprenticeForGainCrystal) {
      const { player } = move.data as { player: PlayerColor }
      moves.push(...this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player }))
      this.memorize(MemoryType.NextRules, [RuleId.ChooseApprenticeToActivate, this.game.rule?.id])
      moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    }
    return moves
  }

  getPlayerApprenticeTokenInField(player: PlayerColor) {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === player)
      .rotation(rotation)
  }

  giveTime(): number {
    return 60
  }
}
