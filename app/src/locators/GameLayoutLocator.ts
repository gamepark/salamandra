/** @jsxImportSource @emotion/react */
import { ItemContext, Locator } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { fieldTileDescription } from '../material/FieldTileDescription'

class GameLayoutLocator extends Locator {
  gap = { x: fieldTileDescription.width, y: fieldTileDescription.height }

  getItemRotateZ(_item: MaterialItem, context: ItemContext): number {
    if (context.type === MaterialType.GroveTile) {
      return -45
    }
    return 0
  }

  getCoordinates(location: Location): Partial<Coordinates> {
    const locationX = location.x ?? 0
    const locationY = location.y ?? 0
    const base = this.getBaseCoordinates()
    return { x: (base.x ?? 0) + locationX * this.gap.x, y: (base.y ?? 0) + locationY * this.gap.y }
  }

  getBaseCoordinates(): Partial<Coordinates> {
    return { x: 0, y: 0 }
  }
}

export const gameLayoutLocator = new GameLayoutLocator()
