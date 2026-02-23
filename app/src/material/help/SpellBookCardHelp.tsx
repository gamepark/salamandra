import { MaterialHelpProps } from '@gamepark/react-game'
import { SpellBookCard, spellBookData } from '@gamepark/salamandra/material/SpellBookCard'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpOrnamentCss,
  diamondCss,
  helpImportantCss,
  helpScoringLabeledCss,
  pointsBadgeCss
} from './utils'

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
        return undefined
    }
  }

  const pointDescription = getPointsDescription()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.spellbook')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.spellbook.description" components={components} />
        </p>
      </div>

      <div css={helpScoringLabeledCss}>
        <Trans defaults="help.scoring.label" components={components} />
        <p>
          <span css={pointsBadgeCss}>
            <Trans defaults="help.spellbook.points" components={components} values={{ first: points[0], last: points[1] }} />
          </span>
        </p>
        {!!pointDescription && (
          <p>
            <Trans defaults={pointDescription} components={components} />
          </p>
        )}
      </div>
    </div>
  )
}
