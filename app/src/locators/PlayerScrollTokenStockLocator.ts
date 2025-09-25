import { FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { scrollTokenDescription } from '../material/ScrollTokenDescription.ts'

class PlayerScrollTokenStockLocator extends FlexLocator {
  parentItemType = MaterialType.PlayerMat
  lineSize = 4

  gap = { x: scrollTokenDescription.width + 1.3 }
  lineGap = { y: scrollTokenDescription.height + 0.5 }

  getPositionOnParent(location: Location): XYCoordinates {
    if (location.x === undefined) return { x: 50, y: 1.2 }
    return { x: 41, y: 96.5 }
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }
}

export const playerScrollTokenStockLocator = new PlayerScrollTokenStockLocator()
