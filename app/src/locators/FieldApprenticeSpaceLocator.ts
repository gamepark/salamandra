import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { apprenticeTokenDescription } from '../material/ApprenticeTokenDescription.tsx'

class FieldApprenticeSpaceLocator extends Locator {
  parentItemType = MaterialType.FieldTile

  getPositionOnParent(location: Location): XYCoordinates {
    return positions[location.x ?? 0]
  }

  locationDescription = new DropAreaDescription(apprenticeTokenDescription)
}

const positions = [
  { x: 50, y: 15 }, // Field 0, Space 0
  { x: 85, y: 50 }, // Field 0, Space 1
  { x: 50, y: 85 }, // Field 0, Space 2
  { x: 15, y: 50 } // Field 0, Space 3
]

export const fieldApprenticeSpaceLocator = new FieldApprenticeSpaceLocator()
