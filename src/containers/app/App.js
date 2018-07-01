import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { clientPublicRoutes, clientPrivateRoutes } from '../../routes/routes'
import { connect } from 'react-redux'
import PrivateRoute from '../misc/PrivateRoute'
import { loginSuccess } from '../../actions/actionCreators'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false,
      pathname: this.props.location.pathname
    }
    this.unlistenHistoryChange = null
  }

  componentWillMount = () => {
    const userData = JSON.parse(window.localStorage.getItem('user'))
    if (userData) {
      this.props.dispatch(loginSuccess(userData))
    }
  }

  render() {
    return (
      <div className='app full-height'>
        <Switch>
          <Redirect from='/' to='/home' exact />
          {clientPublicRoutes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          {clientPrivateRoutes.map((route, i) => (
            <PrivateRoute key={i} {...route} />
          ))}
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  global: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
}

function mapStateToProps(state) {
  const { auth, global } = state
  return {
    user: auth ? auth.user : null,
    global: global || null
  }
}

export default withRouter(connect(mapStateToProps)(App))
