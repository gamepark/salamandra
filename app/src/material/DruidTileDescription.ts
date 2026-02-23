import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { DruidTileHelp } from './help/DruidTileHelp'
import DruidTileDayBlue from '../images/tiles/player/PlayerTileBlueDay.png'
import DruidTileDayGrey from '../images/tiles/player/PlayerTileGreyDay.png'
import DruidTileDayRed from '../images/tiles/player/PlayerTileRedDay.png'
import DruidTileDayYellow from '../images/tiles/player/PlayerTileYellowDay.png'
import DruidTileNightBlue from '../images/tiles/player/PlayerTileBlueNight.png'
import DruidTileNightGrey from '../images/tiles/player/PlayerTileGreyNight.png'
import DruidTileNightRed from '../images/tiles/player/PlayerTileRedNight.png'
import DruidTileNightYellow from '../images/tiles/player/PlayerTileYellowNight.png'

class DruidTileDescription extends CardDescription {
  width = 3 * 1.7
  height = 4.7 * 1.7
  borderRadius = 0

  transparency = true

  help = DruidTileHelp

  images = {
    [PlayerColor.Blue]: DruidTileDayBlue,
    [PlayerColor.Grey]: DruidTileDayGrey,
    [PlayerColor.Red]: DruidTileDayRed,
    [PlayerColor.Yellow]: DruidTileDayYellow
  }

  backImages = {
    [PlayerColor.Blue]: DruidTileNightBlue,
    [PlayerColor.Grey]: DruidTileNightGrey,
    [PlayerColor.Red]: DruidTileNightRed,
    [PlayerColor.Yellow]: DruidTileNightYellow
  }

  isFlipped = (item: MaterialItem) => item.location.rotation === true
}

export const druidTileDescription = new DruidTileDescription()
