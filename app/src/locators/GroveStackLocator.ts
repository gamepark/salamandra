import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class GroveStackLocator extends DeckLocator {
  parentItemType = MaterialType.VenerationPointsBoard
  positionOnParent = { x: 110, y: 20 }
}

export const groveStackLocator = new GroveStackLocator()
