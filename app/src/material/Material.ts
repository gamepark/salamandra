import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { apprenticeTokenDescription } from './ApprenticeTokenDescription'
import { crystalTokenDescription } from './CrystalTokenDescription'
import { divinityCardDescription } from './DivinityCardDescription'
import { druidTileDescription } from './DruidTileDescription'
import { fieldTileDescription } from './FieldTileDescription'
import { groveTileDescription } from './GroveTileDescription'
import { playerMatDescription } from './PlayerMatDescription'
import { salamanderCardDescription } from './SalamanderCardDescription'
import { salamanderTempleTileDescription } from './SalamanderTempleTileDescription'
import { scrollTokenDescription } from './ScrollTokenDescription'
import { secondaryDivinitiesBoardDescription } from './SecondaryDivinitiesBoardDescription'
import { spellBookCardDescription } from './SpellBookCardDescription'
import { venerationPointsBoardDescription } from './VenerationPointsBoardDescription.ts'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.SalamanderTempleTile]: salamanderTempleTileDescription,
  [MaterialType.VenerationPointsBoard]: venerationPointsBoardDescription,
  [MaterialType.SecondaryDivinitiesBoard]: secondaryDivinitiesBoardDescription,
  [MaterialType.PlayerMat]: playerMatDescription,
  [MaterialType.DruidTile]: druidTileDescription,
  [MaterialType.ScrollToken]: scrollTokenDescription,
  [MaterialType.CrystalToken]: crystalTokenDescription,
  [MaterialType.FieldTile]: fieldTileDescription,
  [MaterialType.GroveTile]: groveTileDescription,
  [MaterialType.SpellBookCard]: spellBookCardDescription,
  [MaterialType.DivinityCard]: divinityCardDescription,
  [MaterialType.SalamanderCard]: salamanderCardDescription,
  //[MaterialType.WhiteSalamanderCard]: whiteSalamanderCardDescription,
  [MaterialType.ApprenticeToken]: apprenticeTokenDescription
  //[MaterialType.ScoreMarker]: scoreMarkerDescription
}
