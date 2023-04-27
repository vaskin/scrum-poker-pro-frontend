import { API_URL } from '../constants';
import UserService from '../services/UserService';
import { instance } from './api';
import { breakpoints } from './breakpoints';

export const createMeeting = (data) => {
  return instance.post(breakpoints.meetings, data);
};

export const getMeetings = () => {
  return instance.get(breakpoints.meetings);
};

export const removeMeeting = (id) => {
  return instance.delete(breakpoints.meetings + '/' + id);
};

export const getProfile = () => {
  return instance.get(breakpoints.getProfile);
};

export const updateProfile = (values) => {
  const data = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (value) {
      data.append(key, value);
    }
  }

  return instance.put(breakpoints.updateProfile, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getMeeting = (id) => {
  return instance.get(breakpoints.meeting(id));
};

export const getMeetingParticipants = (id) => {
  return instance.get(breakpoints.participants(id));
};

export const getGroups = () => {
  return instance.get(breakpoints.groups);
};

export const createGroup = (data) => {
  return instance.post(breakpoints.groups, data);
};

export const sendInvite = (data) => {
  return instance.post(breakpoints.sendInvite, data);
};

export const removeGroup = (id) => {
  return instance.delete(breakpoints.removeGroup(id));
};

export const removeAvatar = () => {
  return instance.delete(breakpoints.removeAvatar);
};

export const updateGroup = (id, data) => {
  return instance.put(breakpoints.updateGroup(id), data);
};

export const importFromMeeting = ({ meetingId, fromMeetingId }) => {
  return instance.post(breakpoints.importFromMeeting(meetingId, fromMeetingId));
};

export const getJiraIssues = (data) => {
  return instance.get(breakpoints.getJiraIssues(data));
};

export const loginWithJira = () => {
  const token = UserService.getToken();
  const redirect_url = window.location.href;

  return API_URL + breakpoints.loginWithJira(token, redirect_url);
};

export const createIssue = (id, data) => {
  return instance.post(breakpoints.getIssues(id), data);
};

export const getIssues = (id) => {
  return instance.get(breakpoints.getIssues(id));
};

export const deleteIssues = (id) => {
  return instance.delete(breakpoints.issue(id));
};

export const updateIssue = (id, data) => {
  return instance.put(breakpoints.issue(id), data);
};

export const importFromJira = (id, data) => {
  return instance.post(breakpoints.importFromJira(id), data);
};

export const getJiraProjects = () => {
  return instance.get(breakpoints.jiraProjects());
};

export const importSubTasks = (id) => {
  return instance.post(breakpoints.importSubTasks(id));
};

export const createParticipant = (id) => {
  return instance.post(breakpoints.participants(id));
};

export const createVote = (id, data) => {
  return instance.post(breakpoints.votes(id), data);
};

export const getVote = (id) => {
  return instance.get(breakpoints.votes(id));
};

export const syncStoryPoint = (id, data) => {
  return instance.put(breakpoints.storyPoint(id), data);
};

export const getFields = () => {
  return instance.get(breakpoints.fields);
};

export const updateSyncStoryPoint = (id, data) => {
  return instance.put(breakpoints.syncStoryPoint(id), data);
};

export const updateMeeting = (id, data) => {
  return instance.put(breakpoints.meeting(id), data);
};

export const updateVotingStatus = (id, data) => {
  return instance.put(breakpoints.votingStatus(id), data);
};

export const logoutJira = () => {
  const token = UserService.getToken();
  const redirect_uri = window.location.href;

  return API_URL + breakpoints.logoutJira(token, redirect_uri);
};

export const deleteVote = (id) => {
  return instance.delete(breakpoints.deleteVote(id));
};

export const getResources = () => {
  return instance.get(breakpoints.getResources);
};

export const setResources = ({ id }) => {
  return instance.put(breakpoints.setResources(id));
};

export const getTemplates = () => {
  return instance.get(breakpoints.templates);
};

export const saveTemplates = (data) => {
  return instance.post(breakpoints.templates, data);
};

export const createSticker = (data) => {
  return instance.post(breakpoints.stickers, data);
};

export const updateSticker = (id, data) => {
  return instance.put(breakpoints.stickers + id, data);
};

export const deleteSticker = (id) => {
  return instance.delete(breakpoints.stickers + id);
};

export const setLikeSticker = (id) => {
  return instance.post(breakpoints.stickersLike(id));
};

export const setDeleteLikeSticker = (id) => {
  return instance.delete(breakpoints.stickersLike(id));
};

export const shareResult = (data) => {
  return instance.post(breakpoints.shareResult, data);
};
