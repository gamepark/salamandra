import { GameProvider } from '@gamepark/react-game'
import { SalamandraOptionsSpecV2 } from '@gamepark/salamandra/SalamandraOptions.ts'
import { SalamandraRules } from '@gamepark/salamandra/SalamandraRules.ts'
import { SalamandraSetup } from '@gamepark/salamandra/SalamandraSetup.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { SalamandraLogs } from './logs/SalamandraLogs.tsx'
import { Material } from './material/Material'
import { SalamandraScoring } from './scoring/SalamandraScoring.tsx'
import { salamandraTheme } from './theme.ts'
import { Tutorial } from './tutorial/Tutorial.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="salamandra"
      Rules={SalamandraRules}
      optionsSpec={SalamandraOptionsSpecV2}
      GameSetup={SalamandraSetup}
      material={Material}
      locators={Locators}
      logs={new SalamandraLogs()}
      animations={gameAnimations}
      scoring={new SalamandraScoring()}
      tutorial={new Tutorial()}
      theme={salamandraTheme}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
