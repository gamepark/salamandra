import { FlexLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

class Score100MarkerIdlePlaceLocator extends FlexLocator {
  parentItemType = MaterialType.VenerationPointsBoard
  positionOnParent = { x: 28.5, y: 72.5 }
  lineSize = 2
  maxLines = 2
  gap = { x: 1.5, y: 0 }
  lineGap = { x: 0, y: 1.5 }
}

export const score100MarkerIdlePlaceLocator = new Score100MarkerIdlePlaceLocator()
