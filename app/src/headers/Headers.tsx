/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/salamandra/rules/RuleId'
import { ComponentType } from 'react'
import { DoActionsHeader } from './DoActionsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DoActions]: DoActionsHeader
}
