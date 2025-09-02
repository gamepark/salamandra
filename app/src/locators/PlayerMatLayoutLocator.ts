/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerMatLayoutLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    switch (index) {
      case 0:
        return { x: -64, y: 13.5 }
      case 1:
        if (context.rules.players.length === 2) return { x: 66, y: 13.5 }
        return { x: -64, y: -13.5 }
      case 2:
        return { x: 66, y: -13.5 }
      default:
        return { x: 66, y: 13.5 }
    }
  }
}

export const playerMatLayoutLocator = new PlayerMatLayoutLocator()
