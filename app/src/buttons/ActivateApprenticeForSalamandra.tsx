/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Trans } from 'react-i18next'
import { components } from '../material/help/utils'

type ActivateApprenticeForSalamandraProps = {
  itemIndex?: number
  onPlay?: () => void
}

export const ActivateApprenticeForSalamandra = (props: ActivateApprenticeForSalamandraProps) => {
  const { onPlay, itemIndex } = props
  const activateApprenticeForSalamandra: MoveItem | undefined = useLegalMove<MoveItem>(
    (move: MaterialMove) => isMoveItemType(MaterialType.ApprenticeToken)(move) && move.itemIndex === itemIndex
  )

  if (!activateApprenticeForSalamandra) return null

  return (
    <PlayMoveButton move={activateApprenticeForSalamandra} onPlay={onPlay}>
      <Trans defaults="button.crystal.activate.salamandra" components={components} />
    </PlayMoveButton>
  )
}
