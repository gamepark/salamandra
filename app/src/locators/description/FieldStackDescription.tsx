import { css } from '@emotion/react'
import { DropAreaDescription, isLocationSubset, LocationContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'

export class FieldStackDescription extends DropAreaDescription {
  getExtraCss(location: Location, context: LocationContext) {
    const deckSize = context.rules.material(MaterialType.FieldTile).location((l) => isLocationSubset(l, location)).length
    if (!deckSize) return []
    return [
      css`
        pointer-events: none;

        &:before {
          font-size: 4.5em;
          font-family: Arial, serif;
          color: rgb(255 255 255 / 80%);
          text-shadow: black 0 0 0.1em;
          font-weight: bold;
          margin-top: 0.12em;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          content: '${deckSize}';
        }
      `
    ]
  }
}
