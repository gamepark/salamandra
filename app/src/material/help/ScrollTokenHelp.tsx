import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { scrollTokenDescription } from '../ScrollTokenDescription'
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpHeaderIconCss,
  helpOrnamentCss,
  diamondCss,
  helpImportantCss,
  helpScoringLabeledCss
} from './utils'

export const ScrollTokenHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <img src={scrollTokenDescription.image} css={helpHeaderIconCss} alt="" />
        <h2 css={helpTitleCss}>{t('help.scroll')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans i18nKey="help.scroll.use" components={components} />
        </p>
      </div>

      <div css={helpScoringLabeledCss}>
        <Trans i18nKey="help.scoring.label" components={components} />
        <p>
          <Trans i18nKey="help.scroll.scoring" components={components} />
        </p>
      </div>
    </div>
  )
}
