import { OriginType, PileLocator } from '@gamepark/react-game'

class ScrollTokenStockLocator extends PileLocator {
  radius = 1
  coordinates = { x: 20, y: -4 }
  locationOrigin = { x: OriginType.Min, y: OriginType.Max }
}

export const scrollTokenStockLocator = new ScrollTokenStockLocator()
