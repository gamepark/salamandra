import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { bearDivinityStackLocator } from './BearDivinityStackLocator'
import { blackSalamanderStackLocator } from './BlackSalamanderStackLocator'
import { cristalTokenStockLocator } from './CristalTokenStockLocator'
import { eagleDivinityStackLocator } from './EagleDivinityStackLocator'
import { fieldSpaceLocator } from './FieldSpaceLocator'
import { fieldStackLocator } from './FieldStackLocator'
import { gameLayoutLocator } from './GameLayoutLocator'
import { groveStackLocator } from './GroveStackLocator'
import { playerApprenticesSpaceLocator } from './PlayerApprenticesSpaceLocator'
import { playerDruidSpaceLocator } from './PlayerDruidSpaceLocator'
import { playerMatLayoutLocator } from './PlayerMatLayoutLocator'
import { score100MarkerIdlePlaceLocator } from './Score100MarkerIdlePlaceLocator'
import { scorePisteLocator } from './ScorePisteLocator'
import { scrollTokenStockLocator } from './ScrollTokenStockLocator'
import { secondaryDivinitiesLayoutLocator } from './SecondaryDivinitiesLayoutLocator'
import { spellBookSpaceLocator } from './SpellBookSpaceLocator'
import { venerationPointsLayoutLocator } from './VenerationPointsLayoutLocator'
import { whiteSalamanderStackLocator } from './WhiteSalamanderStackLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.GameLayout]: gameLayoutLocator,
  [LocationType.WhiteSalamanderStack]: whiteSalamanderStackLocator,
  [LocationType.BlackSalamanderStack]: blackSalamanderStackLocator,
  [LocationType.VenerationPointsLayout]: venerationPointsLayoutLocator,
  [LocationType.GroveStack]: groveStackLocator,
  [LocationType.FieldStack]: fieldStackLocator,
  [LocationType.FieldSpace]: fieldSpaceLocator,
  [LocationType.SpellBookSpace]: spellBookSpaceLocator,
  [LocationType.SecondaryDivinitiesLayout]: secondaryDivinitiesLayoutLocator,
  [LocationType.BearDivinityStack]: bearDivinityStackLocator,
  [LocationType.EagleDivinityStack]: eagleDivinityStackLocator,
  [LocationType.CristalTokenStock]: cristalTokenStockLocator,
  [LocationType.ScrollTokenStock]: scrollTokenStockLocator,
  [LocationType.PlayerMatLayout]: playerMatLayoutLocator,
  [LocationType.PlayerDruidSpace]: playerDruidSpaceLocator,
  [LocationType.PlayerApprenticesSpace]: playerApprenticesSpaceLocator,
  [LocationType.Score100MarkerIdlePlace]: score100MarkerIdlePlaceLocator,
  [LocationType.ScorePiste]: scorePisteLocator
}
