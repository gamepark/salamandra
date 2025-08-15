import { CardDescription } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import ScoreMarkerBlue from '../images/tiles/scoreMarker/ScoreMarkerBlue.jpg'
import ScoreMarkerRed from '../images/tiles/scoreMarker/ScoreMarkerRed.jpg'
import ScoreMarkerGrey from '../images/tiles/scoreMarker/ScoreMarkerGrey.jpg'
import ScoreMarkerYellow from '../images/tiles/scoreMarker/ScoreMarkerYellow.jpg'

class ScoreMarkerDescription extends CardDescription {
  width = 0.32
  height = 0.32

  images = {
    [PlayerColor.Blue]: ScoreMarkerBlue,
    [PlayerColor.Grey]: ScoreMarkerGrey,
    [PlayerColor.Red]: ScoreMarkerRed,
    [PlayerColor.Yellow]: ScoreMarkerYellow
  }
}

export const scoreMarkerDescription = new ScoreMarkerDescription()
