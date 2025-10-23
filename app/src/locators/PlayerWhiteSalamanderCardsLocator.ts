import { DropAreaDescription, getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { salamanderCardDescription } from '../material/SalamanderCardDescription'

class PlayerWhiteSalamanderCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: 5, y: 160 }
  gap = { y: salamanderCardDescription.height * 0.55 }

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
