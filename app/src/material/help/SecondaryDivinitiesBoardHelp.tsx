import { MaterialHelpProps } from '@gamepark/react-game'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { Trans, useTranslation } from 'react-i18next'
import { TradeCrystalToGainResources } from '../../buttons/TradeCrystalToGainResources.tsx'
import { components } from './utils'

export const SecondaryDivinitiesBoardHelp = ({ closeDialog }: MaterialHelpProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.secondary-divinity-board.title')}</h2>
      <p>
        <Trans defaults="help.secondary-divinity-board" components={components} />
      </p>
      <p>
        <TradeCrystalToGainResources resource={PrimaryResource.Leaf} onPlay={closeDialog} />
      </p>
      <p>
        <TradeCrystalToGainResources resource={PrimaryResource.Flower} onPlay={closeDialog} />
      </p>
      <p>
        <TradeCrystalToGainResources resource={PrimaryResource.Fruit} onPlay={closeDialog} />
      </p>
    </>
  )
}
