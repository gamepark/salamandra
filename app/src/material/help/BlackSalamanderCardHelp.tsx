/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { BlackSalamanderCard, blackSalamanderCardPoints } from '@gamepark/salamandra/material/BlackSalamanderCard'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { components, descriptionCss } from './utils'

export const BlackSalamanderCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const points = blackSalamanderCardPoints[item.id as BlackSalamanderCard]

  return (
    <div css={descriptionCss}>
      <h2>
        <Trans defaults="help.salamander" components={components} />
      </h2>
      <p>
        <Trans defaults="help.salamander.description" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.end" components={components} values={{ type: undefined, first: 12, second: 6 }} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.first" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.second" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.points" components={components} values={{ type: undefined, points }} />
      </p>
      <p>
        <Trans defaults="help.salamander.bonus" components={components} />
        <Trans defaults={`help.salamander.bonus.black.${item.id}`} components={components} />
      </p>
      <hr />
    </div>
  )
}
