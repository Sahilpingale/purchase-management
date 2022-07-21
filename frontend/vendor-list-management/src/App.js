import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import vendorMasterScreen from './screens/vendorMasterScreen'
import vendorCreateScreen from './screens/VendorCreateScreen'
import itemCreateScreen from './screens/itemCreateScreen'
import itemViewScreen from './screens/itemViewScreen'

// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/vendorMaster" component={vendorMasterScreen} />
          <Route path="/vendorCreate" component={vendorCreateScreen} />
          <Route path="/itemMaster" component={itemViewScreen} />
          <Route path="/itemCreate" component={itemCreateScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
