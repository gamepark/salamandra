import { BoardDescription } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import PlayerMatBlue from '../images/boards/PlayerBoardBlue.png'
import PlayerMatGrey from '../images/boards/PlayerBoardGrey.png'
import PlayerMatRed from '../images/boards/PlayerBoardRed.png'
import PlayerMatYellow from '../images/boards/PlayerBoardYellow.png'

class PlayerMatDescription extends BoardDescription {
  width = 6.6
  height = 4.8

  images = {
    [PlayerColor.Blue]: PlayerMatBlue,
    [PlayerColor.Grey]: PlayerMatGrey,
    [PlayerColor.Red]: PlayerMatRed,
    [PlayerColor.Yellow]: PlayerMatYellow
  }
}

export const playerMatDescription = new PlayerMatDescription()
