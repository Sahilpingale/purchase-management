import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VendorMasterScreen from './screens/VendorMasterScreen'
import VendorCreateScreen from './screens/VendorCreateScreen'
import VendorUpdateScreen from './screens/VendorUpdateScreen'
import ItemCreateScreen from './screens/ItemCreateScreen'
import ItemViewScreen from './screens/ItemViewScreen'
import HomePage from './screens/HomePage'

// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/vendorMaster" component={VendorMasterScreen} />
          <Route path="/vendorCreate" component={VendorCreateScreen} />
          <Route path="/vendors/:id" component={VendorUpdateScreen} />
          <Route path="/itemMaster" component={ItemViewScreen} />
          <Route path="/itemCreate" component={ItemCreateScreen} />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
