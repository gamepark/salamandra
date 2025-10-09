import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext, OriginType } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

export class PanelLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    return { x: 10, y: 2.5 + index * 10.4 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    return super.placeItem(item, context).concat('scale(0.001)')
  }

  locationOrigin = { x: OriginType.Min, y: OriginType.Min }
}
