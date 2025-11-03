import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeGroveLog: FC<MaterialLogProps> = ({ move, context }) => {
  const rules = new SalamandraRules(context.game)
  const moveItem: MoveItem = move as MoveItem
  const item = rules.material(MaterialType.GroveTile).getItem(moveItem.itemIndex)
  const player = usePlayerName(moveItem.location.player)
  return (
    <Trans
      defaults="log.take-grove"
      values={{ player }}
      components={{
        ...LogComponents,
        grove: <PlayMoveButton move={displayMaterialHelp(MaterialType.GroveTile, item, moveItem.itemIndex, 0)} local />
      }}
    />
  )
}
