import { DeckLocator } from '@gamepark/react-game'

class GroveStackLocator extends DeckLocator {
  gap = { x: -0.02, y: -0.02 }
  coordinates = { x: 30, y: -27 }
}

export const groveStackLocator = new GroveStackLocator()
