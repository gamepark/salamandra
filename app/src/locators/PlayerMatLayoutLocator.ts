import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext, OriginType } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PanelLocator } from './PanelLocator.ts'

class PlayerMatLayoutLocator extends Locator {
  coordinates = { x: 35, y: 21 }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const rules = context.rules
    const playerView = rules.game.view
    const index = getRelativePlayerIndex(context, item.location.player)
    if (playerView === item.id || (playerView === undefined && index === 0)) return super.placeItem(item, context)
    return new PanelLocator().placeItem(item, context)
  }

  getPositionDependencies(_location: Location, context: MaterialContext): unknown {
    return { view: context.rules.game.view }
  }

  locationOrigin = { x: OriginType.Min, y: OriginType.Min }
}

export const playerMatLayoutLocator = new PlayerMatLayoutLocator()
