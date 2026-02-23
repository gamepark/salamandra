import { MaterialHelpProps } from '@gamepark/react-game'
import { Bonus, BonusType } from '@gamepark/salamandra/material/Bonus'
import { DivinityType } from '@gamepark/salamandra/material/DivinityCard'
import { groveData, GroveTile } from '@gamepark/salamandra/material/GroveTile'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Bear from '../../images/icons/bear.jpg'
import Eagle from '../../images/icons/eagle.jpg'
import Score from '../../images/icons/score.png'
import { scrollTokenDescription } from '../ScrollTokenDescription'
import {
  components,
  HelpIcon,
  HelpRoundedIcon,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpOrnamentCss,
  diamondCss,
  helpSecondaryCss,
  helpImportantCss,
  helpScoringLabeledCss,
  helpGainLabeledCss,
  helpDividerCss,
  groveRewardListCss,
  groveRewardItemCss
} from './utils'

export const GroveTileHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  if (!item.id) return <GroveDeckHelp />
  const gains = groveData[item.id as GroveTile].bonus

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.grove')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpSecondaryCss}>
        <p>
          <Trans defaults="help.grove.description" components={components} />
        </p>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.grove.crystal" components={components} />
        </p>
        <hr css={helpDividerCss} />
        <p>
          <Trans defaults="help.grove.take.action" components={components} />
        </p>
      </div>

      <div css={helpScoringLabeledCss}>
        <Trans defaults="help.scoring.label" components={components} />
        <p>
          <Trans defaults="help.grove.take.vp" components={components} />
        </p>
      </div>

      <div css={helpGainLabeledCss}>
        <Trans defaults="help.grove.gains.label" components={components} />
        <GainsDisplay gains={gains} />
      </div>
    </div>
  )
}

const GroveDeckHelp = () => {
  const { t } = useTranslation()
  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.grove.deck')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>
      <div css={helpSecondaryCss}>
        <p>
          <Trans defaults="help.grove.deck.description" components={components} />
        </p>
      </div>
      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.grove.deck.harvest" components={components} />
        </p>
      </div>
    </div>
  )
}

const GainsDisplay: FC<{ gains: Bonus[] }> = ({ gains }) => {
  return (
    <ul css={groveRewardListCss}>
      {gains.map((gain: Bonus, index: number) => (
        <li key={index} css={groveRewardItemCss}>
          <GainIcon gain={gain} />
          <span><GainText gain={gain} /></span>
        </li>
      ))}
    </ul>
  )
}

const GainIcon: FC<{ gain: Bonus }> = ({ gain }) => {
  switch (gain.type) {
    case BonusType.Points:
      return <HelpIcon src={Score} />
    case BonusType.Scroll:
      return <HelpIcon src={scrollTokenDescription.image} />
    case BonusType.DivinityCard:
      return <HelpRoundedIcon src={gain.divinity === DivinityType.Eagle ? Eagle : Bear} />
    default:
      return null
  }
}

const GainText: FC<{ gain: Bonus }> = ({ gain }) => {
  switch (gain.type) {
    case BonusType.Points:
      return <Trans defaults="help.grove.take.effect.points" components={components} values={{ points: gain.amount }} />
    case BonusType.Scroll:
      return <Trans defaults="help.grove.take.effect.scroll" components={components} />
    case BonusType.DivinityCard:
      return <Trans defaults="help.grove.take.effect.divinity" components={components} values={{ divinity: gain.divinity }} />
    default:
      return null
  }
}
