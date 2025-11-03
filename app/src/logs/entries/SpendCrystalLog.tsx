import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { DeleteItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'

export const SpendCrystalLog: FC<MaterialLogProps> = ({ move, context }) => {
  const deleteItem: DeleteItem = move as DeleteItem
  const rules = new SalamandraRules(context.game)
  const item = rules.material(MaterialType.CrystalToken).getItem(deleteItem.itemIndex)
  const player = usePlayerName(item.location.player)
  return (
    <Trans
      defaults="log.spend-crystal"
      values={{ player, count: deleteItem.quantity ?? 1 }}
      components={{
        ...LogComponents
      }}
    />
  )
}
