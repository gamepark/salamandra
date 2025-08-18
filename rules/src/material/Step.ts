export enum Step {
  Day = 1,
  Night
}

export const getStep = (id: number) => (id % 10) as Step
