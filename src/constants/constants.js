export const API_URL = 'https://space.scrumpokerpro.com/api';
export const SOCKET_URL = (meetingId, token) =>
  `wss://space.scrumpokerpro.com/ws/meetings/${meetingId}?access_token=${token}`;

export const ROUTES = {
  retroMeetingCreate: '/retro-meeting',
  pokerPlanning: '/poker-planning',
  home: '/',
  meeting: {
    path: '/meeting/:id/',
    route: (id) => `/meeting/${id}/`,
  },
  retroMeeting: {
    path: '/retro-meeting/:id/',
    route: (id) => `/retro-meeting/${id}/`,
  },
};

export const VOTING_SYSTEMS = {
  fibonacci: 'FIBONACCI',
  powerOf2: 'POWEROF2',
  tShirts: 'TSHIRTS',
};

export const VOTING_SYSTEMS_NUMBER = {
  fibonacci: [1, 2, 3, 5, 8, 13],
  powerOf2: [1, 2, 4, 8, 16, 32],
  tShirts: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

export const TYPES = {
  STORY: 'STORY',
  TASK: 'TASK',
  BUG: 'BUG',
};

export const VOTING_STATUSES = {
  done: 'DONE',
  new: 'NEW',
};

export const EVENT_TYPES = {
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  ISSUES: 'ISSUES',
  VOTES: 'VOTES',
  SELECT: 'SELECT',
};
