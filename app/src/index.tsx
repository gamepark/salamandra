/** @jsxImportSource @emotion/react */
import { SalamandraOptionsSpec } from '@gamepark/salamandra/SalamandraOptions'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules'
import { SalamandraSetup } from '@gamepark/salamandra/SalamandraSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="salamandra"
      Rules={SalamandraRules}
      optionsSpec={SalamandraOptionsSpec}
      GameSetup={SalamandraSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
