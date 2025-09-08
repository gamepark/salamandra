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
    return [this.startPlayerTurn(RuleId.CheckPassAndEmptyPlaces, this.getNextPlayer())]
  }

  getNextPlayer(): PlayerColor {
    const smallestId =
      this.material(MaterialType.ScoreMarker)
        .location(LocationType.ScorePiste)
        .minBy((item) => item.location.id as number)
        .getItem()?.location.id ?? 0
    const markersInSmallestScore = this.material(MaterialType.ScoreMarker).location((loc) => loc.type === LocationType.ScorePiste && loc.id === smallestId)
    return markersInSmallestScore.maxBy((item) => item.location.x ?? 0).getItem()?.id as PlayerColor
  }

  placeGroveOrGetPlayersNextRoundMoves() {
    if (this.placeGroveOnEmptySpace().length > 0) {
      return this.placeGroveOnEmptySpace().splice(0, 1)
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
    const moves: MaterialMove[] = []
    if (this.grovesInStack.length) {
      this.fieldsInGame.forEach((field) => {
        moves.push(...this.groveTileHelper.getEmptyGroveLocations(field.location).map((loc) => this.grovesInStack.moveItem(loc)))
      })
    }
    return moves
  }

  get fieldsInGame() {
    return this.material(MaterialType.FieldTile).location(LocationType.GameLayout).getItems()
  }

  get grovesInStack() {
    return this.material(MaterialType.GroveTile)
      .location(LocationType.GroveStack)
      .maxBy((item) => item.location.x ?? 0)
  }
}
