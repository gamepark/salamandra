/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/salamandra/rules/RuleId'
import { ComponentType } from 'react'
import { ActionsAfterBuildingFieldHeader } from './ActionsAfterBuildingFieldHeader'
import { ActionsOnPassHeader } from './ActionsOnPassHeader'
import { DoActionsHeader } from './DoActionsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DoActions]: DoActionsHeader,
  [RuleId.ActionsAfterBuildingField]: ActionsAfterBuildingFieldHeader,
  [RuleId.ActionsOnPass]: ActionsOnPassHeader
}
