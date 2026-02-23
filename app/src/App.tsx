import { css, Global } from '@emotion/react'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialGameSounds, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

const globalOverrides = css`
  .svg-inline--fa.fa-xmark {
    position: absolute;
    top: 0.15em;
    right: 0.15em;
    font-size: 1.8em !important;
    width: 1.4em !important;
    height: 1.4em;
    padding: 0.3em;
    background: linear-gradient(145deg, #5c4a32, #3d2e1f);
    color: #f5eee1;
    border-radius: 50%;
    border: 2px solid rgba(197, 165, 90, 0.4);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    z-index: 100;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
    }
  }
`

export function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      <Global styles={globalOverrides} />
      {!!game && <GameDisplay />}
      <LoadingScreen
        display={loading}
        author={['Pierre Giroux', 'Johannes Goupy']}
        artist="Camille Chaussy"
        publisher="GRRRE GAMES"
        developer={['David Sylvestre', 'Game Park']}
      />
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading} />
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <MaterialGameSounds />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
    </>
  )
}
