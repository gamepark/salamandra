import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Trans } from 'react-i18next'
import { components } from '../material/help/utils'

type FlipApprenticeProps = {
  itemIndex?: number
  item: Partial<MaterialItem>
  onPlay?: () => void
}

export const FlipApprentice = (props: FlipApprenticeProps) => {
  const { onPlay, itemIndex, item } = props
  const activateApprenticeForSalamandra: MoveItem | undefined = useLegalMove<MoveItem>(
    (move: MaterialMove) =>
      isMoveItemType(MaterialType.ApprenticeToken)(move) &&
      move.itemIndex === itemIndex &&
      item.location?.type === LocationType.FieldApprenticeSpace &&
      item.location.rotation !== move.location.rotation
  )

  if (!activateApprenticeForSalamandra) return null

  return (
    <PlayMoveButton move={activateApprenticeForSalamandra} onPlay={onPlay}>
      <Trans i18nKey="button.crystal.activate.salamandra" components={components} />
    </PlayMoveButton>
  )
}
