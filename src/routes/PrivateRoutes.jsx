import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ROUTES } from '../constants';
import { Home } from '../screens/Home/Home';
import { Meeting } from '../screens/Meeting/Meeting';
import { PokerPlanningCreate } from '../screens/PokerPlanningCreate/PokerPlanningCreate';
import { RetroMeeting } from '../screens/RetroMeeting/RetroMeeting';
import { RetroMeetingCreate } from '../screens/RetroMeetingCreate/RetroMeetingCreate';

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route
        path={ROUTES.retroMeetingCreate}
        exact
        component={RetroMeetingCreate}
      />
      <Route
        path={ROUTES.pokerPlanning}
        exact
        component={PokerPlanningCreate}
      />
      <Route path={ROUTES.meeting.path} exact component={Meeting} />
      <Route path={ROUTES.home} exact component={Home} />
      <Route path={ROUTES.retroMeeting.path} exact component={RetroMeeting} />
      <Redirect from={'*'} to={ROUTES.home} />
    </Switch>
  );
};
