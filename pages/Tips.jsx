import React from 'react'
import BettingTipsHero from '../components/BettingTipsHero'
import CricketBettingTipsPage from '../components/CricketBettingTipsPage'
import IplBettingStrategies from '../components/IplBettingStrategies'
import BettingMistake from '../components/BettingMistake'
import Conclusion from '../components/Conclusion'
import SiteFaq from '../components/SiteFaq'

const Tips = () => {
  return (
    <div>
      <BettingTipsHero />
      <CricketBettingTipsPage />
      <IplBettingStrategies />
      <BettingMistake />
      <Conclusion />
      <SiteFaq />
    </div>
  )
}

export default Tips
