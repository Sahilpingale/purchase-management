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
import ItemUpdateScreen from './screens/ItemUpdateScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import HomePage from './screens/HomePage'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/editProfile" component={EditProfileScreen} />
          <Route path="/vendorMaster" component={VendorMasterScreen} exact />
          <Route path="/vendorCreate" component={VendorCreateScreen} />
          <Route path="/vendors/:id" component={VendorUpdateScreen} />
          <Route path="/items/:id" component={ItemUpdateScreen} />
          <Route path="/itemMaster" component={ItemViewScreen} exact />
          <Route path="/itemCreate" component={ItemCreateScreen} />
          <Route
            path="/vendorMaster/search/:keyword"
            component={VendorMasterScreen}
            exact
          />
          <Route
            path="/itemMaster/search/:keyword"
            component={ItemViewScreen}
            exact
          />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
