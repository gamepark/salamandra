import { MaterialRulesPart } from '@gamepark/rules-api'
import { BearDivinityCard, bearDivinityCardPoints } from '../../material/BearDivinityCard'
import { BlackSalamanderCard, blackSalamanderCardPoints } from '../../material/BlackSalamanderCard'
import { EagleDivinityCard, eagleDivinityCardPoints } from '../../material/EagleDivinityCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpellBookCard, spellBookData } from '../../material/SpellBookCard'
import { WhiteSalamanderCard, whiteSalamanderCardPoints } from '../../material/WhiteSalamanderCard'
import { PlayerColor } from '../../PlayerColor'
import { MemoryType } from '../MemoryType'

const eagleMajorityPoints = [6, 3]
const bearMajorityPoints = [8, 4]
const salamanderMajorityPoints = [12, 6]

export class ScoreHelper extends MaterialRulesPart {
  setTotalScore() {
    this.setScoreForEagleMajority()
    this.setScoreForBearMajority()
    this.setScoreForSalamanderMajority()
    this.setScoreForScrollTokens()
    this.setScoreForSpellBooks()
  }

  setScoreForEagleMajority() {
    const playersEagleScores = this.game.players
      .map((player) => {
        return { player, eagleScore: this.getPlayerEagleScore(player) }
      })
      .filter((player) => player.eagleScore > 0)
      .sort((a, b) => b.eagleScore - a.eagleScore)

    if (playersEagleScores.length > 0) {
      const highestScore = playersEagleScores[0].eagleScore
      const playersWithHighestScore = playersEagleScores.filter((p) => p.eagleScore === highestScore).map((p) => p.player)
      if (playersWithHighestScore.length > 1) {
        playersWithHighestScore.forEach((player) => {
          const score = Math.floor((eagleMajorityPoints[0] + eagleMajorityPoints[1]) / playersWithHighestScore.length)
          this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
        })
      } else {
        this.getMemory(playersWithHighestScore[0]).memorize<number>(MemoryType.Score, (previousScore) => previousScore + eagleMajorityPoints[0])
        const secondScore = playersEagleScores[1].eagleScore
        const playersWithSecondScore = playersEagleScores.filter((p) => p.eagleScore === secondScore).map((p) => p.player)
        playersWithSecondScore.forEach((player) => {
          const score = Math.floor(eagleMajorityPoints[1] / playersWithHighestScore.length)
          this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
        })
      }
    }
  }

  getPlayerEagleScore(player: PlayerColor) {
    return this.material(MaterialType.EagleDivinityCard)
      .location(LocationType.PlayerEagleCards)
      .player(player)
      .getItems()
      .map((it) => eagleDivinityCardPoints[it.id as EagleDivinityCard])
      .reduce((a, b) => a + b, 0)
  }

  setScoreForBearMajority() {
    const playersBearScores = this.game.players
      .map((player) => {
        return { player, bearScore: this.getPlayerBearScore(player) }
      })
      .filter((player) => player.bearScore > 0)
      .sort((a, b) => b.bearScore - a.bearScore)

    if (playersBearScores.length > 0) {
      const highestScore = playersBearScores[0].bearScore
      const playersWithHighestScore = playersBearScores.filter((p) => p.bearScore === highestScore).map((p) => p.player)
      if (playersWithHighestScore.length > 1) {
        playersWithHighestScore.forEach((player) => {
          const score = Math.floor((bearMajorityPoints[0] + bearMajorityPoints[1]) / playersWithHighestScore.length)
          this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
        })
      } else {
        this.getMemory(playersWithHighestScore[0]).memorize<number>(MemoryType.Score, (previousScore) => previousScore + bearMajorityPoints[0])
        if (playersBearScores.length > 1) {
          const secondScore = playersBearScores[1].bearScore
          const playersWithSecondScore = playersBearScores.filter((p) => p.bearScore === secondScore).map((p) => p.player)
          playersWithSecondScore.forEach((player) => {
            const score = Math.floor(bearMajorityPoints[1] / playersWithHighestScore.length)
            this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
          })
        }
      }
    }
  }

  getPlayerBearScore(player: PlayerColor) {
    return this.material(MaterialType.BearDivinityCard)
      .location(LocationType.PlayerBearCards)
      .player(player)
      .getItems()
      .map((it) => bearDivinityCardPoints[it.id as BearDivinityCard])
      .reduce((a, b) => a + b, 0)
  }

  setScoreForSalamanderMajority() {
    const playersSalamanderScores = this.game.players
      .map((player) => {
        return { player, salamanderScore: this.getPlayerSalamanderScore(player) }
      })
      .filter((player) => player.salamanderScore > 0)
      .sort((a, b) => b.salamanderScore - a.salamanderScore)

    if (playersSalamanderScores.length > 0) {
      const highestScore = playersSalamanderScores[0].salamanderScore
      const playersWithHighestScore = playersSalamanderScores.filter((p) => p.salamanderScore === highestScore).map((p) => p.player)
      if (playersWithHighestScore.length > 1) {
        playersWithHighestScore.forEach((player) => {
          const score = Math.floor((salamanderMajorityPoints[0] + salamanderMajorityPoints[1]) / playersWithHighestScore.length)
          this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
        })
      } else {
        this.getMemory(playersWithHighestScore[0]).memorize<number>(MemoryType.Score, (previousScore) => previousScore + salamanderMajorityPoints[0])
        const secondScore = playersSalamanderScores[1].salamanderScore
        const playersWithSecondScore = playersSalamanderScores.filter((p) => p.salamanderScore === secondScore).map((p) => p.player)
        playersWithSecondScore.forEach((player) => {
          const score = Math.floor(salamanderMajorityPoints[1] / playersWithHighestScore.length)
          this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + score)
        })
      }
    }
  }

  getPlayerSalamanderScore(player: PlayerColor) {
    return this.getPlayerWhiteSalamanderScore(player) + this.getPlayerBlackSalamanderScore(player)
  }
  getPlayerWhiteSalamanderScore(player: PlayerColor) {
    return this.material(MaterialType.WhiteSalamanderCard)
      .location(LocationType.PlayerWhiteSalamanderCards)
      .player(player)
      .getItems()
      .map((it) => whiteSalamanderCardPoints[it.id as WhiteSalamanderCard])
      .reduce((a, b) => a + b, 0)
  }

  getPlayerBlackSalamanderScore(player: PlayerColor) {
    return this.material(MaterialType.BlackSalamanderCard)
      .location(LocationType.PlayerBlackSalamanderCards)
      .player(player)
      .getItems()
      .map((it) => blackSalamanderCardPoints[it.id as BlackSalamanderCard])
      .reduce((a, b) => a + b, 0)
  }

  setScoreForScrollTokens() {
    this.game.players.forEach((player) => {
      const scrollTokens = this.material(MaterialType.ScrollToken).location(LocationType.PlayerScrollTokenStock).player(player).getItems().length
      this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + scrollTokens)
    })
  }

  setScoreForSpellBooks() {
    this.game.players.forEach((player) => {
      const spellBooksWithPlayerApprenticeTokens = this.material(MaterialType.ApprenticeToken)
        .location(LocationType.SpellBookApprenticeSpace)
        .id(player)
        .getItems()
        .map((item) => item.location)

      let totalScore = 0

      spellBooksWithPlayerApprenticeTokens.forEach((apprenticeLocation) => {
        if (apprenticeLocation.parent !== undefined) {
          const id = this.material(MaterialType.SpellBookCard).index(apprenticeLocation.parent).getItem()?.id as SpellBookCard

          const x = apprenticeLocation.x ?? 0
          const data = spellBookData[id]

          totalScore += data.points[x] * data.getMultiple(this.game, player)
        }
      })

      this.getMemory(player).memorize<number>(MemoryType.Score, (previousScore) => previousScore + totalScore)
    })
  }
}
