import { About } from './components/About'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Measurements } from './components/Measurements'
import { Navbar } from './components/Navbar'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Measurements />
        <WhyUs />
        <Projects />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
