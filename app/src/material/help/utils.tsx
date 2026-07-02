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

export const potionImages = {
  [Potion.FlowerOrFruit]: FlowerFruitPotion,
  [Potion.Leaf]: LeafPotion
}

export const primaryResourceImages = {
  [PrimaryResource.Flower]: Flower,
  [PrimaryResource.Fruit]: Fruit,
  [PrimaryResource.Leaf]: Leaf
}

// Plain <img> helpers — no Picture wrapper, guaranteed inline style application
// vertical-align: -0.3em pulls icons down for true visual centering with text
export const HelpIcon = ({ src }: { src: string }) => (
  <img src={src} alt="" draggable={false}
    style={{ height: '1.5em', verticalAlign: '-0.3em' }}
  />
)

export const HelpRoundedIcon = ({ src }: { src: string }) => (
  <img src={src} alt="" draggable={false}
    style={{ height: '1.5em', width: '1.5em', borderRadius: '50%', objectFit: 'cover', verticalAlign: '-0.3em' }}
  />
)

const badgeLabelBase = `
  position: absolute;
  top: -0.75em;
  left: 0.7em;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-size: 0.6em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  white-space: nowrap;
  padding: 0.25em 0.7em;
  border-radius: 1em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  line-height: 1;
`

const effectLabelCss = css`
  ${badgeLabelBase}
  background: linear-gradient(145deg, #5daa68, #2e7d32);

  &::before {
    content: '+';
    font-weight: 800;
    font-size: 1.1em;
    line-height: 0;
    margin-top: -0.2em;
  }
`

export const scoringLabelCss = css`
  ${badgeLabelBase}
  background: linear-gradient(145deg, #9b6fbf, #7b50a0);

  &::before {
    content: '';
    display: inline-block;
    width: 0.95em;
    height: 0.95em;
    background: url(${Score}) center/75% no-repeat;
    flex-shrink: 0;
  }
`

const costLabelCss = css`
  ${badgeLabelBase}
  background: linear-gradient(145deg, #d48a50, #a06030);

  &::before {
    content: '';
    display: inline-block;
    width: 0.95em;
    height: 0.95em;
    background: url(${CristalToken1}) center/75% no-repeat;
    flex-shrink: 0;
  }
`

const harvestLabelCss = css`
  ${badgeLabelBase}
  background: linear-gradient(145deg, #d4a84b, #a07830);
  overflow: visible;
  left: 1em;
  padding-left: 3em;

  &::before {
    content: '';
    position: absolute;
    left: -0.6em;
    top: 50%;
    transform: translateY(-50%);
    width: 3.4em;
    height: 3.4em;
    background: url(${sickle}) center/contain no-repeat;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
`

const cauldronLabelCss = css`
  ${badgeLabelBase}
  background: linear-gradient(145deg, #d4a84b, #a07830);
  overflow: visible;
  left: 1em;
  padding-left: 3em;

  &::before {
    content: '';
    position: absolute;
    left: -0.6em;
    top: 50%;
    transform: translateY(-50%);
    width: 3.4em;
    height: 3.4em;
    background: url(${cauldron}) center/contain no-repeat;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
`

export const components = {
  bold: <strong />,
  underline: <u />,
  italic: <i />,
  effectLabel: <span css={effectLabelCss} />,
  scoringLabel: <span css={scoringLabelCss} />,
  costLabel: <span css={costLabelCss} />,
  harvestLabel: <span css={harvestLabelCss} />,
  cauldronLabel: <span css={cauldronLabelCss} />,
  crystal: <HelpIcon src={CristalToken1} />,
  leafPotion: <HelpRoundedIcon src={potionImages[Potion.Leaf]} />,
  flowerFruitPotion: <HelpRoundedIcon src={potionImages[Potion.FlowerOrFruit]} />,
  leaf: <HelpRoundedIcon src={primaryResourceImages[PrimaryResource.Leaf]} />,
  flower: <HelpRoundedIcon src={primaryResourceImages[PrimaryResource.Flower]} />,
  fruit: <HelpRoundedIcon src={primaryResourceImages[PrimaryResource.Fruit]} />,
  bear: <HelpRoundedIcon src={Bear} />,
  eagle: <HelpRoundedIcon src={Eagle} />,
  salamander: <HelpRoundedIcon src={Salamander} />,
  score: <HelpIcon src={Score} />,
  scroll: <HelpIcon src={scrollTokenDescription.image} />
}

// Legacy container (kept for backward compat)
export const descriptionCss = css`
  font-size: 0.8em;
  white-space: pre-wrap;
  max-width: 45em;

  > h2 {
    text-align: center;
    margin-top: 0;
  }
`

// ==========================================
// Log components (unchanged)
// ==========================================

const logPictureCss = css`
  height: 1.9em;
  overflow: hidden;

  > img {
    height: 1.9em;
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

// ==========================================
// Help Popup Design System
// Theme: Arcane Manuscript
// ==========================================

// Shared img rules: size + vertical center for both <img> and <picture> wrapper
const helpImgRules = `
  picture {
    display: inline-block;
    height: 1.5em;
    vertical-align: middle;
  }

  img {
    height: 1.5em;
    vertical-align: middle;
  }
`


// Warm parchment container with golden frame
export const helpContainerCss = css`
  min-width: 22em;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(197, 165, 90, 0.07) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(197, 165, 90, 0.05) 0%, transparent 50%),
    linear-gradient(170deg, #faf7ef 0%, #f5eee1 50%, #faf7ef 100%);
  padding: 0.7em;
  border-radius: 0.5em;
  border: 1px solid rgba(197, 165, 90, 0.3);
  box-shadow:
    0 0.15em 0.6em rgba(0, 0, 0, 0.08),
    inset 0 0 1em rgba(197, 165, 90, 0.05);
`

// Centered header
export const helpHeaderCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25em;
  text-align: center;
`

export const helpTitleCss = css`
  font-size: 1.15em;
  font-weight: 700;
  color: #3d2e1f;
  margin: 0;
  line-height: 1.3;
`

export const helpSubtitleCss = css`
  font-size: 0.78em;
  font-weight: 500;
  color: #8a7e6c;
  margin: 0;
`

// Header icon - circular with double golden ring
export const helpHeaderIconCss = css`
  width: 2.6em;
  height: 2.6em;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow:
    0 0 0 2px #c5a55a,
    0 0 0 4px rgba(197, 165, 90, 0.2),
    0 0.1em 0.3em rgba(0, 0, 0, 0.15);
`

// Ornamental divider with golden diamond
export const helpOrnamentCss = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.1em 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(197, 165, 90, 0.5), transparent);
  }
`

export const diamondCss = css`
  width: 0.35em;
  height: 0.35em;
  background: #c5a55a;
  transform: rotate(45deg);
  flex-shrink: 0;
  margin: 0 0.5em;
  opacity: 0.7;
`

// Content panel - semi-transparent on parchment
export const helpPanelCss = css`
  padding: 0.5em 0.65em;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.4em;
  border: 1px solid rgba(197, 165, 90, 0.15);
  font-size: 0.88em;
  line-height: 1.6;
  color: #3d2e1f;
  white-space: pre-wrap;

  > p {
    margin: 0.25em 0;
  }

  > p:first-of-type {
    margin-top: 0;
  }

  > p:last-child {
    margin-bottom: 0;
  }

  ${helpImgRules}
`

// Accent panel - stronger border for important info
export const helpAccentPanelCss = css`
  padding: 0.5em 0.65em;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 0.4em;
  border: 1px solid rgba(197, 165, 90, 0.3);
  box-shadow: 0 0 0.5em rgba(197, 165, 90, 0.08);
  font-size: 0.88em;
  line-height: 1.6;
  color: #3d2e1f;
  white-space: pre-wrap;

  > p {
    margin: 0.25em 0;
  }

  > p:first-of-type {
    margin-top: 0;
  }

  > p:last-child {
    margin-bottom: 0;
  }

  ${helpImgRules}
`

// ==========================================
// Content classification system
// 4 levels: important, secondary, notice, gain
// ==========================================

const classifiedPanelBase = `
  position: relative;
  border-radius: 0.45em;
  font-size: 0.88em;
  line-height: 1.6;
  white-space: pre-wrap;

  > p {
    margin: 0.25em 0;
  }
  > p:first-of-type {
    margin-top: 0;
  }
  > p:last-child {
    margin-bottom: 0;
  }
`

// Important — key rules, main actions. Amber left stripe + badge
export const helpImportantCss = css`
  ${classifiedPanelBase}
  padding: 0.75em 0.7em 0.55em 1.1em;
  background: linear-gradient(135deg, rgba(197, 165, 90, 0.1) 0%, rgba(197, 165, 90, 0.04) 100%);
  border: 1px solid rgba(197, 165, 90, 0.28);
  color: #3d2e1f;

  &::before {
    content: '!';
    position: absolute;
    top: -0.55em;
    left: 0.7em;
    width: 1.35em;
    height: 1.35em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #e0b040, #c59520);
    color: #fff;
    border-radius: 50%;
    font-size: 0.75em;
    font-weight: 800;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #d4a84b 0%, #b8922e 100%);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Important with label — the harvestLabel/cauldronLabel component replaces the badge
export const helpImportantLabeledCss = css`
  ${classifiedPanelBase}
  padding: 0.8em 0.7em 0.55em 1.1em;
  white-space: normal;
  background: linear-gradient(135deg, rgba(197, 165, 90, 0.1) 0%, rgba(197, 165, 90, 0.04) 100%);
  border: 1px solid rgba(197, 165, 90, 0.28);
  color: #3d2e1f;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #d4a84b 0%, #b8922e 100%);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Cost with label — copper/terracotta tone for building costs
export const helpCostLabeledCss = css`
  ${classifiedPanelBase}
  padding: 0.8em 0.7em 0.55em 1.1em;
  white-space: normal;
  background: linear-gradient(135deg, rgba(196, 112, 64, 0.08) 0%, rgba(196, 112, 64, 0.02) 100%);
  border: 1px solid rgba(196, 112, 64, 0.2);
  color: #5c3018;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #d48a50 0%, #a06030 100%);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Secondary — descriptions, context. Clean parchment panel (alias for helpPanelCss)
export const helpSecondaryCss = css`
  ${classifiedPanelBase}
  padding: 0.5em 0.65em;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(197, 165, 90, 0.15);
  color: #3d2e1f;

  ${helpImgRules}
`

// Notice — supplementary info, tips. Muted tone, smaller + badge
export const helpNoticeCss = css`
  ${classifiedPanelBase}
  padding: 0.45em 0.6em 0.45em 1.1em;
  background: linear-gradient(135deg, rgba(140, 130, 110, 0.06) 0%, rgba(140, 130, 110, 0.02) 100%);
  border: 1px solid rgba(140, 130, 110, 0.18);
  font-size: 0.82em;
  color: #5a5040;

  &::before {
    content: 'i';
    position: absolute;
    top: -0.6em;
    left: 0.8em;
    width: 1.35em;
    height: 1.35em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #a09888, #8a7e6c);
    color: #fff;
    border-radius: 50%;
    font-size: 0.7em;
    font-weight: 700;
    font-style: italic;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #b0a48c 0%, #8a7e6c 100%);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Shared gain panel base (no badge)
const helpGainBase = `
  ${classifiedPanelBase}
  padding: 0.75em 0.7em 0.55em 1.1em;
  background: linear-gradient(135deg, rgba(34, 120, 60, 0.07) 0%, rgba(34, 100, 50, 0.02) 100%);
  border: 1px solid rgba(34, 120, 60, 0.18);
  color: #1a4020;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #66bb6a, #2e7d32);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Gain — rewards, bonuses. Green accent + circle badge
export const helpGainCss = css`
  ${helpGainBase}

  &::before {
    content: '+';
    position: absolute;
    top: -0.55em;
    left: 0.7em;
    width: 1.35em;
    height: 1.35em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #5daa68, #2e7d32);
    color: #fff;
    border-radius: 50%;
    font-size: 0.8em;
    font-weight: 800;
    line-height: 0;
    padding-bottom: 0.1em;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
  }
`

// Gain with label — the effectLabel component replaces the badge
export const helpGainLabeledCss = css`
  ${helpGainBase}
  padding-top: 0.8em;
  white-space: normal;
`

// Shared scoring panel base (no badge)
const helpScoringBase = `
  ${classifiedPanelBase}
  padding: 0.75em 0.7em 0.55em 1.1em;
  background: linear-gradient(135deg, rgba(120, 80, 160, 0.07) 0%, rgba(120, 80, 160, 0.02) 100%);
  border: 1px solid rgba(120, 80, 160, 0.18);
  color: #3d2050;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #9b6fbf, #7b50a0);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Scoring — circle badge only
export const helpScoringCss = css`
  ${helpScoringBase}

  &::before {
    content: '';
    position: absolute;
    top: -0.55em;
    left: 0.7em;
    width: 1.35em;
    height: 1.35em;
    background: url(${Score}) center/55% no-repeat, linear-gradient(145deg, #9b6fbf, #7b50a0);
    border-radius: 50%;
    font-size: 0.75em;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
  }
`

// Scoring with label — the scoringLabel component replaces the badge
export const helpScoringLabeledCss = css`
  ${helpScoringBase}
  padding-top: 0.8em;
  white-space: normal;
`

// Simple golden divider
export const helpDividerCss = css`
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent 10%, rgba(197, 165, 90, 0.3), transparent 90%);
  margin: 0.2em 0;
`

// Points badge — clean centered callout
export const pointsBadgeCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.2em;
  color: #3d2e1f;
  font-weight: 700;
  font-size: 1em;

  ${helpImgRules}
`

// Standalone centered display for the points badge — subtle golden glow
export const helpPointsDisplayCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.55em 0.7em;
  background: linear-gradient(135deg, rgba(197, 165, 90, 0.08) 0%, rgba(197, 165, 90, 0.03) 100%);
  border-radius: 0.45em;
  border: 1px solid rgba(197, 165, 90, 0.2);
  position: relative;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(197, 165, 90, 0.35), transparent);
  }

  > span {
    margin: 0 0.8em;
    flex-shrink: 0;
  }
`

// Cost highlight box — amber tint with left stripe
export const costHighlightCss = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.3em;
  padding: 0.45em 0.6em 0.45em 1.1em;
  background: linear-gradient(135deg, rgba(197, 136, 12, 0.12) 0%, rgba(197, 136, 12, 0.05) 100%);
  border-radius: 0.45em;
  border: 1px solid rgba(197, 136, 12, 0.25);
  font-weight: 600;
  color: #6b4a08;
  font-size: 0.88em;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #e0a830 0%, #c58c0c 100%);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Gain highlight box — green tint with left stripe
export const gainHighlightCss = css`
  position: relative;
  padding: 0.45em 0.6em 0.45em 1.1em;
  background: linear-gradient(135deg, rgba(45, 122, 66, 0.08) 0%, rgba(45, 122, 66, 0.03) 100%);
  border-radius: 0.45em;
  border: 1px solid rgba(45, 122, 66, 0.2);
  color: #1a4020;
  font-size: 0.88em;
  line-height: 1.55;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #5daa68 0%, #3a8a4a 100%);
    border-radius: 0.45em 0 0 0.45em;
  }

  ${helpImgRules}
`

// Harvest / action highlight box — warm amber accent with left stripe
export const harvestHighlightCss = css`
  position: relative;
  padding: 0.55em 0.7em 0.55em 1.1em;
  background:
    linear-gradient(135deg, rgba(160, 120, 50, 0.1) 0%, rgba(139, 106, 74, 0.04) 50%, rgba(160, 120, 50, 0.06) 100%);
  border-radius: 0.45em;
  border: 1px solid rgba(139, 106, 74, 0.22);
  box-shadow:
    inset 0 1px 3px rgba(139, 106, 74, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.03);
  font-size: 0.88em;
  line-height: 1.6;
  color: #3d2e1f;
  white-space: pre-wrap;
  overflow: hidden;

  /* Golden-amber left accent stripe */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #d4a84b 0%, #a07830 50%, #8b6a4a 100%);
    border-radius: 0.45em 0 0 0.45em;
  }

  > p {
    margin: 0.25em 0;
  }

  > p:first-of-type {
    margin-top: 0;
  }

  > p:last-child {
    margin-bottom: 0;
  }

  h3 {
    margin: 0 0 0.4em;
    font-size: 1em;
    font-weight: 700;
    color: #5c3d24;
    letter-spacing: 0.02em;
    padding-bottom: 0.35em;
    border-bottom: 1px solid rgba(197, 165, 90, 0.25);
  }

  ${helpImgRules}
`

// Info highlight
export const infoHighlightCss = css`
  padding: 0.4em 0.6em;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.4em;
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: #4c1d95;
  font-size: 0.82em;
  line-height: 1.55;
`

// Button grid
export const helpButtonGridCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  padding-top: 0.3em;
`

// Effect list with golden diamond markers
export const effectListCss = css`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const effectItemCss = css`
  display: flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.3em 0;
  line-height: 1.5;
  font-size: 0.88em;
  color: #3d2e1f;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(197, 165, 90, 0.12);
  }

  &::before {
    content: '\\25C6';
    color: #c5a55a;
    font-size: 0.45em;
    flex-shrink: 0;
  }
`

// ==========================================
// Grove-specific styles
// ==========================================

// Rewards section — forest green accent with left stripe
export const groveRewardsSectionCss = css`
  position: relative;
  padding: 0.55em 0.7em 0.55em 1.1em;
  background: linear-gradient(135deg, rgba(34, 120, 60, 0.07) 0%, rgba(34, 100, 50, 0.02) 100%);
  border-radius: 0.45em;
  border: 1px solid rgba(34, 120, 60, 0.18);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #66bb6a, #2e7d32);
    border-radius: 0.45em 0 0 0.45em;
  }
`

export const groveRewardsLabelCss = css`
  font-size: 0.8em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #2e7d32;
  margin: 0 0 0.45em;
`

export const groveRewardListCss = css`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35em;
`

export const groveRewardItemCss = css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.35em 0.55em;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.35em;
  border: 1px solid rgba(45, 122, 66, 0.12);
  font-size: 0.88em;
  line-height: 1.5;
  color: #1a4020;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
`

// Crystal info panel — subtle blue-tinted
export const groveCrystalInfoCss = css`
  position: relative;
  padding: 0.45em 0.6em 0.45em 1.1em;
  background: linear-gradient(135deg, rgba(100, 140, 180, 0.07) 0%, rgba(100, 140, 180, 0.02) 100%);
  border-radius: 0.45em;
  border: 1px solid rgba(100, 140, 180, 0.18);
  font-size: 0.84em;
  line-height: 1.55;
  color: #2c4a6b;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3.5px;
    background: linear-gradient(180deg, #64b5f6, #1976d2);
    border-radius: 0.45em 0 0 0.45em;
  }

  > p {
    margin: 0;
  }
`
