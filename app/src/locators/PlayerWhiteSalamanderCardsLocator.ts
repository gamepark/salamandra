import { DropAreaDescription, getRelativePlayerIndex, ListLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
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

  placeLocation(location: Location, context: LocationContext) {
    const transform = super.placeLocation(location, context)
    transform.push('translateY(4.7em)')
    return transform
  }

  locationDescription = new DropAreaDescription({ ...salamanderCardDescription, height: salamanderCardDescription.height * 2.5 })
}

export const playerWhiteSalamanderCardsLocator = new PlayerWhiteSalamanderCardsLocator()
