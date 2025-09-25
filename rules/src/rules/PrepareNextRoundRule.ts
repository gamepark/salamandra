import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { crystalTokens } from '../material/CrystalToken'
import { GroveTileHelper } from '../material/helper/GroveTileHelper'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class PrepareNextRoundRule extends SimultaneousRule {
  groveTileHelper = new GroveTileHelper(this.game)

  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.PlayersWhoPassed, [])
    const actualRound = this.remind<number>(MemoryType.ActualRound)
    if (actualRound === 3) {
      return [this.startRule(RuleId.CalculScores)]
    }
    this.memorize(MemoryType.ActualRound, actualRound + 1)
    const moves: MaterialMove[] = []
    moves.push(...this.placeGroveOrGetPlayersNextRoundMoves())
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.GroveTile)(move)) {
      return this.placeGroveOrGetPlayersNextRoundMoves()
    }
    return []
  }

  getActivePlayerLegalMoves(_player: number): MaterialMove[] {
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    return [this.startPlayerTurn(RuleId.CheckPassAndEmptyPlaces, this.nextPlayer)]
  }

  get nextPlayer(): PlayerColor {
    const smallestScore = this.material(MaterialType.ScoreMarker)
      .location(LocationType.ScorePiste)
      .minBy((item) => item.location.x!)
      .getItem()!.location.x!
    const markersInSmallestScore = this.material(MaterialType.ScoreMarker).location((loc) => loc.type === LocationType.ScorePiste && loc.x === smallestScore)
    return markersInSmallestScore.maxBy((item) => item.location.z ?? 0).getItem<PlayerColor>()!.id
  }

  placeGroveOrGetPlayersNextRoundMoves() {
    const placeGroveOnEmptySpace = this.placeGroveOnEmptySpace()
    if (placeGroveOnEmptySpace.length > 0) {
      return placeGroveOnEmptySpace.splice(0, 1)
    } else {
      return this.getPlayersNextRoundMoves()
    }
  }

  getPlayersNextRoundMoves() {
    const moves: MaterialMove[] = []
    this.activePlayers.forEach((player) => {
      moves.push(...this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(2, { type: LocationType.PlayerCrystalTokenStock, player: player }))
      moves.push(
        ...this.material(MaterialType.ApprenticeToken)
          .location((loc) => loc.type === LocationType.PlayerApprenticesSpace && loc.id === this.remind(MemoryType.ActualRound) && loc.player === player)
          .moveItems((item) => ({ type: LocationType.PlayerActualRoundApprenticesSpace, player, rotation: item.location.rotation }))
      )
      moves.push(this.endPlayerTurn(player))
    })
    return moves
  }

  placeGroveOnEmptySpace() {
    return this.groveTileHelper.placeOneGroveOnEmptySpace()
  }
}
