import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { Locator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {}
