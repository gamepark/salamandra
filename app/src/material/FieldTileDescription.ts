import { css, Interpolation, Theme } from '@emotion/react'
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { FieldTile } from '@gamepark/salamandra/material/FieldTile'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import FieldTile01 from '../images/tiles/field/FieldTile01.png'
import FieldTile02 from '../images/tiles/field/FieldTile02.png'
import FieldTile03 from '../images/tiles/field/FieldTile03.png'
import FieldTile04 from '../images/tiles/field/FieldTile04.png'
import FieldTile05 from '../images/tiles/field/FieldTile05.png'
import FieldTile06 from '../images/tiles/field/FieldTile06.png'
import FieldTile07 from '../images/tiles/field/FieldTile07.png'
import FieldTile08 from '../images/tiles/field/FieldTile08.png'
import FieldTile09 from '../images/tiles/field/FieldTile09.png'
import FieldTile10 from '../images/tiles/field/FieldTile10.png'
import FieldTile11 from '../images/tiles/field/FieldTile11.png'
import FieldTile12 from '../images/tiles/field/FieldTile12.png'
import FieldTile13 from '../images/tiles/field/FieldTile13.png'
import FieldTile14 from '../images/tiles/field/FieldTile14.png'
import FieldTile15 from '../images/tiles/field/FieldTile15.png'
import FieldTile16 from '../images/tiles/field/FieldTile16.png'
import FieldTile17 from '../images/tiles/field/FieldTile17.png'
import FieldTile18 from '../images/tiles/field/FieldTile18.png'
import FieldTile19 from '../images/tiles/field/FieldTile19.png'
import FieldTile20 from '../images/tiles/field/FieldTile20.png'
import FieldTile21 from '../images/tiles/field/FieldTile21.png'
import FieldTile22 from '../images/tiles/field/FieldTile22.png'
import FieldTile23 from '../images/tiles/field/FieldTile23.png'
import FieldTile24 from '../images/tiles/field/FieldTile24.png'
import FieldTileBack from '../images/tiles/field/FieldTileBack.png'
import { FieldHelp } from './help/FieldHelp'

class FieldTileDescription extends CardDescription {
  width = 9.2
  height = 9.2

  transparency = true

  backImage = FieldTileBack

  images = {
    [FieldTile.StartField1]: FieldTile01,
    [FieldTile.StartField2]: FieldTile02,
    [FieldTile.StartField3]: FieldTile03,
    [FieldTile.StartField4]: FieldTile04,
    [FieldTile.Field5]: FieldTile05,
    [FieldTile.Field6]: FieldTile06,
    [FieldTile.Field7]: FieldTile07,
    [FieldTile.Field8]: FieldTile08,
    [FieldTile.Field9]: FieldTile09,
    [FieldTile.Field10]: FieldTile10,
    [FieldTile.Field11]: FieldTile11,
    [FieldTile.Field12]: FieldTile12,
    [FieldTile.Field13]: FieldTile13,
    [FieldTile.Field14]: FieldTile14,
    [FieldTile.Field15]: FieldTile15,
    [FieldTile.Field16]: FieldTile16,
    [FieldTile.Field17]: FieldTile17,
    [FieldTile.Field18]: FieldTile18,
    [FieldTile.Field19]: FieldTile19,
    [FieldTile.Field20]: FieldTile20,
    [FieldTile.Field21]: FieldTile21,
    [FieldTile.Field22]: FieldTile22,
    [FieldTile.Field23]: FieldTile23,
    [FieldTile.Field24]: FieldTile24
  }

  getFrontExtraCss(): Interpolation<Theme> {
    return css`
      clip-path: polygon(32% 1%, 67% 1%, 99% 32%, 99% 67%, 67% 99%, 32% 99%, 1% 67%, 1% 32%);
    `
  }

  getHelpDisplayExtraCss(item: Partial<MaterialItem>): Interpolation<Theme> {
    if (item.id === undefined) {
      return css`
        font-size: 5em;
        transform: rotateY(180deg);
      `
    }
    return css`
      font-size: 5em;
    `
  }

  isFlippedOnTable(item: Partial<MaterialItem>) {
    return item.location?.type === LocationType.FieldStack
  }

  help = FieldHelp
}

export const fieldTileDescription = new FieldTileDescription()
