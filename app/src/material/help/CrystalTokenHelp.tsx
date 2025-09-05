/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, PlayMoveButton, useLegalMove, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Potion } from '@gamepark/salamandra/material/Potion'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { TradeResourceToGainResources } from '../../buttons/TradeResourceToGainResources'
import { components } from './utils'

export const CrystalTokenHelp = (props: MaterialHelpProps) => {
  const { t } = useTranslation()

  return (
    <div css={descriptionCss}>
      <h2>{t('help.crystal')}</h2>
      <p>
        <Trans defaults="help.crystal.text" components={components} />
      </p>
      <p>
        <Trans defaults="help.crystal.effect1" components={components} />
      </p>
      <p>
        <Trans defaults="help.crystal.effect2" components={components} />
      </p>
      <hr />
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
  const payCristalsToGainResource: CustomMove[] = useLegalMoves(isCustomMoveType(CustomMoveType.PayCristalsToGainResource)) as CustomMove[]
  const payCristalsToGainPotion: CustomMove[] = useLegalMoves(isCustomMoveType(CustomMoveType.PayCristalsToGainPotion)) as CustomMove[]
  const activateApprenticeForGainCrystal = useLegalMove((move: MaterialMove) => {
    if (!isCustomMoveType(CustomMoveType.ActivateApprenticeForGainCrystal)(move)) return false
    const data = move.data as { itemIndex?: number }
    return data.itemIndex === undefined
  })

  return (
    <div css={buttonGridCss}>
      {payCristalsToGainResource.map((move: CustomMove, index) => {
        const data: { resource: PrimaryResource } = move.data
        if (!isPlayerCrystal || activePlayer !== me) return null
        return <TradeResourceToGainResources key={index} resource={data.resource} onPlay={closeDialog} />
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
      {activateApprenticeForGainCrystal && isPlayerCrystal && activePlayer === me && (
        <PlayMoveButton move={activateApprenticeForGainCrystal} onPlay={closeDialog}>
          <Trans defaults="button.crystal.activate.apprentice" components={components} />
        </PlayMoveButton>
      )}
    </div>
  )
}

const buttonGridCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 1em;
`

const descriptionCss = css`
  font-size: 0.8em;
  white-space: pre-wrap;
  max-width: 45em;

  > h2 {
    text-align: center;
    margin-top: 0;
  }
`
