import { Locator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, Location, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class PlayerApprenticesSpaceLocator extends Locator {
  parentItemType = MaterialType.PlayerMat

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  getPositionOnParent(location: Location): XYCoordinates {
    return positions[location.id as number][location.x ?? 0]
  }
}

const positions = [
  [
    { x: 47.4, y: 38 },
    { x: 47.4, y: 54 },
    { x: 47.4, y: 70 }
  ],
  [
    { x: 61.4, y: 46 },
    { x: 61.4, y: 62 }
  ],
  [
    { x: 75.4, y: 38 },
    { x: 75.4, y: 54 },
    { x: 75.4, y: 70 }
  ],
  [
    { x: 89.4, y: 46 },
    { x: 89.4, y: 62 }
  ]
]

export const playerApprenticesSpaceLocator = new PlayerApprenticesSpaceLocator()
