import { DropAreaDescription, getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { divinityCardDescription } from '../material/DivinityCardDescription'
import { playerBearCardsLocator } from './PlayerBearCardsLocator'

class PlayerEagleCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: playerBearCardsLocator.positionOnParent.x + 20, y: playerBearCardsLocator.positionOnParent.y }
  gap = { y: divinityCardDescription.height * 0.55 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getHoverTransform = (item: MaterialItem, context: MaterialContext) => {
    const index = getRelativePlayerIndex(context, item.location.player)
    if (context.player === undefined || index > 0) return []
    return ['translateZ(10em)', 'scale(2.5)']
  }

  locationDescription = new DropAreaDescription(divinityCardDescription)
}

export const playerEagleCardsLocator = new PlayerEagleCardsLocator()
