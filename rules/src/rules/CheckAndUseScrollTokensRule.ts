import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Potion } from '../material/Potion'
import { PrimaryResource } from '../material/PrimaryResource'
import { PlayerColor } from '../PlayerColor'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class CheckAndUseScrollTokensRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.playerScrollTokens.getQuantity() < 4 || this.getPossibleLocations().length === 0) {
      return this.goToNextPlayer()
    }

    return [this.playerScrollTokens.deleteItem(4)]
  }

  goToNextPlayer() {
    const playersWhoPassed = this.remind<PlayerColor[]>(MemoryType.PlayersWhoPassed)
    if (playersWhoPassed.length === this.game.players.length - 1 && !playersWhoPassed.includes(this.player)) {
      return [this.startRule(RuleId.CheckPassAndEmptyPlaces)]
    }

    return [this.startPlayerTurn(RuleId.CheckPassAndEmptyPlaces, this.nextPlayer)]
  }

  getPlayerMoves() {
    return this.getPossibleLocations().flatMap((location: Location) =>
      this.playerApprenticeTokenInField.moveItems((item) => ({ ...location, rotation: item.location.rotation }))
    )
  }

  getPossibleLocations(): Location[] {
    const locations: Location[] = []
    const spellBooksIndexes = this.spellBookWithoutApprentice.getIndexes()

    for (const spellBooIndex of spellBooksIndexes) {
      for (let x = 0; x < 2; x++) {
        const hasApprentice =
          this.material(MaterialType.ApprenticeToken)
            .location((loc) => loc.type === LocationType.SpellBookApprenticeSpace && loc.x === x)
            .parent(spellBooIndex).length > 0
        if (!hasApprentice) {
          locations.push({ type: LocationType.SpellBookApprenticeSpace, parent: spellBooIndex, x })
        }
      }
    }
    return locations
  }

  get spellBookWithoutApprentice() {
    const apprentices = this.spellBookApprentices
    return this.material(MaterialType.SpellBookCard)
      .location(LocationType.SpellBookSpace)
      .filter((_, index) => !apprentices.some((item) => item.location.parent === index))
  }

  get spellBookApprentices() {
    return this.material(MaterialType.ApprenticeToken).location(LocationType.SpellBookApprenticeSpace).id(this.player).getItems()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.ApprenticeToken)(move) || move.location.type !== LocationType.SpellBookApprenticeSpace) return []
    return this.goToNextPlayer()
  }

  get playerScrollTokens() {
    return this.material(MaterialType.ScrollToken).location(LocationType.PlayerScrollTokenStock).player(this.player)
  }

  get playerApprenticeTokenInField() {
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
  }

  onRuleEnd(): MaterialMove[] {
    const initialResources: Record<PrimaryResource, number> = {
      [PrimaryResource.Leaf]: 0,
      [PrimaryResource.Fruit]: 0,
      [PrimaryResource.Flower]: 0
    }
    this.memorize(MemoryType.PlayerPrimaryResources, initialResources, this.player)
    const initialPotions: Record<Potion, number> = {
      [Potion.Leaf]: 0,
      [Potion.FlowerOrFruit]: 0
    }
    this.memorize(MemoryType.PlayerPotions, initialPotions, this.player)
    return []
  }
}
