import { css, Interpolation, Theme } from '@emotion/react'
import { CardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import SalamanderTempleTile from '../images/tiles/SalamanderTempleTile.png'
import { SalamanderTempleHelp } from './help/SalamanderTempleHelp'

class SalamanderTempleTileDescription extends CardDescription {
  width = 18.2
  height = 9.2

  transparency = true

  image = SalamanderTempleTile

  help = SalamanderTempleHelp

  staticItem = { location: { type: LocationType.GameLayout, x: 0.5, y: 0 } }

  getItemExtraCss(): Interpolation<Theme> {
    return css`
      transition: 0.2s transform;
    `
  }
}

export const salamanderTempleTileDescription = new SalamanderTempleTileDescription()
