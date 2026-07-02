import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { Trans } from 'react-i18next'
import { components } from '../material/help/utils'

type ActivateApprenticeToGainCrystalProps = {
  itemIndex?: number
  onPlay?: () => void
}

export const ActivateApprenticeToGainCrystal = (props: ActivateApprenticeToGainCrystalProps) => {
  const { onPlay, itemIndex } = props
  const activateApprenticeForGainCrystal: CustomMove | undefined = useLegalMove<CustomMove>((move: MaterialMove) => {
    if (!isCustomMoveType(CustomMoveType.ActivateApprenticeForGainCrystal)(move)) return false
    const data = move.data as { itemIndex?: number; count?: number }
    return data.itemIndex === itemIndex
  })

  if (!activateApprenticeForGainCrystal) return null

  const data: { itemIndex?: number; player: PlayerColor; count?: number } = activateApprenticeForGainCrystal.data
  if (data.itemIndex !== undefined && data.itemIndex !== itemIndex) return null

  return (
    <PlayMoveButton move={activateApprenticeForGainCrystal} onPlay={onPlay}>
      <Trans
        i18nKey={data.itemIndex !== undefined ? 'button.crystal.activate.apprentice.this' : 'button.crystal.activate.apprentice'}
        values={{ count: data.count }}
        components={components}
      />
    </PlayMoveButton>
  )
}
