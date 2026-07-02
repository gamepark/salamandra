import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Salamander from '../../images/icons/salamander.png'
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpHeaderIconCss,
  helpOrnamentCss,
  diamondCss,
  helpImportantCss,
  helpDividerCss,
  helpGainCss,
  helpGainLabeledCss,
  groveRewardListCss,
  groveRewardItemCss
} from './utils'

export const SalamanderTempleHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <img src={Salamander} css={helpHeaderIconCss} alt="" />
        <h2 css={helpTitleCss}>{t('help.temple')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans i18nKey="help.temple.activate" components={components} />
        </p>
        <hr css={helpDividerCss} />
        <p>
          <Trans i18nKey="help.temple.cost.black" components={components} />
        </p>
        <p>
          <Trans i18nKey="help.temple.cost.white" components={components} />
        </p>
      </div>

      <div css={helpGainCss}>
        <p>
          <Trans i18nKey="help.temple.gain" components={components} />
        </p>
      </div>

      <div css={helpGainLabeledCss}>
        <Trans i18nKey="help.temple.fallback.label" components={components} />
        <ul css={groveRewardListCss}>
          <li css={groveRewardItemCss}>
            <span><Trans i18nKey="help.temple.fallback.white" components={components} /></span>
          </li>
          <li css={groveRewardItemCss}>
            <span><Trans i18nKey="help.temple.fallback.black" components={components} /></span>
          </li>
        </ul>
      </div>
    </div>
  )
}
