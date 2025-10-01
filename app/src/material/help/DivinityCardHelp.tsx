import { css } from '@emotion/react'
import { MaterialHelpProps, useLegalMoves } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { DivinityType } from '@gamepark/salamandra/material/Bonus'
import { DivinityCard, divinityCardPoints } from '@gamepark/salamandra/material/DivinityCard'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TakeDivinityCard } from '../../buttons/TakeDivinityCard.tsx'
import { TradeCrystalToGainPotion } from '../../buttons/TradeResourceToGainPotion.tsx'
import { components, descriptionCss } from './utils'

export const DivinityCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const id: { front?: DivinityCard; back: DivinityType } = item.id
  const type: DivinityType = id.back
  const isHidden = id.front === undefined

  return (
    <div css={descriptionCss}>
      <h2>
        <Trans defaults="help.divinity" components={components} values={{ type: type }} />
      </h2>
      <p>
        <Trans defaults="help.divinity.description" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.end" components={components} values={{ type: type, first: 8, second: 4 }} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.first" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.second" components={components} />
      </p>
      {!isHidden && (
        <>
          <p>
            <Trans defaults="help.divinity.points" components={components} values={{ type: type, points: divinityCardPoints[id.front!] }} />
          </p>
          <p>
            <Trans defaults="help.divinity.effects" components={components} />
            <Trans defaults={`help.divinity.effects.${id.front}`} components={components} />
          </p>
          <hr />
        </>
      )}
      <HelpButtons {...props} />
    </div>
  )
}

const HelpButtons: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, closeDialog } = props
  const moves = useLegalMoves<CustomMove>((move) => isCustomMoveType(CustomMoveType.PayCrystalsToGainPotion)(move) && move.data.divinityIndex === itemIndex)
  return (
    <div css={buttonGridCss}>
      {moves.map((m) => (
        <TradeCrystalToGainPotion key={m.data.potion} potion={m.data.potion} onPlay={closeDialog} />
      ))}
      <TakeDivinityCard divinityIndex={itemIndex} onPlay={closeDialog} />
    </div>
  )
}

const buttonGridCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 1em;
`
