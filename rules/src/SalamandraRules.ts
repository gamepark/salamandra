import {
  CompetitiveScore,
  CustomMove,
  FillGapStrategy,
  hideItemId,
  isCustomMoveType,
  ItemMove,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  StackingStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { BearDivinityCardHelper } from './material/helper/BearDivinityCardHelper'
import { EagleDivinityCardHelper } from './material/helper/EagleDivinityCardHelper'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Potion } from './material/Potion'
import { PrimaryResource } from './material/PrimaryResource'
import { PlayerColor } from './PlayerColor'
import { ActionsAfterBuildingFieldRule } from './rules/ActionsAfterBuildingFieldRule'
import { ActionsOnPassRule } from './rules/ActionsOnPassRule'
import { CalculScoresRule } from './rules/CalculScoresRule'
import { CheckAndUseScrollTokensRule } from './rules/CheckAndUseScrollTokensRule'
import { CheckPassAndEmptyPlacesRule } from './rules/CheckPassAndEmptyPlacesRule'
import { ChooseApprenticeToActivateRule } from './rules/ChooseApprenticeToActivateRule'
import { CustomMoveType } from './rules/CustomMove'
import { DoActionsRule } from './rules/DoActionsRule'
import { ActivateApprenticeHelper } from './rules/helper/ActivateApprenticeHelper'
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
  implements
    TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>,
    CompetitiveScore
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
    [MaterialType.SalamanderCard]: {
      [LocationType.WhiteSalamanderStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerWhiteSalamanderCards]: new PositiveSequenceStrategy('y'),
      [LocationType.BlackSalamanderStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerBlackSalamanderCards]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.GroveTile]: {
      [LocationType.GroveStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerGroveTiles]: new PositiveSequenceStrategy()
    },
    [MaterialType.DivinityCard]: {
      [LocationType.BearDivinityStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerBearCards]: new PositiveSequenceStrategy('y'),
      [LocationType.EagleDivinityStack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerEagleCards]: new PositiveSequenceStrategy('y')
    },
    [MaterialType.ApprenticeToken]: {
      [LocationType.PlayerApprenticesSpace]: new FillGapStrategy(),
      [LocationType.PlayerActualRoundApprenticesSpace]: new FillGapStrategy()
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
      [LocationType.ScorePiste]: new StackingStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.GroveTile]: {
      [LocationType.GroveStack]: hideItemId
    },
    [MaterialType.FieldTile]: {
      [LocationType.FieldStack]: hideItemId
    },
    [MaterialType.SalamanderCard]: {
      [LocationType.BlackSalamanderStack]: hideItemIdIfNotRotated,
      [LocationType.WhiteSalamanderStack]: hideItemIdIfNotRotated
    },
    [MaterialType.DivinityCard]: {
      [LocationType.EagleDivinityStack]: hideItemIdIfNotRotated,
      [LocationType.BearDivinityStack]: hideItemIdIfNotRotated
    }
  }

  getLegalMoves(player: PlayerColor): MaterialMove[] {
    const legalMoves = super.getLegalMoves(player)
    const apprenticeTokenInField = this.getPlayerApprenticeTokenInField(player)
    if (this.isTurnToPlay(player)) {
      legalMoves.push(...new EagleDivinityCardHelper(this.game).getLegalMoves())
      legalMoves.push(...new BearDivinityCardHelper(this.game).getLegalMoves())

      if ((this.game.rule?.id === RuleId.DoActions || this.game.rule?.id === RuleId.CheckAndUseScrollTokens) && apprenticeTokenInField.length > 0) {
        if (!apprenticeTokenInField.length) return legalMoves
        legalMoves.push(this.customMove(CustomMoveType.ActivateApprenticeForGainCrystal, { player, count: 1 }))
        legalMoves.push(...new ActivateApprenticeHelper(this.game).bestCrystalGainForApprentices)
      }
    }
    return legalMoves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = super.afterItemMove(move)
    moves.push(...new EagleDivinityCardHelper(this.game).afterItemMove(move))
    moves.push(...new BearDivinityCardHelper(this.game).afterItemMove(move))
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = super.beforeItemMove(move)
    moves.push(...new EagleDivinityCardHelper(this.game).beforeItemMove(move))
    moves.push(...new BearDivinityCardHelper(this.game).beforeItemMove(move))
    return moves
  }

  protected onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = super.onCustomMove(move)

    if (isCustomMoveType(CustomMoveType.ChangeView)) {
      this.memorize(MemoryType.View, move.data as PlayerColor)
    }

    switch (move.type) {
      case CustomMoveType.Score:
        moves.push(this.addScore(move))
        break
      case CustomMoveType.PayCrystalsToGainResource:
        moves.push(...this.payCristalsToGainResource(move))
        break
      case CustomMoveType.PayCrystalsToGainPotion:
        moves.push(...this.payCristalsToGainPotion(move))
        break
      case CustomMoveType.ActivateApprenticeForGainCrystal:
        moves.push(...this.activateApprenticeForCrystal(move))
        break
    }
    return moves
  }

  private activateApprenticeForCrystal(move: CustomMove) {
    const moves: MaterialMove[] = []
    const { player, itemIndex, count = 1 } = move.data as { player: PlayerColor; itemIndex?: number; count?: number }
    if (itemIndex !== undefined) {
      const apprenticeToken = this.material(MaterialType.ApprenticeToken).index(itemIndex)
      moves.push(...apprenticeToken.rotateItems((item) => !item.location.rotation))
      moves.push(this.material(MaterialType.CrystalToken).createItem({ location: { type: LocationType.PlayerCrystalTokenStock, player }, quantity: count }))
    } else {
      moves.push(this.material(MaterialType.CrystalToken).createItem({ location: { type: LocationType.PlayerCrystalTokenStock, player }, quantity: count }))
      this.memorize(MemoryType.NextRules, [RuleId.ChooseApprenticeToActivate, this.game.rule?.id])
      moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    }

    return moves
  }

  private addScore(move: CustomMove): MaterialMove {
    const { player, score } = move.data as { player: PlayerColor; score: number }
    this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
    const newScore = this.getMemory(player).remind(MemoryType.Score)
    return this.material(MaterialType.ScoreMarker)
      .location(LocationType.ScorePiste)
      .id(player)
      .moveItem((item) => ({ ...item.location, x: newScore }))
  }

  payCristalsToGainResource(move: CustomMove): MaterialMove[] {
    const { player, resource, amount } = move.data as { player: PlayerColor; resource: PrimaryResource; amount: number }
    const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, player)
    playerResources[resource] += 1
    return this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(player).deleteItems(amount)
  }

  payCristalsToGainPotion(move: CustomMove): MaterialMove[] {
    const { player, potion, amount } = move.data as { player: PlayerColor; potion: Potion; amount: number }
    const playerPtions = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, player)
    playerPtions[potion] += 1
    return this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(player).deleteItems(amount)
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

  getScore(playerId: PlayerColor): number {
    return this.getMemory(playerId).remind(MemoryType.Score)
  }
}

const hideItemIdIfNotRotated = (item: MaterialItem) => (!item.location.rotation ? ['id.front'] : [])
