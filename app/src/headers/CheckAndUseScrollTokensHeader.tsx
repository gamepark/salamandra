import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules'
import { Trans } from 'react-i18next'

export const CheckAndUseScrollTokensHeader = () => {
  const player = usePlayerId()
  const rules = useRules<SalamandraRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans i18nKey="header.check.and.use.scroll.tokens.you" />
  }

  return <Trans i18nKey="header.check.and.use.scroll.tokens.player" values={{ player: name }} />
}
