import Homepage from './components/Homepage'
import HomepageV2 from './components/HomepageV2'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path === '/v2' ? <HomepageV2 /> : <Homepage />
}

export default App
