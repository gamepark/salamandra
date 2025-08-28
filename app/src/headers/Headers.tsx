/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/salamandra/rules/RuleId'
import { ComponentType } from 'react'
import { ActionsAfterBuildingFieldHeader } from './ActionsAfterBuildingFieldHeader'
import { ActionsOnPassHeader } from './ActionsOnPassHeader'
import { CalculScoresHeader } from './CalculScoresHeader'
import { CheckAndUseScrollTokensHeader } from './CheckAndUseScrollTokensHeader'
import { CheckPassAndEmptyPlacesHeader } from './CheckPassAndEmptyPlacesHeader'
import { ChooseApprenticeToActivateHeader } from './ChooseApprenticeToActivateHeader'
import { DoActionsHeader } from './DoActionsHeader'
import { PrepareNextRoundHeader } from './PrepareNextRoundHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DoActions]: DoActionsHeader,
  [RuleId.ActionsAfterBuildingField]: ActionsAfterBuildingFieldHeader,
  [RuleId.ActionsOnPass]: ActionsOnPassHeader,
  [RuleId.CheckPassAndEmptyPlaces]: CheckPassAndEmptyPlacesHeader,
  [RuleId.PrepareNextRound]: PrepareNextRoundHeader,
  [RuleId.CalculScores]: CalculScoresHeader,
  [RuleId.ChooseApprenticeToActivate]: ChooseApprenticeToActivateHeader,
  [RuleId.CheckAndUseScrollTokens]: CheckAndUseScrollTokensHeader
}
