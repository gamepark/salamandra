import { Locator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Location } from '@gamepark/rules-api'

class FieldSpaceLocator extends Locator {
  parentItemType = MaterialType.VenerationPointsBoard

  getPositionOnParent(location: Location) {
    switch (location.x) {
      case 0:
        return { x: 10, y: 112.5 }
      case 1:
        return { x: 36.7, y: 112.5 }
      case 2:
        return { x: 63.4, y: 112.5 }
      case 3:
      default:
        return { x: 90.1, y: 112.5 }
    }
  }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2.5)']
}

export const fieldSpaceLocator = new FieldSpaceLocator()
