import React from 'react'
import FaqSection from '../components/FaqSection'
import PlaySafeSection from '../components/PlaySafeSection'
import RecommendedBookmakers from '../components/RecommendedBookmakers'
import SubscribeSection from '../components/SubscribeSection'
import IplBettingSection from '../components/IplBettingSection'
import ReviewCriteriaSection from '../components/ReviewCriteriaSection'
import CricketBettingGuide from '../components/CricketBettingGuide'
import SignupBonusSection from '../components/SignupBonusSection'
import ExpertTipsSection from '../components/ExpertTipsSection'
import UpcomingMatchesSection from '../components/UpcomingMatchesSection'
import BestBettingSites from '../components/BestBettingSites'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <BestBettingSites />
        <UpcomingMatchesSection />
        <ExpertTipsSection />
        <SignupBonusSection />
        <CricketBettingGuide />
        <ReviewCriteriaSection />
        <IplBettingSection />
        <SubscribeSection />
        <RecommendedBookmakers />
        <PlaySafeSection />
        <FaqSection />
    </div>
  )
}

export default Home
