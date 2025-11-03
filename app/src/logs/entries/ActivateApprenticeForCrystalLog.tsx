import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'

export const ActivateApprenticeForCrystalLog: FC<MaterialLogProps> = ({ move }) => {
  const customMove: CustomMove = move as CustomMove
  const player = usePlayerName(customMove.data.player)
  return (
    <Trans
      defaults="log.activate-apprentice-for-crystal"
      values={{ player }}
      components={{
        ...LogComponents
      }}
    />
  )
}
