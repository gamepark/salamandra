import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { groupBy, orderBy, values } from 'lodash'
import { DivinityType } from '../../material/Bonus'
import { DivinityCard, divinityCardPoints } from '../../material/DivinityCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SalamanderCard, salamanderCardPoints } from '../../material/SalamanderCard'
import { SpellBookCard, spellBookData } from '../../material/SpellBookCard'
import { PlayerColor } from '../../PlayerColor'

const eagleMajorityPoints = [6, 3]
const bearMajorityPoints = [8, 4]
const salamanderMajorityPoints = [12, 6]

export class ScoreHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: PlayerColor
  ) {
    super(game)
  }

  getPlayersDivinityVictoryPoints(getScore: (p: PlayerColor) => number): { player: PlayerColor; score: number }[][] {
    const scores = this.game.players.map((p) => ({
      player: p,
      score: getScore(p)
    }))

    const orderedScores = orderBy(scores, (s) => s.score, 'desc')
    const groupedByScore = groupBy(orderedScores, (s) => s.score)
    return values(groupedByScore)
  }

  getMyScore(allScore: { player: PlayerColor; score: number }[][], majorities: number[]) {
    const firstPlace = allScore[0]
    if (firstPlace.some((s) => s.player === this.player)) {
      if (firstPlace.length > 1) {
        return Math.floor((majorities[0] + majorities[1]) / firstPlace.length)
      }

      return majorities[0]
    } else {
      const secondPlace = allScore[1] ?? []
      if (secondPlace.length && secondPlace.some((s) => s.player === this.player)) {
        return Math.floor(majorities[1] / secondPlace.length)
      }
    }

    return 0
  }

  get eagleScore() {
    return this.getMyScore(
      this.getPlayersDivinityVictoryPoints((p) => this.getDivinityVictoryPoints(p, DivinityType.Eagle)),
      eagleMajorityPoints
    )
  }

  get bearScore() {
    return this.getMyScore(
      this.getPlayersDivinityVictoryPoints((p) => this.getDivinityVictoryPoints(p, DivinityType.Bear)),
      bearMajorityPoints
    )
  }

  get salamandraScore() {
    return this.getMyScore(
      this.getPlayersDivinityVictoryPoints((p) => this.getPlayerSalamanderScore(p)),
      salamanderMajorityPoints
    )
  }

  get endOfGameScore() {
    return this.eagleScore + this.bearScore + this.salamandraScore + this.scrollTokenScore + this.spellBookScore
  }

  getDivinityVictoryPoints(player: PlayerColor, type: DivinityType) {
    return this.material(MaterialType.DivinityCard)
      .player(player)
      .id(({ back }: { back: DivinityType }) => back === type)
      .getItems<{ front: DivinityCard; back: DivinityType }>()
      .map((it) => divinityCardPoints[it.id.front])
      .reduce((a, b) => a + b, 0)
  }

  getPlayerBearScore(player: PlayerColor) {
    return this.material(MaterialType.DivinityCard)
      .location(LocationType.PlayerBearCards)
      .player(player)
      .getItems()
      .map((it) => divinityCardPoints[it.id as DivinityCard])
      .reduce((a, b) => a + b, 0)
  }

  getPlayerSalamanderScore(player: PlayerColor) {
    return this.material(MaterialType.SalamanderCard)
      .location(LocationType.PlayerBlackSalamanderCards)
      .player(player)
      .getItems()
      .map((it) => salamanderCardPoints[it.id as SalamanderCard])
      .reduce((a, b) => a + b, 0)
  }

  get scrollTokenScore() {
    return this.material(MaterialType.ScrollToken).location(LocationType.PlayerScrollTokenStock).player(this.player).getItems().length
  }

  get spellBookScore() {
    const spellBooksWithPlayerApprenticeTokens = this.material(MaterialType.ApprenticeToken)
      .location(LocationType.SpellBookApprenticeSpace)
      .id(this.player)
      .getItems()
      .map((item) => item.location)

    let totalScore = 0

    spellBooksWithPlayerApprenticeTokens.forEach((apprenticeLocation) => {
      if (apprenticeLocation.parent !== undefined) {
        const id = this.material(MaterialType.SpellBookCard).index(apprenticeLocation.parent).getItem()?.id as SpellBookCard

        const x = apprenticeLocation.x ?? 0
        const data = spellBookData[id]

        totalScore += data.points[x] * data.getMultiple(this.game, this.player)
      }
    })

    return totalScore
  }
}
