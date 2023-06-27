import { CountriesPage } from "./pages/CountriesPage"
import { Analytics } from '@vercel/analytics/react';
import './index.css'

function App() {

  return <>
    <div className="container">
      <CountriesPage />
    </div>
    <Analytics />
  </>
}

export default App
