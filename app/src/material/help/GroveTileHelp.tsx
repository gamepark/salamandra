/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { Bonus, BonusType } from '@gamepark/salamandra/material/Bonus'
import { groveData, GroveTile } from '@gamepark/salamandra/material/GroveTile'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, descriptionCss } from './utils'

export const GroveTileHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  if (!item.id) return null
  const gains = groveData[item.id as GroveTile].bonus

  return (
    <div css={descriptionCss}>
      <h2>{t('help.grove')}</h2>
      <p>
        <Trans defaults="help.grove.description" components={components} />
      </p>
      <p>
        <Trans defaults="help.grove.crystal" components={components} />
      </p>
      <p>
        <Trans defaults="help.grove.take" components={components} />
      </p>
      <p>
        <Trans defaults="help.grove.take.effect" components={components} />
      </p>
      <GainsDisplay gains={gains} />
      <hr />
    </div>
  )
}

type GainsDisplayProps = {
  gains: Bonus[]
}

const GainsDisplay: FC<GainsDisplayProps> = (props) => {
  const { gains } = props
  return (
    <ul>
      {gains.map((gain: Bonus, index: number) => (
        <li key={index}>
          {gain.type === BonusType.Points && <Trans defaults="help.grove.take.effect.points" components={components} values={{ points: gain.amount }} />}
          {gain.type === BonusType.Scroll && <Trans defaults="help.grove.take.effect.scroll" components={components} />}
          {gain.type === BonusType.DivinityCard && (
            <Trans defaults="help.grove.take.effect.divinity" components={components} values={{ divinity: gain.divinity }} />
          )}
        </li>
      ))}
    </ul>
  )
}
