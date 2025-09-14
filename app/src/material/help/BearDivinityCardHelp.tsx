/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { DivinityType } from '@gamepark/salamandra/material/Bonus'
import { BearDivinityCard, bearDivinityCardPoints } from '@gamepark/salamandra/material/BearDivinityCard'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { components, descriptionCss } from './utils'

export const BearDivinityCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const points = bearDivinityCardPoints[item.id as BearDivinityCard]

  const getEffectsDesctiption = () => {
    switch (item.id) {
      case BearDivinityCard.BearDivinity1:
        return 'help.divinity.effects.bear.1'
      case BearDivinityCard.BearDivinity2:
        return 'help.divinity.effects.bear.2'
      case BearDivinityCard.BearDivinity3:
        return 'help.divinity.effects.bear.3'
      case BearDivinityCard.BearDivinity4:
        return 'help.divinity.effects.bear.4'
      case BearDivinityCard.BearDivinity5:
        return 'help.divinity.effects.bear.5'
      case BearDivinityCard.BearDivinity6:
        return 'help.divinity.effects.bear.6'
      case BearDivinityCard.BearDivinity7:
        return 'help.divinity.effects.bear.7'
      case BearDivinityCard.BearDivinity8:
        return 'help.divinity.effects.bear.8'
      case BearDivinityCard.BearDivinity9:
        return 'help.divinity.effects.bear.9'
      case BearDivinityCard.BearDivinity10:
        return 'help.divinity.effects.bear.10'
      case BearDivinityCard.BearDivinity11:
        return 'help.divinity.effects.bear.11'
      case BearDivinityCard.BearDivinity12:
        return 'help.divinity.effects.bear.12'
      default:
        return ''
    }
  }

  return (
    <div css={descriptionCss}>
      <h2>
        <Trans defaults="help.divinity" components={components} values={{ type: DivinityType.Bear }} />
      </h2>
      <p>
        <Trans defaults="help.divinity.description" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.end" components={components} values={{ type: DivinityType.Bear, first: 8, second: 4 }} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.first" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.second" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.points" components={components} values={{ type: DivinityType.Bear, points }} />
      </p>
      <p>
        <Trans defaults="help.divinity.effects" components={components} />
        <Trans defaults={getEffectsDesctiption()} components={components} />
      </p>
      <hr />
    </div>
  )
}
