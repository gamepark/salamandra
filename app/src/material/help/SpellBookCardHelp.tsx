/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { SpellBookCard, spellBookData } from '@gamepark/salamandra/material/SpellBookCard'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { components, descriptionCss } from './utils'

export const SpellBookCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  if (!item.id) return null
  const points = spellBookData[item.id as SpellBookCard].points

  const getPointsDescription = () => {
    switch (item.id) {
      case SpellBookCard.SpellBook1:
        return 'help.spellbook.points.fields.white'
      case SpellBookCard.SpellBook2:
        return 'help.spellbook.points.fields.orange'
      case SpellBookCard.SpellBook3:
        return 'help.spellbook.points.fields.green'
      case SpellBookCard.SpellBook4:
        return 'help.spellbook.points.fields.purple'
      case SpellBookCard.SpellBook5:
        return 'help.spellbook.points.salamanders'
      case SpellBookCard.SpellBook6:
        return 'help.spellbook.points.divinities'
      case SpellBookCard.SpellBook7:
        return 'help.spellbook.points.groveTiles'
      case SpellBookCard.SpellBook8:
        return 'help.spellbook.points.cauldrons'
      case SpellBookCard.SpellBook9:
        return 'help.spellbook.points.spellbooks'
      case SpellBookCard.SpellBook10:
      default:
        return ''
    }
  }

  return (
    <div css={descriptionCss}>
      <h2>{t('help.spellbook')}</h2>
      <p>
        <Trans defaults="help.spellbook.description" components={components} />
      </p>
      <p>
        <Trans defaults="help.spellbook.gains" components={components} />
      </p>
      <p>
        <Trans defaults="help.spellbook.points" components={components} values={{ first: points[0], last: points[1] }} />
        <Trans defaults={getPointsDescription()} components={components} />
      </p>
      <hr />
    </div>
  )
}
