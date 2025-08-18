import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class WhiteSalamanderStackLocator extends DeckLocator {
  parentItemType = MaterialType.SalamanderTempleTile
  positionOnParent = { x: 23.5, y: 50 }
}

export const whiteSalamanderStackLocator = new WhiteSalamanderStackLocator()
