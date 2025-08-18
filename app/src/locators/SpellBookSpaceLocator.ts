import { Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Location } from '@gamepark/rules-api'

class SpellBookSpaceLocator extends Locator {
  parentItemType = MaterialType.VenerationPointsBoard

  getPositionOnParent(location: Location) {
    switch (location.x) {
      case 0:
        return { x: 5, y: -10 }
      case 1:
        return { x: 27.5, y: -10 }
      case 2:
        return { x: 50, y: -10 }
      case 3:
        return { x: 72.5, y: -10 }
      case 4:
      default:
        return { x: 95, y: -10 }
    }
  }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2.5)']
}

export const spellBookSpaceLocator = new SpellBookSpaceLocator()
