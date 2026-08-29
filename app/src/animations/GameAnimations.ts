import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, LocalMoveType, MoveKind } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .configure((move) => move.kind === MoveKind.LocalMove && move.type === LocalMoveType.ChangeView)
  .skip()

gameAnimations
  .configure((move) => isMoveItemType(MaterialType.ScoreMarker)(move))
  .skip()
