import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor.ts'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove.ts'

export const isWinThisResource = (move: MaterialMove, resource: PrimaryResource) => {
  if (!isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)) return false
  const data = move.data as { resource: PrimaryResource }
  return data.resource === resource
}

export const isPlayerWinThisResource = (move: MaterialMove, player: PlayerColor, resource: PrimaryResource) => {
  if (!isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)) return false
  const data = move.data as { resource: PrimaryResource; player: PlayerColor }
  return data.resource === resource && data.player === player
}
