import { Locator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class PlayerDruidSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: -3.5, y: 54 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }
}

export const playerDruidSpaceLocator = new PlayerDruidSpaceLocator()
