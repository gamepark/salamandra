import { Locator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, Location, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class PlayerApprenticesSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerMat

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getPositionOnParent(location: Location): XYCoordinates {
    const id = location.id as number
    return {
      x: 47.4 + 14 * id,
      y: (id % 2 === 0 ? 38 : 46) + 16 * location.x!
    }
  }
}

export const playerApprenticesSpaceLocator = new PlayerApprenticesSpaceLocator()
