import React from 'react'
import BettingSitesHero from '../components/BettingSitesHero'
import TopBettingSites from '../components/TopBettingSites'
import BestBettingInfo from '../components/BestBettingInfo'
import IplBettingInfo from '../components/IplBettingInfo'
import SportsBettingOverview from '../components/SportsBettingOverview'
import BestIplApps from '../components/BestIplApps'
import OnlineBettingAppsInfo from '../components/OnlineBettingAppsInfo'
import KeyFactors from '../components/KeyFactors'
import RegistrationBonusInfo from '../components/RegistrationBonusInfo'
import BettingGuide from '../components/BettingGuide'
import SiteFaq from '../components/SiteFaq'

const Sites = () => {
  return (
    <div>
      <BettingSitesHero />
      <TopBettingSites />
      <BestBettingInfo />
      <IplBettingInfo />
      <SportsBettingOverview />
      <BestIplApps />
      <OnlineBettingAppsInfo />
      <KeyFactors />
      <BettingGuide />
      <RegistrationBonusInfo />
      <SiteFaq />
    </div>
  )
}

export default Sites
