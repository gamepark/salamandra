import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import React from 'react'
import { Trans } from 'react-i18next'
import ApprenticeBlueDay from '../images/tokens/apprentice/ApprenticeBlueDay.jpg'
import ApprenticeBlueNight from '../images/tokens/apprentice/ApprenticeBlueNight.jpg'
import ApprenticeGreyDay from '../images/tokens/apprentice/ApprenticeGreyDay.jpg'
import ApprenticeGreyNight from '../images/tokens/apprentice/ApprenticeGreyNight.jpg'
import ApprenticeRedDay from '../images/tokens/apprentice/ApprenticeRedDay.jpg'
import ApprenticeRedNight from '../images/tokens/apprentice/ApprenticeRedNight.jpg'
import ApprenticeYellowDay from '../images/tokens/apprentice/ApprenticeYellowDay.jpg'
import ApprenticeYellowNight from '../images/tokens/apprentice/ApprenticeYellowNight.jpg'

class ApprenticeTokenDescription extends CardDescription {
  width = 2.1
  height = 2.1
  borderRadius = this.width / 2

  images = {
    [PlayerColor.Blue]: ApprenticeBlueDay,
    [PlayerColor.Grey]: ApprenticeGreyDay,
    [PlayerColor.Red]: ApprenticeRedDay,
    [PlayerColor.Yellow]: ApprenticeYellowDay
  }

  backImages = {
    [PlayerColor.Blue]: ApprenticeBlueNight,
    [PlayerColor.Grey]: ApprenticeGreyNight,
    [PlayerColor.Red]: ApprenticeRedNight,
    [PlayerColor.Yellow]: ApprenticeYellowNight
  }

  isFlipped = (item: MaterialItem) => item.location.rotation === true

  menuAlwaysVisible = true

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]): React.ReactNode {
    const activate =
      item.location.type === LocationType.FieldApprenticeSpace &&
      legalMoves.find(
        (move) =>
          isMoveItemType(MaterialType.ApprenticeToken)(move) && context.index === move.itemIndex && move.location.type !== LocationType.SpellBookApprenticeSpace
      )

    if (activate) {
      return (
        <ItemMenuButton label={<Trans defaults="button.activate" />} y={-1} move={activate}>
          <FontAwesomeIcon icon={faRotate} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }
    return undefined
  }
}

export const apprenticeTokenDescription = new ApprenticeTokenDescription()
