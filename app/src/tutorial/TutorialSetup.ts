import { FieldTile } from '@gamepark/salamandra/material/FieldTile.ts'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamandraSetup } from '@gamepark/salamandra/SalamandraSetup.ts'

export class TutorialSetup extends SalamandraSetup {
  setupStartFields() {
    this.material(MaterialType.FieldTile).createItems([
      { id: FieldTile.StartField1, location: { type: LocationType.GameLayout, x: 1, y: -1 } },
      { id: FieldTile.StartField2, location: { type: LocationType.GameLayout, x: 0, y: 1 } },
      { id: FieldTile.StartField3, location: { type: LocationType.GameLayout, x: 0, y: -1 } },
      { id: FieldTile.StartField4, location: { type: LocationType.GameLayout, x: 1, y: 1 } }
    ])
  }
}
