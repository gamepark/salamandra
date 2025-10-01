import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

export class PanelLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    return { x: -65, y: -24 + index * 11 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    return super.placeItem(item, context).concat('scale(0.001)')
  }
}
