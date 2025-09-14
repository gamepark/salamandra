/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { DivinityType } from '@gamepark/salamandra/material/Bonus'
import { EagleDivinityCard, eagleDivinityCardPoints } from '@gamepark/salamandra/material/EagleDivinityCard'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { components, descriptionCss } from './utils'

export const EagleDivinityCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const points = eagleDivinityCardPoints[item.id as EagleDivinityCard]

  const getEffectsDesctiption = () => {
    switch (item.id) {
      case EagleDivinityCard.EagleDivinity1:
        return 'help.divinity.effects.eagle.1'
      case EagleDivinityCard.EagleDivinity2:
        return 'help.divinity.effects.eagle.2'
      case EagleDivinityCard.EagleDivinity3:
        return 'help.divinity.effects.eagle.3'
      case EagleDivinityCard.EagleDivinity4:
        return 'help.divinity.effects.eagle.4'
      case EagleDivinityCard.EagleDivinity5:
        return 'help.divinity.effects.eagle.5'
      case EagleDivinityCard.EagleDivinity6:
        return 'help.divinity.effects.eagle.6'
      case EagleDivinityCard.EagleDivinity7:
        return 'help.divinity.effects.eagle.7'
      case EagleDivinityCard.EagleDivinity8:
        return 'help.divinity.effects.eagle.8'
      case EagleDivinityCard.EagleDivinity9:
        return 'help.divinity.effects.eagle.9'
      case EagleDivinityCard.EagleDivinity10:
        return 'help.divinity.effects.eagle.10'
      case EagleDivinityCard.EagleDivinity11:
        return 'help.divinity.effects.eagle.11'
      case EagleDivinityCard.EagleDivinity12:
        return 'help.divinity.effects.eagle.12'
      default:
        return ''
    }
  }

  return (
    <div css={descriptionCss}>
      <h2>
        <Trans defaults="help.divinity" components={components} values={{ type: DivinityType.Eagle }} />
      </h2>
      <p>
        <Trans defaults="help.divinity.description" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.end" components={components} values={{ type: DivinityType.Eagle, first: 6, second: 3 }} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.first" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.second" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.points" components={components} values={{ type: DivinityType.Eagle, points }} />
      </p>
      <p>
        <Trans defaults="help.divinity.effects" components={components} />
        <Trans defaults={getEffectsDesctiption()} components={components} />
      </p>
      <hr />
    </div>
  )
}
