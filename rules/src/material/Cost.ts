import { PrimaryResource } from './PrimaryResource'

export enum CostType {
  Resource = 1,
  Crystal
}

export type ResourceCost = {
  type: CostType.Resource
  resource: PrimaryResource
  amount: number
}

export type CrystalCost = {
  type: CostType.Crystal
  amount: number
}

export type Cost = ResourceCost | CrystalCost

export function cost(amount: number, resource: PrimaryResource): ResourceCost
export function cost(amount: number): CrystalCost
export function cost(amount: number, resource?: PrimaryResource): ResourceCost | CrystalCost {
  return resource ? { type: CostType.Resource, resource, amount } : { type: CostType.Crystal, amount }
}
