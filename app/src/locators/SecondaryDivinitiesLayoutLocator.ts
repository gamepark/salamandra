import { Locator, OriginType } from '@gamepark/react-game'

class SecondaryDivinitiesLayoutLocator extends Locator {
  coordinates = { x: 9, y: -7, z: 2 }
  locationOrigin = { x: OriginType.Min, y: OriginType.Max }
}

export const secondaryDivinitiesLayoutLocator = new SecondaryDivinitiesLayoutLocator()
