import { getEnumValues } from '@gamepark/rules-api'

export enum ApprenticeDisc {
  Day = 1,
  Night
}

export const getApprenticeDiscType = (id: number) => (id % 10) as ApprenticeDisc

export const apprenticeDiscs = getEnumValues(ApprenticeDisc)
