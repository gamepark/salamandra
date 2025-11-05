import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { Potion } from '@gamepark/salamandra/material/Potion'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import Bear from '../../images/icons/bear.jpg'
import cauldron from '../../images/icons/cauldron.png'
import Eagle from '../../images/icons/eagle.jpg'
import FlowerFruitPotion from '../../images/icons/flower-fruit-potion.jpg'
import Flower from '../../images/icons/flower.jpg'
import Fruit from '../../images/icons/fruit.jpg'
import LeafPotion from '../../images/icons/leaf-potion.jpg'
import Leaf from '../../images/icons/leaf.jpg'
import Salamander from '../../images/icons/salamander.png'
import Score from '../../images/icons/score.png'
import sickle from '../../images/icons/sickle.png'
import CristalToken1 from '../../images/tokens/CristalToken1.png'
import { scrollTokenDescription } from '../ScrollTokenDescription.ts'

const pictureCss = css`
  height: 1em;
  overflow: hidden;
  > img {
    height: 1em;
    border-radius: 1em;
    position: relative;
    top: 0.2em;
  }
`

export const potionImages = {
  [Potion.FlowerOrFruit]: FlowerFruitPotion,
  [Potion.Leaf]: LeafPotion
}

export const primaryResourceImages = {
  [PrimaryResource.Flower]: Flower,
  [PrimaryResource.Fruit]: Fruit,
  [PrimaryResource.Leaf]: Leaf
}

export const components = {
  bold: <strong />,
  underline: <u />,
  italic: <i />,
  crystal: <Picture picture={{ css: pictureCss } as never} src={CristalToken1} />,
  leafPotion: <Picture picture={{ css: pictureCss } as never} src={potionImages[Potion.Leaf]} />,
  flowerFruitPotion: <Picture picture={{ css: pictureCss } as never} src={potionImages[Potion.FlowerOrFruit]} />,
  leaf: <Picture picture={{ css: pictureCss } as never} src={primaryResourceImages[PrimaryResource.Leaf]} />,
  flower: <Picture picture={{ css: pictureCss } as never} src={primaryResourceImages[PrimaryResource.Flower]} />,
  fruit: <Picture picture={{ css: pictureCss } as never} src={primaryResourceImages[PrimaryResource.Fruit]} />,
  bear: <Picture picture={{ css: pictureCss } as never} src={Bear} />,
  eagle: <Picture picture={{ css: pictureCss } as never} src={Eagle} />,
  salamander: <Picture picture={{ css: pictureCss } as never} src={Salamander} />,
  score: <Picture picture={{ css: pictureCss } as never} src={Score} />
}

export const descriptionCss = css`
  font-size: 0.8em;
  white-space: pre-wrap;
  max-width: 45em;

  > h2 {
    text-align: center;
    margin-top: 0;
  }
`

const logPictureCss = css`
  height: 1.9em;
  overflow: hidden;
  > img {
    height: 1.9em;
    //border-radius: 1em;
    position: relative;
    top: -0.1em;
  }
`

const roundedCss = css`
  border-radius: 1em;
`

export const LogComponents = {
  bold: <strong />,
  underline: <u />,
  italic: <i />,
  scroll: <Picture src={scrollTokenDescription.image} picture={{ css: logPictureCss } as never} />,
  crystal: <Picture picture={{ css: logPictureCss } as never} src={CristalToken1} />,
  leafPotion: <Picture picture={{ css: logPictureCss } as never} src={potionImages[Potion.Leaf]} css={roundedCss} />,
  flowerFruitPotion: <Picture picture={{ css: logPictureCss } as never} src={potionImages[Potion.FlowerOrFruit]} css={roundedCss} />,
  leaf: <Picture picture={{ css: logPictureCss } as never} src={primaryResourceImages[PrimaryResource.Leaf]} css={roundedCss} />,
  flower: <Picture picture={{ css: logPictureCss } as never} src={primaryResourceImages[PrimaryResource.Flower]} css={roundedCss} />,
  fruit: <Picture picture={{ css: logPictureCss } as never} src={primaryResourceImages[PrimaryResource.Fruit]} css={roundedCss} />,
  bear: <Picture picture={{ css: logPictureCss } as never} src={Bear} css={roundedCss} />,
  eagle: <Picture picture={{ css: logPictureCss } as never} src={Eagle} css={roundedCss} />,
  salamander: <Picture picture={{ css: logPictureCss } as never} src={Salamander} />,
  score: <Picture picture={{ css: logPictureCss } as never} src={Score} />,
  cauldron: <Picture picture={{ css: logPictureCss } as never} src={cauldron} />,
  sickle: <Picture picture={{ css: logPictureCss } as never} src={sickle} />
}
