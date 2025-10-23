import { css } from '@emotion/react'
import { DropAreaDescription, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
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

  dropPreview = true

  getBaseCoordinates(context: MaterialContext): Partial<Coordinates> {
    const gameBoundaries = new GameBoundaries(context.rules.game)
    const coordinates = { x: 5, y: -1 }
    const boundaries = gameBoundaries.boundaries
    const { overX, overY } = gameBoundaries.overCoordinates
    const xMove = (boundaries.minX + boundaries.maxX) / 2
    const yMove = (boundaries.minY + boundaries.maxY) / 2
    coordinates.x += fieldTileDescription.width * -xMove
    coordinates.y += fieldTileDescription.height * -yMove

    coordinates.x += overX * (fieldTileDescription.width / 2)
    coordinates.y += overY * (fieldTileDescription.width / 2)

    return coordinates
  }

  getHoverTransform(): string[] {
    return ['scale(2)', 'translateZ(1em)']
  }

  locationDescription = new fieldDescription()
}

class fieldDescription extends DropAreaDescription {
  width = fieldTileDescription.width
  height = fieldTileDescription.height

  extraCss = css`
    clip-path: polygon(32% 1%, 67% 1%, 99% 32%, 99% 67%, 67% 99%, 32% 99%, 1% 67%, 1% 32%);
  `
}

export const gameLayoutLocator = new GameLayoutLocator()
