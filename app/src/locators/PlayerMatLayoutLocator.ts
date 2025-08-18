/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerMatLayoutLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    switch (index) {
      case 0:
        if (context.rules.players.length === 2) return { x: -60, y: 25 }
        return { x: -65, y: 22 }
      case 1:
        if (context.rules.players.length === 2) return { x: 65, y: 25 }
        return { x: -65, y: -13 }
      default:
        return { x: -14, y: 22 }
    }
  }
}

export const playerMatLayoutLocator = new PlayerMatLayoutLocator()
