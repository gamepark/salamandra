import { DropAreaDescription, getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { salamanderCardDescription } from '../material/SalamanderCardDescription'
import { playerEagleCardsLocator } from './PlayerEagleCardsLocator'

class PlayerWhiteSalamanderCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: playerEagleCardsLocator.positionOnParent.x, y: playerEagleCardsLocator.positionOnParent.y + 22 }
  gap = { y: salamanderCardDescription.height * 0.55 }

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    const index = getRelativePlayerIndex(context, location.player)
    if (context.player === undefined || index > 0) return this.positionOnParent
    const eagleCoordinates = playerEagleCardsLocator.getPositionOnParent(location, context)
    return { x: eagleCoordinates.x + 10, y: eagleCoordinates.y }
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getHoverTransform = (item: MaterialItem, context: MaterialContext) => {
    const index = getRelativePlayerIndex(context, item.location.player)
    if (context.player === undefined || index > 0) return []
    return ['translateZ(10em)', 'scale(2.5)']
  }

  locationDescription = new DropAreaDescription(salamanderCardDescription)
}

export const playerWhiteSalamanderCardsLocator = new PlayerWhiteSalamanderCardsLocator()
