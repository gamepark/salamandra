import { MaterialContext, Locator } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class PlayerScrollTokenStockLocator extends Locator {
  parentItemType = MaterialType.PlayerMat

  getPositionOnParent(location: Location): XYCoordinates {
    if (location.x === undefined) return { x: 50, y: 1.2 }
    switch (location.x) {
      case 0:
        return { x: 41, y: 96.5 }
      case 1:
        return { x: 51.7, y: 96.5 }
      case 2:
        return { x: 62.4, y: 100 }
      case 3:
      default:
        return { x: 73.1, y: 100 }
    }
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }
}

export const playerScrollTokenStockLocator = new PlayerScrollTokenStockLocator()
