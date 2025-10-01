import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, LocalMoveType, MoveKind } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move) => move.kind === MoveKind.LocalMove && move.type === LocalMoveType.ChangeView)
  .none()

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.ScoreMarker)(move))
  .none()
