import { getEnumValues, MaterialGame } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { FieldColor } from './FieldTile'
import { SpellBookHelper } from './helper/SpellBookHelper'

export enum SpellBookCard {
  SpellBook1 = 1,
  SpellBook2,
  SpellBook3,
  SpellBook4,
  SpellBook5,
  SpellBook6,
  SpellBook7,
  SpellBook8,
  SpellBook9,
  SpellBook10
}

export const spellBookCards: SpellBookCard[] = getEnumValues(SpellBookCard)

export type SpellBookData = {
  points: number[]
  getMultiple: (game: MaterialGame, player: PlayerColor) => number
}

export const spellBookData: Record<SpellBookCard, SpellBookData> = {
  [SpellBookCard.SpellBook1]: { points: [5, 3], getMultiple: (game, player) => new SpellBookHelper(game, player).getSpecificFields(FieldColor.White) },
  [SpellBookCard.SpellBook2]: { points: [5, 3], getMultiple: (game, player) => new SpellBookHelper(game, player).getSpecificFields(FieldColor.Orange) },
  [SpellBookCard.SpellBook3]: { points: [5, 3], getMultiple: (game, player) => new SpellBookHelper(game, player).getSpecificFields(FieldColor.Green) },
  [SpellBookCard.SpellBook4]: { points: [5, 3], getMultiple: (game, player) => new SpellBookHelper(game, player).getSpecificFields(FieldColor.Purple) },
  [SpellBookCard.SpellBook5]: { points: [5, 3], getMultiple: (game, player) => new SpellBookHelper(game, player).getSalamanderCards() },
  [SpellBookCard.SpellBook6]: { points: [4, 2], getMultiple: (game, player) => new SpellBookHelper(game, player).getDivinityCards() },
  [SpellBookCard.SpellBook7]: { points: [4, 2], getMultiple: (game, player) => new SpellBookHelper(game, player).getGroveTiles() },
  [SpellBookCard.SpellBook8]: { points: [6, 4], getMultiple: (game, player) => new SpellBookHelper(game, player).getCauldrons() },
  [SpellBookCard.SpellBook9]: { points: [9, 5], getMultiple: (game, player) => new SpellBookHelper(game, player).getSpellBooks() },
  [SpellBookCard.SpellBook10]: { points: [17, 10], getMultiple: (_game, _player) => 1 }
}
