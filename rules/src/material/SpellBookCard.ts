import { getEnumValues } from '@gamepark/rules-api'

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
