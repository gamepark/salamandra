import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { SalamandraOptionsSpec } from '@gamepark/salamandra/SalamandraOptions.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { SalamandraSetup } from '@gamepark/salamandra/SalamandraSetup.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import background from './images/background.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { SalamandraScoring } from './scoring/SalamandraScoring.tsx'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial.tsx'

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
      scoring={new SalamandraScoring()}
      tutorial={new Tutorial()}
      theme={{
        root: {
          background: {
            image: background,
            overlay: 'rgba(0, 0, 0, 0.5)'
          }
        },
        dialog: {
          backgroundColor: '#efeadc'
        }
      }}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
