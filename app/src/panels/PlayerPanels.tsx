import { css } from '@emotion/react'
import { getRelativePlayerIndex, MaterialContext, useMaterialContext, usePlayers } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { createPortal } from 'react-dom'
import { SalamandraPlayerPanel } from './SalamandraPlayerPanel'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const root = document.getElementById('root')
  const context = useMaterialContext()
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => (
        <SalamandraPlayerPanel key={player.id} player={player} css={[panelPosition, getPanelPosition(player.id, context)]} />
      ))}
    </>,
    root
  )
}

const getPanelPosition = (player: PlayerColor, context: MaterialContext) => {
  const index = getRelativePlayerIndex(context, player)
  if (context.rules.players.length === 2) return [bottomLeftPanelCss, bottomRightPanelCss][index]
  return [bottomLeftPanelCss, topLeftPanelCss, topRightPanelCss, bottomRightPanelCss][index]
}

const topLeftPanelCss = css`
  left: 1em;
  top: 8.5em;
`

const topRightPanelCss = css`
  right: 1em;
  top: 8.5em;
`

const bottomRightPanelCss = css`
  right: 1em;
  bottom: 1em;
`

const bottomLeftPanelCss = css`
  left: 1em;
  bottom: 1em;
`

const panelPosition = css`
  position: absolute;
  width: 28em;
`
