import { DropAreaDescription, getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { divinityCardDescription } from '../material/DivinityCardDescription'
import { playerBlackSalamanderCardsLocator } from './PlayerBlackSalamanderCardsLocator.ts'

class PlayerBearCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: playerBlackSalamanderCardsLocator.positionOnParent.x + 20, y: playerBlackSalamanderCardsLocator.positionOnParent.y }
  gap = { y: divinityCardDescription.height * 0.55 }

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
