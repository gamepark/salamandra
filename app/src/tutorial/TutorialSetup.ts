import { DivinityCard, DivinityId } from '@gamepark/salamandra/material/DivinityCard.ts'
import { FieldTile } from '@gamepark/salamandra/material/FieldTile.ts'
import { groveTiles } from '@gamepark/salamandra/material/GroveTile.ts'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { SalamanderCard, SalamanderId } from '@gamepark/salamandra/material/SalamanderCard.ts'
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

  setUpGroves() {
    this.material(MaterialType.GroveTile).createItems(groveTiles.map((it) => ({ id: it, location: { type: LocationType.GroveStack } })))
    for (const location of this.startGrovesLocations) {
      this.material(MaterialType.GroveTile).location(LocationType.GroveStack).moveItem(location)
    }
    this.material(MaterialType.GroveTile).location(LocationType.GroveStack).shuffle()
  }

  createDivinitiesCardsStack() {
    super.createDivinitiesCardsStack()
    this.material(MaterialType.DivinityCard).id<DivinityId>((id) => id.front === DivinityCard.BearDivinity9).moveItem({ type: LocationType.BearDivinityStack })
    this.material(MaterialType.DivinityCard).id<DivinityId>((id) => id.front === DivinityCard.EagleDivinity9).moveItem({ type: LocationType.EagleDivinityStack })
  }

  setupFieldsStack() {
    super.setupFieldsStack()
    this.material(MaterialType.FieldTile).id(FieldTile.Field11).moveItem({ type: LocationType.FieldStack })
    this.material(MaterialType.FieldTile).id(FieldTile.Field13).moveItem({ type: LocationType.FieldStack })
  }

  createSalamandraCardsStacks() {
    super.createSalamandraCardsStacks()
    this.material(MaterialType.SalamanderCard).id<SalamanderId>((id) => id.front === SalamanderCard.BlackSalamander3).moveItem({ type: LocationType.BlackSalamanderStack })
  }
}
