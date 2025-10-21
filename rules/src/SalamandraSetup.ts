import { MaterialGameSetup } from '@gamepark/rules-api'
import { sampleSize, shuffle } from 'es-toolkit'
import { DivinityType } from './material/Bonus'
import { bearDivinityCards, eagleDivinityCards } from './material/DivinityCard'
import { fieldTiles, startFieldTiles } from './material/FieldTile'
import { groveTiles } from './material/GroveTile'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Potion } from './material/Potion'
import { PrimaryResource } from './material/PrimaryResource'
import { blackSalamanderCards, SalamanderCardColor, whiteSalamanderCards } from './material/SalamanderCard'
import { spellBookCards } from './material/SpellBookCard'
import { PlayerColor } from './PlayerColor'
import { MemoryType } from './rules/MemoryType'
import { RuleId } from './rules/RuleId'
import { SalamandraOptions } from './SalamandraOptions'
import { SalamandraRules } from './SalamandraRules'

/**
 * This class creates a new Game based on the game options
 */
export class SalamandraSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, SalamandraOptions> {
  Rules = SalamandraRules

  setupMaterial(_options: SalamandraOptions) {
    //this.material(MaterialType.ScrollToken).createItem({ quantity: 13, location: { type: LocationType.ScrollTokenStock } })
    this.setupSalamandraCardsStacks()
    this.setupDivinitiesCardsStacks()
    this.setUpFields()
    this.setUpGroves()
    this.setupSpellBooks()
    this.setupPlayers()
    this.setupMemory()
  }

  start() {
    this.startPlayerTurn(RuleId.DoActions, this.players[0])
  }

  private setupSalamandraCardsStacks() {
    this.material(MaterialType.SalamanderCard).createItems(
      shuffle(whiteSalamanderCards).map((it) => ({ id: { front: it, back: SalamanderCardColor.White }, location: { type: LocationType.WhiteSalamanderStack } }))
    )
    this.material(MaterialType.SalamanderCard).createItems(
      shuffle(blackSalamanderCards).map((it) => ({ id: { front: it, back: SalamanderCardColor.Black }, location: { type: LocationType.BlackSalamanderStack } }))
    )

    this.material(MaterialType.SalamanderCard).location(LocationType.BlackSalamanderStack).deck().rotateItem(true)
    this.material(MaterialType.SalamanderCard).location(LocationType.WhiteSalamanderStack).deck().rotateItem(true)
  }

  private setupDivinitiesCardsStacks() {
    this.material(MaterialType.DivinityCard).createItems(
      shuffle(bearDivinityCards).map((it) => ({
        id: { front: it, back: DivinityType.Bear },
        location: { type: LocationType.BearDivinityStack }
      }))
    )
    this.material(MaterialType.DivinityCard).createItems(
      shuffle(eagleDivinityCards).map((it) => ({
        id: { front: it, back: DivinityType.Eagle },
        location: { type: LocationType.EagleDivinityStack }
      }))
    )

    this.material(MaterialType.DivinityCard).location(LocationType.BearDivinityStack).deck().rotateItem(true)
    this.material(MaterialType.DivinityCard).location(LocationType.EagleDivinityStack).deck().rotateItem(true)
  }

  private setUpFields() {
    this.setupStartFields()
    this.material(MaterialType.FieldTile).createItems(shuffle(fieldTiles).map((tile) => ({ id: tile, location: { type: LocationType.FieldStack } })))

    this.material(MaterialType.FieldTile).location(LocationType.FieldStack).limit(4).moveItems({ type: LocationType.FieldSpace })
  }

  protected setupStartFields() {
    const startFieldLocations = [
      { type: LocationType.GameLayout, x: 0, y: -1 },
      { type: LocationType.GameLayout, x: 1, y: -1 },
      { type: LocationType.GameLayout, x: 0, y: 1 },
      { type: LocationType.GameLayout, x: 1, y: 1 }
    ]

    this.material(MaterialType.FieldTile).createItems(shuffle(startFieldTiles).map((tile, index) => ({ id: tile, location: startFieldLocations[index] })))
  }

  // Do not change order, it matters for the tutorial setup!
  protected startGrovesLocations = [
    { type: LocationType.GameLayout, x: 0.5, y: -1.5 },
    { type: LocationType.GameLayout, x: -0.5, y: 0.5 },
    { type: LocationType.GameLayout, x: 0.5, y: -0.5 },
    { type: LocationType.GameLayout, x: 1.5, y: -0.5 },
    { type: LocationType.GameLayout, x: -0.5, y: -0.5 },
    { type: LocationType.GameLayout, x: 1.5, y: 0.5 },
    { type: LocationType.GameLayout, x: 0.5, y: 0.5 },
    { type: LocationType.GameLayout, x: 0.5, y: 1.5 }
  ]

  protected setUpGroves() {
    const groves = shuffle(groveTiles)
    this.material(MaterialType.GroveTile).createItems(groves.map((it) => ({ id: it, location: { type: LocationType.GroveStack } })))
    for (const location of this.startGrovesLocations) {
      this.material(MaterialType.GroveTile).location(LocationType.GroveStack).moveItem(location)
    }
  }

  private setupSpellBooks() {
    const nbSpellBooks = this.players.length + 1
    this.material(MaterialType.SpellBookCard).createItems(
      sampleSize(spellBookCards, nbSpellBooks).map((tile) => ({ id: tile, location: { type: LocationType.SpellBookSpace } }))
    )
  }

  private setupPlayers() {
    for (const player of [...this.players].reverse()) {
      this.setupPlayer(player)
    }
  }

  setupPlayer(player: PlayerColor) {
    this.initializePlayerResources(player)
    this.memorize(MemoryType.Score, 0, player)
    this.material(MaterialType.PlayerMat).createItem({ id: player, location: { type: LocationType.PlayerMatLayout, player } })
    this.material(MaterialType.DruidTile).createItem({ id: player, location: { type: LocationType.PlayerDruidSpace, player, rotation: false } })
    this.createApprenticeTokens(3, player, false, 0)
    this.createApprenticeTokens(2, player, true, 1)
    this.createApprenticeTokens(3, player, false, 2)
    this.createApprenticeTokens(2, player, true, 3)
    this.material(MaterialType.ScoreMarker).createItem({ id: player, location: { type: LocationType.Score100MarkerIdlePlace } })
    this.material(MaterialType.ScoreMarker).createItem({ id: player, location: { type: LocationType.ScorePiste, id: 0 } })
    this.material(MaterialType.ApprenticeToken)
      .location((loc) => loc.type === LocationType.PlayerApprenticesSpace && loc.id === 0)
      .moveItems((item) => ({ type: LocationType.PlayerActualRoundApprenticesSpace, player, rotation: item.location.rotation }))

    this.material(MaterialType.CrystalToken).createItem({ location: { type: LocationType.PlayerCrystalTokenStock, player: player }, quantity: 2 })
  }

  private createApprenticeTokens(quantity: number, player: PlayerColor, rotation: boolean, locationId: number) {
    for (let i = 0; i < quantity; i++) {
      this.material(MaterialType.ApprenticeToken).createItem({
        id: player,
        location: { type: LocationType.PlayerApprenticesSpace, player, id: locationId, rotation }
      })
    }
  }

  private setupMemory() {
    this.memorize(MemoryType.ActualRound, 0)
    this.memorize(MemoryType.PlayersWhoPassed, [])
  }

  private initializePlayerResources(player: PlayerColor) {
    const initialResources: Record<PrimaryResource, number> = {
      [PrimaryResource.Leaf]: 0,
      [PrimaryResource.Fruit]: 0,
      [PrimaryResource.Flower]: 0
    }
    this.memorize(MemoryType.PlayerPrimaryResources, initialResources, player)
    const initialPotions: Record<Potion, number> = {
      [Potion.Leaf]: 0,
      [Potion.FlowerOrFruit]: 0
    }
    this.memorize(MemoryType.PlayerPotions, initialPotions, player)
  }
}
