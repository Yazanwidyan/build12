import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router'

import LandingPage from '@/pages/LandingPage'
import AuthPage from '@/pages/AuthPage'
import OnboardingPage from '@/pages/OnboardingPage'
import DashboardPage from '@/pages/DashboardPage'
import AdventurePage from '@/pages/AdventurePage'
import BuilderPage from '@/pages/BuilderPage'
import ProfilePage from '@/pages/ProfilePage'
import NotFoundPage from '@/pages/NotFoundPage'
import AboutPage from '@/pages/AboutPage'
import PricingPage from '@/pages/PricingPage'
import ContactPage from '@/pages/ContactPage'

import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'

// ── Root ────────────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
})

// ── Auth guard ──────────────────────────────────────────────────────────────────
const requireAuth = () => {
  const { isAuthenticated } = useAuthStore.getState()
  if (!isAuthenticated) throw redirect({ to: '/login' })
}

const requireOnboarding = () => {
  requireAuth()
  const { onboardingComplete } = useProfileStore.getState()
  if (!onboardingComplete) throw redirect({ to: '/onboarding' })
}

// ── Public routes ───────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <AuthPage mode="login" />,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: () => <AuthPage mode="signup" />,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

// ── Auth-required routes ────────────────────────────────────────────────────────
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  beforeLoad: requireAuth,
  component: OnboardingPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: requireOnboarding,
  component: DashboardPage,
})

const adventureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/adventure',
  beforeLoad: requireOnboarding,
  component: AdventurePage,
})

const builderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/builder',
  beforeLoad: requireOnboarding,
  component: BuilderPage,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  beforeLoad: requireOnboarding,
  component: ProfilePage,
})

// ── Router ──────────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  aboutRoute,
  pricingRoute,
  contactRoute,
  onboardingRoute,
  dashboardRoute,
  adventureRoute,
  builderRoute,
  profileRoute,
])

export const router = createRouter({ routeTree })
