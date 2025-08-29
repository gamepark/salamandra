/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, PlayMoveButton, useLegalMove, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
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
  const payCristalsToGainLeaf = useLegalMove(
    (move) => isCustomMoveType(CustomMoveType.PayCristalsToGainResource)(move) && move.data.resource === PrimaryResource.Leaf
  )
  const payCristalsToGainFlower = useLegalMove(
    (move) => isCustomMoveType(CustomMoveType.PayCristalsToGainResource)(move) && move.data.resource === PrimaryResource.Flower
  )
  const payCristalsToGainFruit = useLegalMove(
    (move) => isCustomMoveType(CustomMoveType.PayCristalsToGainResource)(move) && move.data.resource === PrimaryResource.Fruit
  )
  const activateApprenticeForGainCrystal = useLegalMove(isCustomMoveType(CustomMoveType.ActivateApprenticeForGainCrystal))

  return (
    <>
      <h2>{t('help.crystal')}</h2>
      <p>
        <Trans defaults="help.crystal.text" components={components} />
      </p>
      {payCristalsToGainLeaf && isPlayerCrystal && activePlayer === me && (
        <p>
          <PlayMoveButton move={payCristalsToGainLeaf} onPlay={closeDialog}>
            {t('button.crystal.leaf')}
          </PlayMoveButton>
        </p>
      )}
      {payCristalsToGainFlower && isPlayerCrystal && activePlayer === me && (
        <p>
          <PlayMoveButton move={payCristalsToGainFlower} onPlay={closeDialog}>
            {t('button.crystal.flower')}
          </PlayMoveButton>
        </p>
      )}
      {payCristalsToGainFruit && isPlayerCrystal && activePlayer === me && (
        <p>
          <PlayMoveButton move={payCristalsToGainFruit} onPlay={closeDialog}>
            {t('button.crystal.fruit')}
          </PlayMoveButton>
        </p>
      )}
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
