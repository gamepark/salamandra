import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { Trans } from 'react-i18next'
import { components } from '../material/help/utils'

type ActivateApprenticeToGainCrystalProps = {
  itemIndex?: number
  onPlay?: () => void
}

export const ActivateTile = (props: ActivateApprenticeToGainCrystalProps) => {
  const { onPlay, itemIndex } = props
  const work = useLegalMove<MaterialMove>((move) => {
    return isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)(move) && move.data === itemIndex
  })

  if (!work) return null

  return (
    <PlayMoveButton move={work} onPlay={onPlay}>
      <Trans defaults="button.apprentice.work" components={components} />
    </PlayMoveButton>
  )
}
