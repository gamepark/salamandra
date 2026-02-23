import { MaterialHelpProps, PlayMoveButton, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { Potion } from '@gamepark/salamandra/material/Potion'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import CristalToken1 from '../../images/tokens/CristalToken1.png'
import { ActivateApprenticeToGainCrystal } from '../../buttons/ActivateApprenticeToGainCrystal'
import { TradeCrystalToGainResources } from '../../buttons/TradeCrystalToGainResources.tsx'
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpHeaderIconCss,
  helpOrnamentCss,
  diamondCss,
  helpSecondaryCss,
  helpImportantCss,
  helpButtonGridCss
} from './utils'

export const CrystalTokenHelp = (props: MaterialHelpProps) => {
  const { t } = useTranslation()

  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <img src={CristalToken1} css={helpHeaderIconCss} alt="" />
        <h2 css={helpTitleCss}>{t('help.crystal')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpSecondaryCss}>
        <p>
          <Trans defaults="help.crystal.text" components={components} />
        </p>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.crystal.effect1" components={components} />
        </p>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans defaults="help.crystal.effect2" components={components} />
        </p>
      </div>

      <HelpButtons {...props} />
    </div>
  )
}

const HelpButtons: FC<MaterialHelpProps> = (props) => {
  const { item, closeDialog } = props
  const me = usePlayerId()
  const rules = useRules<SalamandraRules>()!
  const activePlayer = rules.getActivePlayer()
  const isPlayerCrystal = item.location?.player === me
  const payCristalsToGainResource: CustomMove[] = useLegalMoves(isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)) as CustomMove[]
  const payCristalsToGainPotion: CustomMove[] = useLegalMoves(isCustomMoveType(CustomMoveType.PayCrystalsToGainPotion)) as CustomMove[]

  return (
    <div css={helpButtonGridCss}>
      {payCristalsToGainResource.map((move: CustomMove, index) => {
        const data: { resource: PrimaryResource } = move.data
        if (!isPlayerCrystal || activePlayer !== me) return null
        return <TradeCrystalToGainResources key={index} resource={data.resource} onPlay={closeDialog} />
      })}
      {payCristalsToGainPotion.map((move: CustomMove, index) => {
        const data: { amount: number; potion: Potion } = move.data
        if (!isPlayerCrystal || activePlayer !== me) return null
        return (
          <PlayMoveButton key={index} move={move} onPlay={closeDialog}>
            <Trans defaults="button.crystal.pay.to.potion" values={{ amount: data.amount, potion: data.potion }} components={components} />
          </PlayMoveButton>
        )
      })}
      <ActivateApprenticeToGainCrystal onPlay={closeDialog} />
    </div>
  )
}
