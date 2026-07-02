import { css } from '@emotion/react'
import { ItemButtonProps, ItemMenuButton } from '@gamepark/react-game'
import { HTMLAttributes, ReactNode } from 'react'

type SalamandraMenuButtonProps = ItemButtonProps &
  HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
  }

// Simple colored item-menu button (petrol blue, no image), in the spirit of
// the menu buttons used in chateau-combo / zenith / mythologies.
export const SalamandraMenuButton = (props: SalamandraMenuButtonProps) => <ItemMenuButton css={menuButtonCss} {...props} />

const menuButtonCss = css`
  background: radial-gradient(circle at 35% 30%, #0c7da5 0%, #0a6d90 55%, #00485f 100%);
  border: 0.12em solid rgba(0, 0, 0, 0.35);
  color: #f6f1e3;
  box-shadow:
    0 0.12em 0.35em rgba(0, 0, 0, 0.7),
    inset 0 0.06em 0.12em rgba(255, 255, 255, 0.35),
    inset 0 -0.06em 0.12em rgba(0, 0, 0, 0.3);
  transition: margin-top 0.15s;

  &:hover {
    margin-top: -0.15em;
  }
`
