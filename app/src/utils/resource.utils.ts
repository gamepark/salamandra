import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { Potion } from '@gamepark/salamandra/material/Potion.ts'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor.ts'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove.ts'

export const isWinThisResource = (move: MaterialMove, resource: PrimaryResource) => {
  if (!isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)) return false
  const data = move.data as { resource: PrimaryResource }
  return data.resource === resource
}
export const isWinThisPotion = (move: MaterialMove, potion: Potion) => {
  if (!isCustomMoveType(CustomMoveType.PayCrystalsToGainPotion)(move)) return false
  const data = move.data as { potion: Potion }
  return data.potion === potion
}

export const isPlayerWinThisResource = (move: MaterialMove, player: PlayerColor, resource: PrimaryResource) => {
  if (!isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)) return false
  const data = move.data as { resource: PrimaryResource; player: PlayerColor }
  return data.resource === resource && data.player === player
}

export const isPlayerWinThisPotion = (move: MaterialMove, player: PlayerColor, potion: Potion) => {
  if (!isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)) return false
  const data = move.data as { potion: Potion; player: PlayerColor }
  return data.potion === potion && data.player === player
}
