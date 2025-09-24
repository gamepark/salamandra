import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.ScoreMarker)(move))
  .none()
