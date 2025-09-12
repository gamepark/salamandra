import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { Potion } from '@gamepark/salamandra/material/Potion'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { HTMLAttributes } from 'react'
import FlowerFruitPotion from '../../images/icons/flower-fruit-potion.jpg'
import Flower from '../../images/icons/flower.jpg'
import Fruit from '../../images/icons/fruit.jpg'
import LeafPotion from '../../images/icons/leaf-potion.jpg'
import Leaf from '../../images/icons/leaf.jpg'
import Bear from '../../images/icons/bear.jpg'
import Eagle from '../../images/icons/eagle.jpg'
import CristalToken1 from '../../images/tokens/CristalToken1.png'

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
  crystal: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={CristalToken1} />,
  leafPotion: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={potionImages[Potion.Leaf]} />,
  flowerFruitPotion: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={potionImages[Potion.FlowerOrFruit]} />,
  leaf: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={primaryResourceImages[PrimaryResource.Leaf]} />,
  flower: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={primaryResourceImages[PrimaryResource.Flower]} />,
  fruit: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={primaryResourceImages[PrimaryResource.Fruit]} />,
  bear: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={Bear} />,
  eagle: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={Eagle} />
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
