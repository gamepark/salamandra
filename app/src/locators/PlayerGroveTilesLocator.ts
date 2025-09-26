import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class PlayerGroveTilesLocator extends Locator {
  parentItemType = MaterialType.PlayerMat

  getItemRotateZ(): number {
    return 45
  }

  getPositionOnParent(location: Location): XYCoordinates {
    if (location.x === undefined) return { x: 50, y: 1.5 }
    switch (location.x) {
      case 0:
        return { x: 0.8, y: 1.5 }
      case 1:
        return { x: 17.3, y: -11 }
      case 2:
        return { x: 33.7, y: 1.5 }
      case 3:
        return { x: 50.1, y: -11 }
      case 4:
        return { x: 66.5, y: 1.5 }
      case 5:
        return { x: 82.9, y: -11 }
      // Default is for location (the green one) that has no x
      default:
        return { x: 99.3 + (location.x - 6) * 0.3, y: 1.5 + (location.x - 6) * 0.3 }
    }
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new PlayerGroveTileDescription()
}

class PlayerGroveTileDescription extends DropAreaDescription {
  width = 30
  height = 6
}

export const playerGroveTilesLocator = new PlayerGroveTilesLocator()
