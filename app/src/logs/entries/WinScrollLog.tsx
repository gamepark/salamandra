import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { CreateItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'

export const WinScrollLog: FC<MaterialLogProps> = ({ move }) => {
  const createItem: CreateItem = move as CreateItem
  const player = usePlayerName(createItem.item.location.player)
  return (
    <Trans
      defaults="log.win-scroll"
      values={{ player, count: createItem.item.quantity ?? 1 }}
      components={{
        ...LogComponents
      }}
    />
  )
}
