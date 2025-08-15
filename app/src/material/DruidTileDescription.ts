import { CardDescription } from '@gamepark/react-game'
import { DruidTile } from '@gamepark/salamandra/material/DruidTile'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import DruidTileDayBlue from '../images/tiles/player/PlayerTileBlueDay.jpg'
import DruidTileDayGrey from '../images/tiles/player/PlayerTileGreyDay.jpg'
import DruidTileDayRed from '../images/tiles/player/PlayerTileRedDay.jpg'
import DruidTileDayYellow from '../images/tiles/player/PlayerTileYellowDay.jpg'
import DruidTileNightBlue from '../images/tiles/player/PlayerTileBlueNight.jpg'
import DruidTileNightGrey from '../images/tiles/player/PlayerTileGreyNight.jpg'
import DruidTileNightRed from '../images/tiles/player/PlayerTileRedNight.jpg'
import DruidTileNightYellow from '../images/tiles/player/PlayerTileYellowNight.jpg'

class DruidTileDescription extends CardDescription {
  width = 1.4
  height = 2.25

  images = {
    [PlayerColor.Blue * 10 + DruidTile.Day]: DruidTileDayBlue,
    [PlayerColor.Blue * 10 + DruidTile.Night]: DruidTileNightBlue,
    [PlayerColor.Grey * 10 + DruidTile.Day]: DruidTileDayGrey,
    [PlayerColor.Grey * 10 + DruidTile.Night]: DruidTileNightGrey,
    [PlayerColor.Red * 10 + DruidTile.Day]: DruidTileDayRed,
    [PlayerColor.Red * 10 + DruidTile.Night]: DruidTileNightRed,
    [PlayerColor.Yellow * 10 + DruidTile.Day]: DruidTileDayYellow,
    [PlayerColor.Yellow * 10 + DruidTile.Night]: DruidTileNightYellow
  }
}

export const druidTileDescription = new DruidTileDescription()
