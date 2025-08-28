import { Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class SpellBookApprenticeSpaceLocator extends Locator {
  parentItemType = MaterialType.SpellBookCard

  getPositionOnParent(location: Location): XYCoordinates {
    return positions[location.x ?? 0]
  }
}

const positions = [
  { x: 65, y: 28 },
  { x: 65, y: 70 }
]

export const spellBookApprenticeSpaceLocator = new SpellBookApprenticeSpaceLocator()
