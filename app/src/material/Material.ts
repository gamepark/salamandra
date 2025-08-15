import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { apprenticeDiscDescription } from './ApprenticeDiscDescription'
import { bearDivinityCardDescription } from './BearDivinityCardDescription'
import { blackSalamanderCardDescription } from './BlackSalamanderCardDescription'
import { crystalTokenDescription } from './CrystalTokenDescription'
import { druidTileDescription } from './DruidTileDescription'
import { eagleDivinityCardDescription } from './EagleDivinityCardDescription'
import { fieldTileDescription } from './FieldTileDescription'
import { groveTileDescription } from './GroveTileDescription'
import { playerMatDescription } from './PlayerMatDescription'
import { salamanderTempleTileDescription } from './SalamanderTempleTileDescription'
import { scoreMarkerDescription } from './ScoreMarkerDescription'
import { scrollTokenDescription } from './ScrollTokenDescription'
import { secondaryDivinitiesBoardDescription } from './SecondaryDivinitiesBoardDescription'
import { spellBookCardDescription } from './SpellBookCardDescription'
import { venerationPointsBoardDescription } from './VenerationPointsBoardDescription'
import { whiteSalamanderCardDescription } from './WhiteSalamanderCardDescription'

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
  [MaterialType.BearDivinityCard]: bearDivinityCardDescription,
  [MaterialType.EagleDivinityCard]: eagleDivinityCardDescription,
  [MaterialType.BlackSalamanderCard]: blackSalamanderCardDescription,
  [MaterialType.WhiteSalamanderCard]: whiteSalamanderCardDescription,
  [MaterialType.ApprenticeDisc]: apprenticeDiscDescription,
  [MaterialType.ScoreMarker]: scoreMarkerDescription
}
