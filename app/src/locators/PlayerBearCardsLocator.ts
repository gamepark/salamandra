import { DropAreaDescription, getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { divinityCardDescription } from '../material/DivinityCardDescription'

class PlayerBearCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: 110, y: 37 }
  gap = { y: divinityCardDescription.height * 0.55 }

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    const index = getRelativePlayerIndex(context, location.player)
    if (context.player === undefined || index > 0) return this.positionOnParent
    return { x: 102, y: 125 }
  }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getHoverTransform = (item: MaterialItem, context: MaterialContext) => {
    const index = getRelativePlayerIndex(context, item.location.player)
    if (context.player === undefined || index > 0) return []
    return ['translateX(50%)', 'translateZ(10em)', 'scale(2.5)']
  }

  locationDescription = new DropAreaDescription(divinityCardDescription)
}

export const playerBearCardsLocator = new PlayerBearCardsLocator()
