import { css } from '@emotion/react'
import { GameTheme } from '@gamepark/react-game'
import background from './images/background.jpg'

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Salamandra palette — alchemist parchment with the petrol blue sampled from
// background.jpg, and salamander amber as a warm accent.
const blue = '#0a6d90'
const blueHover = '#0c7da5'
const blueActive = '#00485f'
const amber = '#c8892e'
const amberLight = '#e0a848'
const parchment = '#efeadc'
const ink = '#3a2a17'

// Filled "wooden signpost" button used across the UI (headers, dialogs, items).
export const salamandraButtonCss = css`
  cursor: pointer;
  padding: 0.3em 0.9em;
  border-radius: 0.5em;
  border: 0.08em solid ${blueActive};
  background: linear-gradient(135deg, ${blueHover} 0%, ${blue} 55%, ${blueActive} 100%);
  color: #f6f1e3;
  font-weight: 700;
  text-shadow: 0 0.05em 0.05em rgba(0, 0, 0, 0.35);
  box-shadow: 0 0.12em 0.3em rgba(0, 0, 0, 0.35), inset 0 0.06em 0 rgba(255, 255, 255, 0.25), inset 0 -0.06em 0 rgba(0, 0, 0, 0.15);
  transition: filter 0.15s, transform 0.15s;

  &:focus {
    outline: none;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: translateY(-0.05em);
  }

  &:active:not(:disabled) {
    filter: brightness(0.95);
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #b3ad9c, #a29c88);
    border-color: #8a8472;
    color: #6b6455;
    text-shadow: none;
    box-shadow: none;
    cursor: auto;

    img,
    picture {
      filter: grayscale(1) opacity(0.6);
    }
  }
`

// Plain underlined link, used for inline "see this card" actions inside dialogs.
// Uses !important to fully neutralize the global filled `theme.buttons` recipe.
export const salamandraLinkCss = css`
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
  transform: none !important;
  color: inherit;
  font-weight: inherit;
  text-decoration: underline;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    background: none !important;
    filter: none !important;
    transform: none !important;
  }
`

export const salamandraTheme: DeepPartial<GameTheme> = {
  root: {
    background: {
      image: background,
      overlay: 'rgba(0, 0, 0, 0.5)'
    }
  },
  palette: {
    primary: blue,
    primaryHover: blueHover,
    primaryActive: blueActive,
    primaryLight: 'rgba(10, 109, 144, 0.1)',
    primaryLighter: 'rgba(10, 109, 144, 0.05)',
    surface: parchment,
    onSurface: ink,
    onSurfaceFocus: 'rgba(10, 109, 144, 0.14)',
    onSurfaceActive: 'rgba(10, 109, 144, 0.24)',
    danger: '#a83232',
    dangerHover: '#f6dede',
    dangerActive: '#f0caca',
    disabled: '#a89e86'
  },
  buttons: salamandraButtonCss,
  dialog: {
    backgroundColor: parchment,
    color: ink,
    container: css`
      border-radius: 0.6em;
      background:
        radial-gradient(ellipse at 20% 12%, rgba(210, 195, 150, 0.35), transparent 55%),
        radial-gradient(ellipse at 82% 88%, rgba(150, 125, 80, 0.16), transparent 55%),
        linear-gradient(168deg, #e6ddc6 0%, #efeadc 30%, #f4efe1 50%, #ece3cd 75%, #e2d8bf 100%);
      box-shadow:
        0 0.6em 2.5em rgba(0, 0, 0, 0.6),
        0 0 0 0.1em rgba(120, 95, 45, 0.35),
        0 0 0 0.28em rgba(40, 30, 15, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    `,
    content: css`
      > h1,
      > h2 {
        color: ${blue};
      }
    `
  },
  header: {
    // Keep the header buttons compact: the global filled recipe adds vertical
    // padding that is huge at the header's large font size.
    buttons: css`
      padding: 0 0.7em;
      border-radius: 0.4em;
      box-shadow: 0 0.06em 0.15em rgba(0, 0, 0, 0.4);
    `
  },
  result: {
    border: blue,
    icon: amber,
    container: css`
      border-radius: 0.6em;
    `
  },
  menu: {
    mainButton: css`
      background: ${blue} !important;
      box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
    `,
    popButton: css`
      color: ${blue};
      background: white;

      &:focus,
      &:hover {
        background: ${blue};
        color: white;
      }
    `
  },
  playerPanel: {
    activeRingColors: [amber, amberLight]
  }
}
