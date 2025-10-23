import { DeckLocator, OriginType } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class BearDivinityStackLocator extends DeckLocator {
  parentItemType = MaterialType.SecondaryDivinitiesBoard
  positionOnParent = { x: 85, y: 50 }

  locationOrigin = { x: OriginType.Min, y: OriginType.Max }

  navigationSorts = []
}

export const bearDivinityStackLocator = new BearDivinityStackLocator()
