import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { CustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { fieldData, FieldTile, FieldType } from '@gamepark/salamandra/material/FieldTile.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ActivateFieldLog: FC<MaterialLogProps> = ({ move, context }) => {
  const rules = new SalamandraRules(context.game)
  const { t } = useTranslation()
  const customMove: CustomMove = move as CustomMove
  const item = rules.material(MaterialType.ApprenticeToken).getItem(customMove.data)
  const tile = rules.material(MaterialType.FieldTile).getItem<FieldTile>(item.location.parent!)
  const fieldDatum = fieldData[tile.id]
  const colors = fieldDatum.colors
  const player = usePlayerName(item.id)
  return (
    <Trans
      i18nKey="log.activate-field"
      values={{ player, color: colors.map((c) => t(`field.color.${c}`)).join(' / ') }}
      components={{
        ...LogComponents,
        field: <PlayMoveButton move={displayMaterialHelp(MaterialType.FieldTile, tile, item.location.parent, 0)} local />,
        fieldEffectType: fieldDatum.type === FieldType.Cauldron ? LogComponents.cauldron : LogComponents.sickle
      }}
    />
  )
}
