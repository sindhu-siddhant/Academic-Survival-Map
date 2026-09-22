import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom"
import { useEffect } from "react"

import Dashboard from "./pages/Dashboard"
import Subjects from "./pages/Subjects"
import Planner from "./pages/Planner"
import Analytics from "./pages/Analytics"
import SubjectDetails from "./pages/SubjectDetails"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10">
        <Link
          to="/"
          className="text-sm font-semibold tracking-[0.2em] uppercase"
        >
          ASM / 01
        </Link>

        <div className="hidden gap-8 text-sm md:flex">
          <Link to="/">Dashboard</Link>
          <Link to="/subjects">Subjects</Link>
          <Link to="/planner">Planner</Link>
          <Link to="/analytics">Analytics</Link>
        </div>

        <button className="rounded-full border border-black/20 px-4 py-2 text-xs uppercase tracking-widest">
          Profile
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:code" element={<SubjectDetails />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

