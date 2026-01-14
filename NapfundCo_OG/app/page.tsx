import {
  Hero,
  Categories,
  Bestsellers,
  TrustBadges,
  FoodAdvisorTeaser,
  Reviews,
  Newsletter,
} from '@/components/sections'
import { SubscriptionTeaser } from '@/components/sections/SubscriptionTeaser'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Categories />
      <Bestsellers />
      <SubscriptionTeaser />
      <FoodAdvisorTeaser />
      <Reviews />
      <Newsletter />
    </>
  )
}

