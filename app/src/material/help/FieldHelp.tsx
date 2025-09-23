/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Cost, CostType } from '@gamepark/salamandra/material/Cost'
import { CrystalToken } from '@gamepark/salamandra/material/CrystalToken'
import { fieldData, FieldTile } from '@gamepark/salamandra/material/FieldTile'
import { times } from 'lodash'
import { FC, HTMLAttributes } from 'react'
import { Trans } from 'react-i18next'
import { crystalTokenDescription } from '../CrystalTokenDescription'
import { potionImages, primaryResourceImages } from './utils'

export const FieldHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const cost = fieldData[item.id as FieldTile].cost
  const isFree = cost.length === 0
  return (
    <div css={descriptionCss}>
      <h4>Bosquet</h4>
      <div css={costContainerCss}>
        <span> Cost: </span>
        <br />
        {isFree && <Trans defaults="help.field.free" />}
        {!isFree && (
          <div css={imagesContainerCss}>
            <CostDisplay resources={fieldData[item.id as FieldTile].cost} />
          </div>
        )}
      </div>
    </div>
  )
}

type CostDisplayProps = {
  resources: Cost[]
}

const CostDisplay: FC<CostDisplayProps> = (props) => {
  const { resources } = props
  const images = resources.flatMap((cost: Cost) => getImages(cost))
  return (
    <>
      {images.map((image: string, index: number) => (
        <Picture key={index} picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={image} />
      ))}
    </>
  )
}

const getImages = (cost: Cost) => {
  if (cost.type === CostType.Crystal) {
    return times(cost.amount, () => crystalTokenDescription.images[CrystalToken.Crystal1])
  }

  if (cost.type === CostType.Resource) {
    return times(cost.amount, () => primaryResourceImages[cost.resource])
  }

  return potionImages[cost.potion]
}

const descriptionCss = css`
  min-height: 100%;
  width: 100%
  overflow: hidden;

  > h4 {
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    padding: 0.3em;
  }
`

const pictureCss = css`
  height: 1em;
  border-radius: 1em;
  overflow: hidden;
  font-size: 1.5em;
  > img {
    top: 0 !important;
    height: 1em;
  }
`

const costContainerCss = css`
  margin-left: 0.4em;
  margin-top: 0.2em;
  font-size: 0.8em;
  text-decoration: underline;
`

const imagesContainerCss = css`
  margin-top: 0.2em;
  align-items: center;
  display: flex;
`
