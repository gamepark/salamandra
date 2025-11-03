import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlaceOnSpellbookLog: FC<MaterialLogProps> = ({ move, context }) => {
  const moveItem: MoveItem = move as MoveItem
  const rules = new SalamandraRules(context.game)
  const spellBook = rules.material(MaterialType.SpellBookCard).getItem(moveItem.location.parent!)
  const player = usePlayerName(context.action.playerId)
  return (
    <Trans
      defaults="log.place-on-spellbook"
      values={{ player }}
      components={{
        ...LogComponents,
        salamandra: <PlayMoveButton move={displayMaterialHelp(MaterialType.SpellBookCard, spellBook, moveItem.itemIndex, 0)} local />
      }}
    />
  )
}
