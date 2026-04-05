import React from 'react'
import BettingAppHero from '../components/BettingAppHero'
import BettingAppsFeatures from '../components/BettingAppsFeatures'
import Top10Apps from '../components/Top10Apps'
import CricketIplAppsInfo from '../components/CricketIplAppsInfo'
import IplApps from '../components/IplApps'
import OnlineBetting from '../components/OnlineBetting'
import HowAppsWork from '../components/HowAppsWork'
import WhyChooseMobileApps from '../components/WhyChooseMobileApps'
import LegalBettingInfo from '../components/LegalBettingInfo'
import HowToStartBetting from '../components/HowToStartBetting'
import FinanceBettingApp from '../components/FinanceBettingApp'
import RegisterLogin from '../components/RegisterLogin'
import DepositInfo from '../components/DepositInfo'
import AccountVerification from '../components/AccountVerification'
import SiteFaq from '../components/SiteFaq'

const BettingApp = () => {
  return (
    <div>
        <BettingAppHero />
        <BettingAppsFeatures />
        <Top10Apps />
        <CricketIplAppsInfo />
        <IplApps />
        <OnlineBetting />
        <HowAppsWork />
        <WhyChooseMobileApps />
        <LegalBettingInfo />
        <HowToStartBetting />
        <FinanceBettingApp />
        <RegisterLogin />
        <AccountVerification />
        <DepositInfo />
        <SiteFaq />
      
    </div>
  )
}

export default BettingApp
