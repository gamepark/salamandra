import { MaterialHelpProps } from '@gamepark/react-game'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { Trans, useTranslation } from 'react-i18next'
import { TradeCrystalToGainResources } from '../../buttons/TradeCrystalToGainResources.tsx'
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpOrnamentCss,
  diamondCss,
  helpImportantCss,
  helpButtonGridCss
} from './utils'

export const SecondaryDivinitiesBoardHelp = ({ closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.secondary-divinity-board.title')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.secondary-divinity-board.how" components={components} />
        </p>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.secondary-divinity-board.permanent" components={components} />
        </p>
      </div>

      <div css={helpButtonGridCss}>
        <TradeCrystalToGainResources resource={PrimaryResource.Leaf} onPlay={closeDialog} />
        <TradeCrystalToGainResources resource={PrimaryResource.Flower} onPlay={closeDialog} />
        <TradeCrystalToGainResources resource={PrimaryResource.Fruit} onPlay={closeDialog} />
      </div>
    </div>
  )
}
