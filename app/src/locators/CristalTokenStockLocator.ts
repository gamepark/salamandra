import { OriginType, PileLocator } from '@gamepark/react-game'

class CristalTokenStockLocator extends PileLocator {
  radius = 1.5
  coordinates = { x: 20, y: -9 }

  locationOrigin = { x: OriginType.Min, y: OriginType.Max }
}

export const cristalTokenStockLocator = new CristalTokenStockLocator()
