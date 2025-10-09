import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class PlayerActualRoundApprenticesSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerMat

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getPositionOnParent(location: Location): XYCoordinates {
    return {
      x: 22,
      y: (!location.rotation ? 38 : 46) + 16 * location.x!
    }
  }
}

export const playerActualRoundApprenticesSpaceLocator = new PlayerActualRoundApprenticesSpaceLocator()
