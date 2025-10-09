import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { LocationOrigin } from '@gamepark/react-game/src/locators/LocationOrigin.ts'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PanelLocator } from './PanelLocator.ts'

class PlayerMatLayoutLocator extends Locator {
  coordinates = { x: -43, y: -10 }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const rules = context.rules
    const playerView = rules.game.view
    const index = getRelativePlayerIndex(context, item.location.player)
    if (playerView === item.id || (playerView === undefined && index === 0)) return super.placeItem(item, context)
    return new PanelLocator().placeItem(item, context)
  }

  getLocationOrigin(location: Location, context: MaterialContext): LocationOrigin {
    const rules = context.rules
    const playerView = rules.game.view
    const index = getRelativePlayerIndex(context, location.player)
    if (playerView === location.player || (playerView === undefined && index === 0)) return super.getLocationOrigin(location, context)
    return new PanelLocator().getLocationOrigin(location, context)
  }
}

export const playerMatLayoutLocator = new PlayerMatLayoutLocator()
