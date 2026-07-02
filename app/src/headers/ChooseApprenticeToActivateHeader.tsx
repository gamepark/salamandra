import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules'
import { Trans } from 'react-i18next'

export const ChooseApprenticeToActivateHeader = () => {
  const player = usePlayerId()
  const rules = useRules<SalamandraRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans i18nKey="header.choose.apprentice.to.activate.you" />
  }

  return <Trans i18nKey="header.choose.apprentice.to.activate.player" values={{ player: name }} />
}
