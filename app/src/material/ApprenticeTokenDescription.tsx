import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton, pointerCursorCss } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { RuleId } from '@gamepark/salamandra/rules/RuleId'
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
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

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
    const isOnFieldApprenticeSpace = item.location.type === LocationType.FieldApprenticeSpace
    if (!isOnFieldApprenticeSpace) return undefined
    const flipActions = legalMoves.filter(
      (move) =>
        isMoveItemType(MaterialType.ApprenticeToken)(move) && context.index === move.itemIndex && move.location.type !== LocationType.SpellBookApprenticeSpace
    )

    const deactivateToGainCrystal = legalMoves.filter((move) => {
      if (!isCustomMoveType(CustomMoveType.ActivateApprenticeForGainCrystal)(move)) return false
      const data = move.data as { itemIndex?: number }
      return data.itemIndex === context.index
    })

    const flipWithoutEffect = context.rules.game.rule?.id === RuleId.ChooseApprenticeToActivate
    const reactivate = context.rules.game.rule?.id === RuleId.ReactivateApprentice

    if (flipActions.length && deactivateToGainCrystal.length) {
      return (
        <ItemMenuButton
          label={<Trans defaults="button.activate" />}
          y={-1}
          move={displayMaterialHelp(MaterialType.ApprenticeToken, item, context.index)}
          options={{ local: true }}
        >
          <FontAwesomeIcon icon={faRotate} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }

    if (flipActions.length === 1) {
      return (
        <ItemMenuButton
          label={<Trans defaults={reactivate ? 'button.reactivate' : flipWithoutEffect ? 'button.flip' : 'button.activate'} />}
          y={-1}
          move={flipActions[0]}
        >
          <FontAwesomeIcon icon={faRotate} css={pointerCursorCss} />
        </ItemMenuButton>
      )
    }

    return undefined
  }
}

export const apprenticeTokenDescription = new ApprenticeTokenDescription()
