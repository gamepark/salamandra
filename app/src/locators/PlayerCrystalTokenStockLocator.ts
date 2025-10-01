import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class PlayerCrystalTokenStockLocator extends PileLocator {
  parentItemType = MaterialType.PlayerMat
  radius = 1.5
  positionOnParent = { x: 12, y: 105 }

  minimumDistance = 0.5
  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player} + ${item.id}`
  }
}

export const playerCrystalTokenStockLocator = new PlayerCrystalTokenStockLocator()
