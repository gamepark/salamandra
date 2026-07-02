import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeSalamandraLog: FC<MaterialLogProps> = ({ move, context }) => {
  const rules = new SalamandraRules(context.game)
  const moveItem: MoveItem = move as MoveItem
  const item = rules.material(MaterialType.SalamanderCard).getItem(moveItem.itemIndex)
  const player = usePlayerName(moveItem.location.player)
  return (
    <Trans
      i18nKey="log.take-divinity"
      values={{ player }}
      components={{
        ...LogComponents,
        salamandra: <PlayMoveButton move={displayMaterialHelp(MaterialType.SalamanderCard, item, moveItem.itemIndex, 0)} local />
      }}
    />
  )
}
