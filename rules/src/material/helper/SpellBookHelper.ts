import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerColor } from '../../PlayerColor'
import { FieldColor, fieldData, FieldTile, FieldType } from '../FieldTile'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'

export class SpellBookHelper extends MaterialRulesPart {
  player?: PlayerColor

  constructor(game: MaterialGame, player: PlayerColor) {
    super(game)
    this.player = player
  }

  getSpecificFields(fieldColor: FieldColor): number {
    const fieldsIndexes = this.material(MaterialType.FieldTile)
      .location(LocationType.GameLayout)
      .filter<FieldTile>((item) => fieldData[item.id].colors.includes(fieldColor))
      .getIndexes()
    return this.getNbFieldsWithPlayerApprentice(fieldsIndexes)
  }

  getCauldrons(): number {
    const cauldronIndexes = this.material(MaterialType.FieldTile)
      .location(LocationType.GameLayout)
      .filter<FieldTile>((item) => fieldData[item.id].type === FieldType.Cauldron)
      .getIndexes()
    return this.getNbFieldsWithPlayerApprentice(cauldronIndexes)
  }

  get divinityCount(): number {
    return this.material(MaterialType.DivinityCard).player(this.player).length
  }

  get salamanderCount(): number {
    return this.material(MaterialType.SalamanderCard).player(this.player).length
  }

  getGroveTiles(): number {
    const playerGroveTiles = this.material(MaterialType.GroveTile).location(LocationType.PlayerGroveTiles).player(this.player)
    return playerGroveTiles.length
  }

  getSpellBooks(): number {
    const spellBooksIndexes = this.material(MaterialType.SpellBookCard).location(LocationType.SpellBookSpace).getIndexes()

    let total = 0
    spellBooksIndexes.forEach((index) => {
      const apprentices = this.material(MaterialType.ApprenticeToken).location(LocationType.SpellBookApprenticeSpace).parent(index)
      if (apprentices.length > 0) {
        total += 1
      }
    })

    return total
  }

  private getNbFieldsWithPlayerApprentice(fieldsIndexes: number[]) {
    let total = 0
    fieldsIndexes.forEach((index) => {
      const apprentices = this.material(MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace).parent(index)
      if (apprentices.length > 0) {
        total += 1
      }
    })
    return total
  }
}
