import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeDivinityLog: FC<MaterialLogProps> = ({ move, context }) => {
  const rules = new SalamandraRules(context.game)
  const moveItem: MoveItem = move as MoveItem
  const item = rules.material(MaterialType.DivinityCard).getItem(moveItem.itemIndex)
  const player = usePlayerName(moveItem.location.player)
  return (
    <Trans
      defaults="log.take-divinity"
      values={{ player }}
      components={{
        ...LogComponents,
        divinity: <PlayMoveButton move={displayMaterialHelp(MaterialType.DivinityCard, item, moveItem.itemIndex, 0)} local />,
        divinityIcon: moveItem.location.type === LocationType.PlayerBearCards ? LogComponents.bear : LogComponents.eagle
      }}
    />
  )
}
