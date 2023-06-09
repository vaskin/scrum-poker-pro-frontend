export const breakpoints = {
  meetings: '/pro/meetings',
  getProfile: '/pro/profiles/me',
  updateProfile: '/pro/profiles',
  removeAvatar: '/pro/profiles/avatars',
  meeting: (id) => `/pro/meetings/${id}`,
  participants: (id) => `/pro/meetings/${id}/participants`,
  groups: '/pro/group-invites',
  removeGroup: (id) => `/pro/group-invites/${id}`,
  sendInvite: '/pro/emails/invitations',
  updateGroup: (id) => `/pro/group-invites/${id}`,
  importFromMeeting: (meetingId, fromMeetingId) =>
    `/pro/meetings/${meetingId}/copy-issues/${fromMeetingId}`,
  getJiraIssues: ({ search, jql }) => `/jira/issues?jql=${jql}&text=${search}`,
  loginWithJira: (token, redirect_uri) =>
    `/jira/login/jira?access_token=${token}&redirect_uri=${redirect_uri}`,
  getIssues: (id) => `/pro/meetings/${id}/issues`,
  issue: (id) => `/pro/issues/${id}`,
  importFromJira: (id) => `/pro/meetings/${id}/jira-issues`,
  jiraProjects: () => '/jira/projects',
  importSubTasks: (id) => `/pro/issues/${id}/sub-tasks`,
  votes: (id) => `/pro/issues/${id}/votes`,
  storyPoint: (id) => `/pro/issues/${id}/story-points`,
  syncStoryPoint: (id) => `/pro/issues/${id}/story-points/sync`,
  fields: '/jira/fields',
  votingStatus: (id) => `/pro/issues/${id}/voting-status`,
  logoutJira: (token, redirect_uri) =>
    `/jira/logout/jira?access_token=${token}&redirect_uri=${redirect_uri}`,
  deleteVote: (id) => `/pro/issues/${id}/votes`,
  getResources: '/jira/resources',
  setResources: (id) => `/jira/resources/${id}`,
  templates: '/pro/templates',
  stickers: '/pro/stickers/',
  stickersLike: (id) => `/pro/stickers/${id}/likes`,
  getAvatar: (id, token) => `/pro/stickers/${id}/avatars?access_token=${token}`,
  shareResult: `/pro/emails/retro-results`,
};
