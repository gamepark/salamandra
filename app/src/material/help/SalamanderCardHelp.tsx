import { MaterialHelpProps } from '@gamepark/react-game'
import { SalamanderCard, salamanderCardPoints } from '@gamepark/salamandra/material/SalamanderCard'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Salamander from '../../images/icons/salamander.png'
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
  pointsBadgeCss,
  helpPointsDisplayCss
} from './utils'

export const SalamanderCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const isHidden = item.id.front === undefined

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <img src={Salamander} css={helpHeaderIconCss} alt="" />
        <h2 css={helpTitleCss}>
          <Trans defaults="help.salamander" components={components} />
        </h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpSecondaryCss}>
        <p>
          <Trans defaults="help.salamander.description" components={components} />
        </p>
      </div>

      <div css={helpScoringLabeledCss}>
        <Trans defaults="help.scoring.label" components={components} />
        <p>
          <Trans defaults="help.divinity.end" components={components} values={{ type: undefined, first: 12, second: 6 }} />
        </p>
      </div>

      {!isHidden && (
        <>
          <div css={helpOrnamentCss}><span css={diamondCss} /></div>
          <div css={helpPointsDisplayCss}>
            <span css={pointsBadgeCss}>
              <Trans
                defaults="help.divinity.points"
                components={components}
                values={{ type: undefined, points: salamanderCardPoints[item.id.front as SalamanderCard] }}
              />
            </span>
          </div>
          <div css={helpGainLabeledCss}>
            <Trans defaults="help.salamander.bonus" components={components} />
            <p>
              <Trans defaults={`help.salamander.bonus.${item.id.front}`} components={components} />
            </p>
          </div>
        </>
      )}
    </div>
  )
}
