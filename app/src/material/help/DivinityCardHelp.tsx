import { MaterialHelpProps } from '@gamepark/react-game'
import { DivinityType } from '@gamepark/salamandra/material/Bonus'
import { DivinityCard, divinityCardPoints } from '@gamepark/salamandra/material/DivinityCard'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { components, descriptionCss } from './utils'

export const DivinityCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const id: { front: DivinityCard; back: DivinityType } = item.id
  const type: DivinityType = id.back
  const points = divinityCardPoints[id.front]

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
      <p>
        <Trans defaults="help.divinity.points" components={components} values={{ type: type, points }} />
      </p>
      <p>
        <Trans defaults="help.divinity.effects" components={components} />
        <Trans defaults={`help.divinity.effects.${id.front}`} components={components} />
      </p>
      <hr />
    </div>
  )
}
