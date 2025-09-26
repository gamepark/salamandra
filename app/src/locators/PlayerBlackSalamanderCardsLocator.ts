import { DropAreaDescription, getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { salamanderCardDescription } from '../material/SalamanderCardDescription'
import { playerWhiteSalamanderCardsLocator } from './PlayerWhiteSalamanderCardsLocator'

class PlayerBlackSalamanderCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: playerWhiteSalamanderCardsLocator.positionOnParent.x, y: playerWhiteSalamanderCardsLocator.positionOnParent.y + 22 }
  gap = { y: salamanderCardDescription.height * 0.55 }

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    const index = getRelativePlayerIndex(context, location.player)
    if (context.player === undefined || index > 0) return this.positionOnParent
    const whiteSalamandraCoordinates = playerWhiteSalamanderCardsLocator.getPositionOnParent(location, context)
    return { x: whiteSalamandraCoordinates.x + 20, y: whiteSalamandraCoordinates.y }
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

export const playerBlackSalamanderCardsLocator = new PlayerBlackSalamanderCardsLocator()
