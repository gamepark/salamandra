import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { GameBoundaries } from '@gamepark/salamandra/material/helper/GameBoundaries.ts'
import { fieldTileDescription } from './material/FieldTileDescription.ts'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  const rules = useRules<MaterialRules>()!
  const { overY, overX } = new GameBoundaries(rules.game).overCoordinates
  const over = Math.max(overX, overY)
  const additionalX = over * fieldTileDescription.width
  const additionalY = over * fieldTileDescription.width

  return (
    <>
      <GameTable
        collisionAlgorithm={pointerWithin}
        verticalCenter
        xMin={-78}
        xMax={43 + additionalX}
        yMin={-30}
        yMax={27 + additionalY}
        margin={margin}
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation css={naviationCss} />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const naviationCss = css`
  position: absolute;
  bottom: 2em;
  left: 42em;
  top: unset;
  height: auto;
`

const tableBorder = css`
  border: 1px solid white;
`
