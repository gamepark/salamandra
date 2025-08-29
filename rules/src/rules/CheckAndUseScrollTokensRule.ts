import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Potion } from '../material/Potion'
import { PrimaryResource } from '../material/PrimaryResource'
import { MemoryType } from './MemoryType'
import { RuleId } from './RuleId'

export class CheckAndUseScrollTokensRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.playerScrollTokens.length < 4) {
      return [this.startPlayerTurn(RuleId.CheckPassAndEmptyPlaces, this.nextPlayer)]
    }
    return [this.playerScrollTokens.limit(4).moveItemsAtOnce({ type: LocationType.ScrollTokenStock })]
  }

  getPlayerMoves() {
    return this.getPossibleLocations().flatMap((location: Location) => this.playerApprenticeTokenInField.moveItems((item) => ({...location, rotation: item.location.rotation})))
  }

  getPossibleLocations(): Location[] {
    const locations: Location[] = []
    const spellBooksIndexes = this.material(MaterialType.SpellBookCard).location(LocationType.SpellBookSpace).getIndexes()
    spellBooksIndexes.forEach((index) => {
      for (let x = 0; x < 2; x++) {
        const hasApprentice =
          this.material(MaterialType.ApprenticeToken)
            .location((loc) => loc.type === LocationType.SpellBookApprenticeSpace && loc.x === x)
            .parent(index)
            .getItems().length > 0
        if (!hasApprentice) {
          locations.push({ type: LocationType.SpellBookApprenticeSpace, parent: index, x })
        }
      }
    })
    return locations
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.ApprenticeToken)(move)) {
      return [this.startPlayerTurn(RuleId.CheckPassAndEmptyPlaces, this.nextPlayer)]
    }
    return []
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
