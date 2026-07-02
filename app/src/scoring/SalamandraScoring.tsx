import { css } from '@emotion/react'
import { Picture, ScoringDescription, ScoringValue } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SpellBookCard } from '@gamepark/salamandra/material/SpellBookCard.ts'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor.ts'
import { ScoreHelper } from '@gamepark/salamandra/rules/helper/ScoreHelper.ts'
import { MemoryType } from '@gamepark/salamandra/rules/MemoryType.ts'
import { times } from 'es-toolkit/compat'
import { Trans } from 'react-i18next'
import BearScore from '../images/score/bear.jpg'
import EagleScore from '../images/score/eagle.jpg'
import SalamandraScore from '../images/score/salamandra.jpg'
import { components } from '../material/help/utils.tsx'
import { scrollTokenDescription } from '../material/ScrollTokenDescription.ts'
import { spellBookCardDescription } from '../material/SpellBookCardDescription.ts'

export enum SalamandraScoringKey {
  SCORE = 'score',
  ROUND = 'round',
  EAGLE = 'eagle',
  BEAR = 'bear',
  SALAMANDRA = 'salamandra',
  SCROLL = 'scroll',
  SPELLBOOK = 'spellbook',
  TOTAL = 'total'
}

export class SalamandraScoring implements ScoringDescription {
  getScoringKeys(rules: MaterialRules): string[] {
    const keys = []

    if (rules.game.players.some((p) => rules.remind(MemoryType.RoundScore, p))) {
      times(rules.remind(MemoryType.ActualRound) + 1, (round) => keys.push(`${SalamandraScoringKey.ROUND}.${round + 1}`))
    } else {
      keys.push(SalamandraScoringKey.SCORE)
    }

    keys.push(SalamandraScoringKey.SALAMANDRA, SalamandraScoringKey.BEAR, SalamandraScoringKey.EAGLE)

    const spellBook = this.getSpellBooks(rules)
    if (spellBook.length > 0) {
      for (const spellBookCard of spellBook.getItems<SpellBookCard>()) {
        keys.push(`${SalamandraScoringKey.SPELLBOOK}.${spellBookCard.id}`)
      }
    }

    keys.push(SalamandraScoringKey.SCROLL)
    keys.push(SalamandraScoringKey.TOTAL)
    return keys
  }

  getScoringHeader(key: string) {
    if (key.startsWith(SalamandraScoringKey.ROUND)) {
      return (
        <div css={centeredCss}>
          <Trans i18nKey="score.round" values={{ round: key.split('.')[1] }} components={components} />
        </div>
      )
    }

    if (key === SalamandraScoringKey.SCORE) {
      return (
        <div css={centeredCss}>
          <Trans i18nKey="score.actions" components={components} />
        </div>
      )
    }

    if (key.startsWith(SalamandraScoringKey.SPELLBOOK)) {
      const spellBookId = +key.split('.')[1]
      return (
        <div css={centeredCss}>
          <Picture css={spellBookCss} src={spellBookCardDescription.images[spellBookId as SpellBookCard]} />
        </div>
      )
    }

    if (key === SalamandraScoringKey.SCROLL)
      return (
        <div css={centeredCss}>
          <Picture css={scrollTokenCss} src={scrollTokenDescription.image} />
        </div>
      )

    if (key === SalamandraScoringKey.SALAMANDRA)
      return (
        <div css={centeredCss}>
          <Picture src={SalamandraScore} />
        </div>
      )
    if (key === SalamandraScoringKey.BEAR)
      return (
        <div css={centeredCss}>
          <Picture src={BearScore} />
        </div>
      )

    if (key === SalamandraScoringKey.EAGLE)
      return (
        <div css={centeredCss}>
          <Picture src={EagleScore} />
        </div>
      )

    return <></>
  }

  getSpellBooks(rules: MaterialRules) {
    return rules.material(MaterialType.SpellBookCard)
  }

  getScoringPlayerData(key: string, player: PlayerColor, rules: MaterialRules): ScoringValue | null {
    const scoring = new ScoreHelper(rules.game, player)

    if (key.startsWith(SalamandraScoringKey.SPELLBOOK)) {
      const spellBookId = +key.split('.')[1]
      return <div css={centeredCss}>{scoring.getSpellBookScore(spellBookId)}</div>
    }

    const total = rules.remind(MemoryType.Score, player)

    if (key.startsWith(SalamandraScoringKey.ROUND)) {
      const round = +key.split('.')[1]
      return <div css={centeredCss}>{rules.remind(MemoryType.RoundScore, player)[round - 1]}</div>
    }

    if (key === SalamandraScoringKey.SCROLL) return <div css={centeredCss}>{scoring.scrollTokenScore}</div>
    if (key === SalamandraScoringKey.SCORE) return <div css={centeredCss}>{total - scoring.endOfGameScore}</div>
    if (key === SalamandraScoringKey.SALAMANDRA) return <div css={centeredCss}>{scoring.salamandraScore}</div>
    if (key === SalamandraScoringKey.BEAR) return <div css={centeredCss}>{scoring.bearScore}</div>
    if (key === SalamandraScoringKey.EAGLE) return <div css={centeredCss}>{scoring.eagleScore}</div>
    return <div css={centeredCss}>{rules.remind(MemoryType.Score, player)}</div>
  }
}

const spellBookCss = css`
  width: 5em;
`

const scrollTokenCss = css`
  height: 3em;
`

const centeredCss = css`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
