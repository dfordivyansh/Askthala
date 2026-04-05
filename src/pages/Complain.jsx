import React from 'react'
import ComplainHero from '../components/ComplainHero'
import ComplaintSteps from '../components/ComplaintSteps'
import ComplaintProcess from '../components/ComplaintProcess'
import LatestCompliant from '../components/LatestCompliant'
import MyComplaint from '../components/MyComplaint'
import ComplaintModal from '../components/ComplaintModal'

const Complain = () => {
  return (
    <div>
      <ComplainHero />
      <ComplaintSteps />
      <ComplaintProcess />
      <LatestCompliant />
    </div>
  )
}

export default Complain
