/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription, ItemContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { GameBoundaries } from '@gamepark/salamandra/material/helper/GameBoundaries'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { fieldTileDescription } from '../material/FieldTileDescription'

class GameLayoutLocator extends Locator {
  gap = { x: fieldTileDescription.width, y: fieldTileDescription.height }

  getItemRotateZ(_item: MaterialItem, context: ItemContext): number {
    if (context.type === MaterialType.GroveTile) {
      return -45
    }
    return 0
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const locationX = location.x ?? 0
    const locationY = location.y ?? 0
    const base = this.getBaseCoordinates(context)
    return { x: (base.x ?? 0) + locationX * this.gap.x, y: (base.y ?? 0) + locationY * this.gap.y }
  }

  getBaseCoordinates(context: MaterialContext): Partial<Coordinates> {
    const boundaries = new GameBoundaries(context.rules.game).boudaries
    const coordinates = { x: 0, y: 0 }
    const deltaX = (boundaries.minX + boundaries.maxX) / 2
    const deltaY = (boundaries.minY + boundaries.maxY) / 2
    coordinates.x += fieldTileDescription.width * -deltaX
    coordinates.y += fieldTileDescription.height * -deltaY

    return coordinates
  }

  getHoverTransform(): string[] {
    return ['scale(2)', 'translateZ(1em)']
  }

  getLocationDescription(_location: Location, context: ItemContext): LocationDescription | undefined {
    if (context.type === MaterialType.FieldTile) {
      return new fieldDescription()
    }
    return undefined
  }
}

class fieldDescription extends DropAreaDescription {
  width = fieldTileDescription.width
  height = fieldTileDescription.height

  extraCss = css`
    clip-path: polygon(32% 1%, 67% 1%, 99% 32%, 99% 67%, 67% 99%, 32% 99%, 1% 67%, 1% 32%);
  `
}

export const gameLayoutLocator = new GameLayoutLocator()
