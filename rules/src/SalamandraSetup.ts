import { MaterialGameSetup } from '@gamepark/rules-api'
import { SalamandraOptions } from './SalamandraOptions'
import { SalamandraRules } from './SalamandraRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class SalamandraSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, SalamandraOptions> {
  Rules = SalamandraRules

  setupMaterial(_options: SalamandraOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
