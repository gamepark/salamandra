import { MaterialHelpProps, useLegalMoves } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { divinityCardPoints, DivinityId, DivinityType } from '@gamepark/salamandra/material/DivinityCard'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Bear from '../../images/icons/bear.jpg'
import Eagle from '../../images/icons/eagle.jpg'
import { TakeDivinityCard } from '../../buttons/TakeDivinityCard.tsx'
import { TradeCrystalToGainPotion } from '../../buttons/TradeResourceToGainPotion.tsx'
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpHeaderIconCss,
  helpOrnamentCss,
  diamondCss,
  helpSecondaryCss,
  helpScoringLabeledCss,
  helpGainLabeledCss,
  helpButtonGridCss,
  pointsBadgeCss,
  helpPointsDisplayCss
} from './utils'

export const DivinityCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const id: DivinityId = item.id
  const type: DivinityType = id.back
  const isHidden = id.front === undefined
  const isBear = type === 1

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <img src={isBear ? Bear : Eagle} css={helpHeaderIconCss} alt="" />
        <h2 css={helpTitleCss}>
          <Trans defaults="help.divinity" components={components} values={{ type }} />
        </h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpSecondaryCss}>
        <p>
          <Trans defaults="help.divinity.description.how" components={components} />
        </p>
        <p>
          <Trans defaults="help.divinity.description.permanent" components={components} />
        </p>
      </div>

      <div css={helpScoringLabeledCss}>
        <Trans defaults="help.scoring.label" components={components} />
        <p>
          <Trans defaults="help.divinity.end" components={components} values={{ type, first: 8, second: 4 }} />
        </p>
      </div>

      {!isHidden && (
        <>
          <div css={helpOrnamentCss}><span css={diamondCss} /></div>
          <div css={helpPointsDisplayCss}>
            <span css={pointsBadgeCss}>
              <Trans defaults="help.divinity.points" components={components} values={{ type, points: divinityCardPoints[id.front!] }} />
            </span>
          </div>
          <div css={helpGainLabeledCss}>
            <p>
              <Trans defaults="help.divinity.effects" components={components} />
              <Trans defaults={`help.divinity.effects.${id.front}`} components={components} />
            </p>
          </div>
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
    <div css={helpButtonGridCss}>
      {moves.map((m) => (
        <TradeCrystalToGainPotion key={m.data.potion} potion={m.data.potion} onPlay={closeDialog} />
      ))}
      <TakeDivinityCard divinityIndex={itemIndex} onPlay={closeDialog} />
    </div>
  )
}
