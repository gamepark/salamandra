import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class BearDivinityStackLocator extends DeckLocator {
  parentItemType = MaterialType.SecondaryDivinitiesBoard
  positionOnParent = { x: 85, y: 50 }
}

export const bearDivinityStackLocator = new BearDivinityStackLocator()
