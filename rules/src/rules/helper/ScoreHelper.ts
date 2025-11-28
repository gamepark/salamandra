import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { partition, sum } from 'es-toolkit'
import { orderBy } from 'es-toolkit/compat'
import { DivinityCard, divinityCardPoints, DivinityType } from '../../material/DivinityCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { salamanderCardPoints, SalamanderId } from '../../material/SalamanderCard'
import { SpellBookCard, spellBookData } from '../../material/SpellBookCard'
import { PlayerColor } from '../../PlayerColor'

const eagleMajorityPoints = [6, 3]
const bearMajorityPoints = [8, 4]
const salamanderMajorityPoints = [12, 6]

type ScoreType = { player: PlayerColor; score: number }

export class ScoreHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: PlayerColor
  ) {
    super(game)
  }

  getPlayersDivinityVictoryPoints(getScore: (p: PlayerColor) => number): ScoreType[][] {
    const scores: ScoreType[] = this.game.players
      .map((p) => ({
        player: p,
        score: getScore(p)
      }))
      .filter((s) => s.score > 0)

    const orderedScores = orderBy(scores, (s: ScoreType) => s.score, 'desc')

    const groupedByScore = partition(orderedScores, (s: ScoreType) => s.score === orderedScores[0].score)
    return Object.values(groupedByScore)
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
    return sum(
      this.material(MaterialType.DivinityCard)
        .player(player)
        .id(({ back }: { back: DivinityType }) => back === type)
        .getItems<{ front: DivinityCard; back: DivinityType }>()
        .map((it) => divinityCardPoints[it.id.front])
    )
  }

  getPlayerSalamanderScore(player: PlayerColor) {
    return sum(
      this.material(MaterialType.SalamanderCard)
        .player(player)
        .getItems<SalamanderId>()
        .map((it) => salamanderCardPoints[it.id.front!])
    )
  }

  get scrollTokenScore() {
    return this.material(MaterialType.ScrollToken).location(LocationType.PlayerScrollTokenStock).player(this.player).getQuantity()
  }

  get spellBookScore() {
    let totalScore = 0

    const spellBooks = this.spellBooks
    for (const spellBookIndex of spellBooks.getIndexes()) {
      const spellBookItem = spellBooks.getItem(spellBookIndex)
      totalScore += this.getSpellBookScore(spellBookItem.id)
    }

    return totalScore
  }

  get spellBooks() {
    return this.material(MaterialType.SpellBookCard)
  }

  getSpellBookScore(spellBook: SpellBookCard) {
    const spellBooks = this.spellBooks
    const index = spellBooks.id(+spellBook).getIndex()
    const apprentice = this.material(MaterialType.ApprenticeToken).location(LocationType.SpellBookApprenticeSpace).id(this.player).parent(index)

    if (!apprentice.length) return 0
    const item = apprentice.getItem()!

    const x = item.location.x ?? 0
    const data = spellBookData[spellBook]

    return data.points[x] * data.getMultiple(this.game, this.player)
  }
}
