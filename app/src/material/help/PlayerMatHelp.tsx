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
  helpSecondaryCss,
  helpImportantCss
} from './utils'

export const PlayerMatHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.playermat')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpSecondaryCss}>
        <p>
          <Trans defaults="help.playermat.description" components={components} />
        </p>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.playermat.rounds" components={components} />
        </p>
      </div>
    </div>
  )
}
