import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { sum } from 'es-toolkit'
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
      moves.push(this.material(MaterialType.CrystalToken).createItem({ location: { type: LocationType.PlayerCrystalTokenStock, player }, quantity: 2 }))
      const apprentices = this.material(MaterialType.ApprenticeToken)
        .location((loc) => loc.type === LocationType.PlayerApprenticesSpace && loc.player === player)
        .getItem()!

      const nextApprentices = this.material(MaterialType.ApprenticeToken)
        .location(LocationType.PlayerApprenticesSpace)
        .locationId(this.remind(MemoryType.ActualRound) + 1)
        .player(player)

      if (nextApprentices.length) {
        moves.push(nextApprentices.moveItemsAtOnce({ type: LocationType.PlayerActualRoundApprenticesSpace, player, rotation: apprentices.location.rotation }))
      }

      moves.push(this.endPlayerTurn(player))
    })
    return moves
  }

  placeGroveOnEmptySpace() {
    return this.groveTileHelper.placeOneGroveOnEmptySpace()
  }

  persistPlayerRoundScore(player: PlayerColor) {
    const score = this.remind(MemoryType.Score, player)
    const previousScores = sum(this.remind(MemoryType.RoundScore, player) ?? [])
    this.memorize(MemoryType.RoundScore, (roundScore: number[] = []) => roundScore.concat(score - previousScores), player)
  }

  onRuleEnd() {
    const actualRound = this.remind<number>(MemoryType.ActualRound)

    for (const player of this.game.players) {
      this.persistPlayerRoundScore(player)
    }

    if (actualRound < 3) {
      this.memorize(MemoryType.ActualRound, (round: number = 1) => round + 1)
    }
    return []
  }
}
