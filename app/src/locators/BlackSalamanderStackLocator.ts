import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class BlackSalamanderStackLocator extends DeckLocator {
  parentItemType = MaterialType.SalamanderTempleTile
  positionOnParent = { x: 76.5, y: 50 }
}

export const blackSalamanderStackLocator = new BlackSalamanderStackLocator()
