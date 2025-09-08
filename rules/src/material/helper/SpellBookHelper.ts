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

  getDivinityCards(): number {
    const playerEagleDivinityCards = this.material(MaterialType.EagleDivinityCard).location(LocationType.PlayerEagleCards).player(this.player)
    const playerBearDivinityCards = this.material(MaterialType.BearDivinityCard).location(LocationType.PlayerBearCards).player(this.player)
    return playerBearDivinityCards.length + playerEagleDivinityCards.length
  }

  getSalamanderCards(): number {
    const playerWhiteSalamanderCards = this.material(MaterialType.WhiteSalamanderCard).location(LocationType.PlayerWhiteSalamanderCards).player(this.player)
    const playerBlackSalamanderCards = this.material(MaterialType.BlackSalamanderCard).location(LocationType.PlayerBlackSalamanderCards).player(this.player)
    return playerBlackSalamanderCards.length + playerWhiteSalamanderCards.length
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
