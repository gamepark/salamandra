/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, PlayMoveButton, useLegalMove, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules'
import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export function CrystalTokenHelp({ item, closeDialog }: MaterialHelpProps) {
  const { t } = useTranslation()
  const me = usePlayerId()
  const rules = useRules<SalamandraRules>()!
  const activePlayer = rules.getActivePlayer()
  const isPlayerCrystal = item.location?.player === me
  const payCristalsToGainResource: CustomMove[] = useLegalMoves(isCustomMoveType(CustomMoveType.PayCristalsToGainResource)) as CustomMove[]
  const payCristalsToGainPotion: CustomMove[] = useLegalMoves(isCustomMoveType(CustomMoveType.PayCristalsToGainPotion)) as CustomMove[]
  const activateApprenticeForGainCrystal = useLegalMove(isCustomMoveType(CustomMoveType.ActivateApprenticeForGainCrystal))

  return (
    <>
      <h2>{t('help.crystal')}</h2>
      <p>
        <Trans defaults="help.crystal.text" components={components} />
      </p>
      {payCristalsToGainResource.map((move: CustomMove, index) => (
        <p key={index}>
          {isPlayerCrystal && activePlayer === me && (
            <PlayMoveButton move={move} onPlay={closeDialog}>
              <Trans defaults="button.crystal.pay.to.resource" values={{ amount: move.data.amount, resource: move.data.resource }} />
            </PlayMoveButton>
          )}
        </p>
      ))}
      {payCristalsToGainPotion.map((move: CustomMove, index) => (
        <p key={index}>
          {isPlayerCrystal && activePlayer === me && (
            <PlayMoveButton move={move} onPlay={closeDialog}>
              <Trans defaults="button.crystal.pay.to.potion" values={{ amount: move.data.amount, potion: move.data.potion }} />
            </PlayMoveButton>
          )}
        </p>
      ))}
      {activateApprenticeForGainCrystal && isPlayerCrystal && activePlayer === me && (
        <p>
          <PlayMoveButton move={activateApprenticeForGainCrystal} onPlay={closeDialog}>
            {t('button.crystal.activate.apprentice')}
          </PlayMoveButton>
        </p>
      )}
    </>
  )
}
