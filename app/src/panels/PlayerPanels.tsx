import { useDndMonitor } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { getRelativePlayerIndex, MaterialContext, useMaterialContext, usePlay, usePlayers } from '@gamepark/react-game'
import { LocalMoveType, MoveKind } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { createPortal } from 'react-dom'
import { SalamandraPlayerPanel } from './SalamandraPlayerPanel'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const root = document.getElementById('root')
  const context = useMaterialContext()
  const play = usePlay()
  useDndMonitor({ onDragStart: () => play({ kind: MoveKind.LocalMove, type: LocalMoveType.ChangeView, view: undefined }, { transient: true }) })
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) => (
        <SalamandraPlayerPanel key={player.id} player={player} defaultView={players[0].id} css={[panelPosition, getPanelPosition(player.id, context)]} />
      ))}
    </>,
    root
  )
}

const getPanelPosition = (player: PlayerColor, context: MaterialContext) => {
  const index = getRelativePlayerIndex(context, player)
  return css`
    left: 1em;
    top: ${9.5 + index * 17}em;
  `
}

const panelPosition = css`
  position: absolute;
  width: 28em;
`
