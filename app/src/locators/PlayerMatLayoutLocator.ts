import { getRelativePlayerIndex, ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PanelLocator } from './PanelLocator.ts'

class PlayerMatLayoutLocator extends Locator {
  coordinates = { x: -43, y: -10 }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const rules = context.rules
    const playerView = rules.game.view
    const index = getRelativePlayerIndex(context, item.location.player)
    if (playerView === item.id || (playerView === undefined && index === 0)) return super.placeItem(item, context)
    if (playerView !== item.id) return new PanelLocator().placeItem(item, context)
    return new PanelLocator().placeItem(item, context)
  }
}

export const playerMatLayoutLocator = new PlayerMatLayoutLocator()
