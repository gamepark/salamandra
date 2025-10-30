import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { components } from '../../material/help/utils.tsx'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlaceApprenticeLog: FC<MaterialLogProps> = ({ move, context }) => {
  const rules = new SalamandraRules(context.game)
  const moveItem: MoveItem = move as MoveItem
  const item = rules.material(MaterialType.ApprenticeToken).getItem(moveItem.itemIndex)
  const tile = rules.material(MaterialType.FieldTile).getItem(moveItem.location.parent!)
  const player = usePlayerName(item.id)
  return (
    <Trans
      defaults="log.place-apprentice"
      values={{ player, color: 'blue' }}
      components={{
        ...components,
        field: <PlayMoveButton move={displayMaterialHelp(MaterialType.FieldTile, tile, moveItem.location.parent, 0)} local />
      }}
    />
  )
}
