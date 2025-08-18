import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class FieldStackLocator extends DeckLocator {
  parentItemType = MaterialType.VenerationPointsBoard
  positionOnParent = { x: -15, y: 112.5 }
}

export const fieldStackLocator = new FieldStackLocator()
