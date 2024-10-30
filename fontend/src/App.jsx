import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter } from 'react-router-dom'
import { RouterCustom } from '../router'
import { ToastContainer } from 'react-toastify'






function App() {

  return (



<BrowserRouter><RouterCustom/>
<ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        //pauseOnFocusLoss
        draggable
        //pauseOnHover
        theme="light"
      />
</BrowserRouter>
  )
}

export default App
