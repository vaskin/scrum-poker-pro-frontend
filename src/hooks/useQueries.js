import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import { API } from '../api';
import { ROUTES } from '../constants';
import UserService from '../services/UserService';

export const useGetMeetingsQuery = () => {
  return useQuery('meetings', API.getMeetings);
};

export const useGetProfileQuery = () => {
  return useQuery('profile', API.getProfile);
};

export const useGetMeetingQuery = (id) => {
  const history = useHistory();

  return useQuery(['meeting', id], () => API.getMeeting(id), {
    onError({ response }) {
      if (response.status === 400) {
        history.push(ROUTES.home);
      }
    },
  });
};

export const useGetMeetingParticipantsQuery = (id) => {
  const history = useHistory();

  return useQuery(
    ['meetingParticipants', id],
    () => API.getMeetingParticipants(id),
    {
      onError({ response }) {
        if (response.status === 400) {
          history.push(ROUTES.home);
        }
      },
      enabled: false,
    },
  );
};

export const useGetGroupsQuery = () => {
  return useQuery('groups', API.getGroups);
};

export const useGetJiraProjectsQuery = (search) => {
  return useQuery(['jiraIssues', search], () => API.getJiraIssues(search), {
    retry: false,
    enabled: false,
    cacheTime: 0,
  });
};

export const useGetIssuesQuery = (meetingId) => {
  return useQuery(['issues', meetingId], () => API.getIssues(meetingId), {
    enabled: false,
  });
};

export const useGetJiraProjects = () => {
  return useQuery('jiraProjects', API.getJiraProjects, {
    retry: false,
  });
};

export const useGetVotesQuery = (id) => {
  return useQuery(['votes', id], () => API.getVote(id), {
    enabled: !!id,
  });
};

export const useGetFieldsQuery = () => {
  return useQuery(['fileds'], API.getFields);
};

export const useGetResourcesQuery = () => {
  return useQuery('resources', API.getResources);
};

export const useGetTemplatesQuery = () => {
  return useQuery('templates', API.getTemplates);
};
