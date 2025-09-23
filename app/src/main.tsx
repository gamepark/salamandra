import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { SalamandraOptionsSpec } from '@gamepark/salamandra/SalamandraOptions.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { SalamandraSetup } from '@gamepark/salamandra/SalamandraSetup.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="salamandra"
      Rules={SalamandraRules}
      optionsSpec={SalamandraOptionsSpec}
      GameSetup={SalamandraSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      theme={{
        dialog: {
          backgroundColor: '#efeadc'
        }
      }}
    >
      <App />
    </GameProvider>
  </StrictMode>
)