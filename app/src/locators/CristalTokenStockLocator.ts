import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class CristalTokenStockLocator extends PileLocator {
  radius = 4
  coordinates = { x: -10, y: -35 }

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const cristalTokenStockLocator = new CristalTokenStockLocator()
