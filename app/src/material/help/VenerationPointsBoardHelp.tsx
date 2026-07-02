import { Trans, useTranslation } from 'react-i18next'
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpOrnamentCss,
  diamondCss,
  helpScoringLabeledCss,
  helpImportantCss
} from './utils'

export const VenerationPointsBoardHelp = () => {
  const { t } = useTranslation()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.majorities')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpScoringLabeledCss}>
        <Trans i18nKey="help.scoring.label" components={components} />
        <p>
          <Trans i18nKey="help.majorities.scoring" components={components} />
        </p>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans i18nKey="help.divinity.equality.first" components={components} />
        </p>
        <p>
          <Trans i18nKey="help.divinity.equality.second" components={components} />
        </p>
      </div>
    </div>
  )
}
