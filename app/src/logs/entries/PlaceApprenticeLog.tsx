import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { fieldData, FieldTile } from '@gamepark/salamandra/material/FieldTile.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlaceApprenticeLog: FC<MaterialLogProps> = ({ move, context }) => {
  const rules = new SalamandraRules(context.game)
  const { t } = useTranslation()
  const moveItem: MoveItem = move as MoveItem
  const item = rules.material(MaterialType.ApprenticeToken).getItem(moveItem.itemIndex)
  const tile = rules.material(MaterialType.FieldTile).getItem<FieldTile>(moveItem.location.parent!)
  const colors = fieldData[tile.id].colors
  const player = usePlayerName(item.id)
  return (
    <Trans
      i18nKey={moveItem.location.x === 0 ? 'log.place-apprentice.bonus' : 'log.place-apprentice'}
      values={{ player, color: colors.map((c) => t(`field.color.${c}`)).join(' / ') }}
      components={{
        ...LogComponents,
        field: <PlayMoveButton move={displayMaterialHelp(MaterialType.FieldTile, tile, moveItem.location.parent, 0)} local />
      }}
    />
  )
}
