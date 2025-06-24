import { useState } from 'react'
import './App.css'
import PasswordGenerator from './components/PasswordGenerator'

function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#320d4d] to-[#723980]">
      <PasswordGenerator />
      </div>
  )
}

export default App
