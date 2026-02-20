import './App.css'
import Timer from './Components/Timer'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {

  return (
    <main className='bg-violet-400 h-screen flex items-center justify-center'>
      <Timer></Timer>
      <SpeedInsights />
    </main>
  )
}

export default App
