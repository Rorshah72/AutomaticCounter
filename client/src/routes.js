import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {BasketPage} from './pages/BasketPage'
import {CreatePage} from './pages/CreatePage'
import {CreateCounterPage} from './pages/CreateCounterPage'
import {CounterPage} from './pages/CounterPage'
import {StatsPage} from './pages/StatsPage'
import {AllStatsPage} from './pages/AllStatsPage'
import {CreateStatsPage} from './pages/CreateStatsPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
    console.log(isAuthenticated)
  if (isAuthenticated){
    return(
      <Switch>
        <Route path = '/basket' exact>
          <BasketPage/>
        </Route>

        <Route path = '/create' exact>
          <CreatePage/>
        </Route>

        <Route path = '/counter/create' exact>
          <CreateCounterPage/>
        </Route>

        <Route path = '/counter/:id'>
          <CounterPage/>
        </Route>

        <Route path = '/stats/:id' exact>
          <StatsPage/>
        </Route>

        <Route path = '/stats' exact>
          <AllStatsPage/>
        </Route>

        <Route path = '/stats/create/:id' exact>
          <CreateStatsPage/>
        </Route>

        <Redirect to = "/create"/>
      </Switch>
    )
  }

  return(
    <Switch>
      <Route path =  "/" exact>
        <AuthPage/>
      </Route>

      <Redirect to = "/create"/>
    </Switch>
  )
}
