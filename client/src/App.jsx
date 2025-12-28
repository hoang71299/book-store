import Banner from './components/Banner'
import Header from './components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import HomePage from './components/HomePage'
function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Banner></Banner>
          <HomePage />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
