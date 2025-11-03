import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'

export const ExchangeResourceLog: FC<MaterialLogProps> = ({ move }) => {
  const customMove: CustomMove = move as CustomMove
  const player = usePlayerName(customMove.data.player)
  return (
    <Trans
      defaults="log.exchange-resource"
      values={{ player, count: customMove.data.amount }}
      components={{
        ...LogComponents,
        resource: getResource(customMove.data.resource)
      }}
    />
  )
}

const getResource = (resource: PrimaryResource) => {
  if (resource === PrimaryResource.Fruit) return LogComponents.fruit
  if (resource === PrimaryResource.Flower) return LogComponents.flower
  return LogComponents.leaf
}
