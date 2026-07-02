import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'

export const ScoreLog: FC<MaterialLogProps> = ({ move }) => {
  const customMove: CustomMove = move as CustomMove
  const player = usePlayerName(customMove.data.player)
  return (
    <Trans
      i18nKey="log.score"
      values={{ player, count: customMove.data.score }}
      components={{
        ...LogComponents
      }}
    />
  )
}
