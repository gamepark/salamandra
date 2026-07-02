import { MaterialHelpProps } from '@gamepark/react-game'
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
  helpNoticeCss
} from './utils'

export const DruidTileHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.druid')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans i18nKey="help.druid.active" components={components} />
        </p>
      </div>

      <div css={helpNoticeCss}>
        <p>
          <Trans i18nKey="help.druid.flip" components={components} />
        </p>
      </div>
    </div>
  )
}
