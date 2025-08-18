import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class EagleDivinityStackLocator extends DeckLocator {
  parentItemType = MaterialType.SecondaryDivinitiesBoard
  positionOnParent = { x: 20, y: 50 }
}

export const eagleDivinityStackLocator = new EagleDivinityStackLocator()
