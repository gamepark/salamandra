/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules'
import { Trans } from 'react-i18next'

export const DoActionsHeader = () => {
  const player = usePlayerId()
  const rules = useRules<SalamandraRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const winOneCristal = useLegalMove(isCustomMoveType(CustomMoveType.ActivateApprenticeForGainCrystal))

  if (winOneCristal) {
    return (
      <Trans
        defaults="<win>Win cristal</win>"
        components={{
          win: <PlayMoveButton move={winOneCristal} />
        }}
      />
    )
  }

  if (itsMe) {
    return (
      <Trans
        defaults="header.take.actions.you"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults="header.take.actions.player" values={{ player: name }} />
}
