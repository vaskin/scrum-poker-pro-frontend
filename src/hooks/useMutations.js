import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { API } from '../api';
import { client } from '../api/socket';
import { EVENT_TYPES, ROUTES } from '../constants';
import { recursiveRemove } from '../utils/recursiveRemove';
import { recursiveUpdate } from '../utils/recursiveUpdate';
import { recursiveUpdateChild } from '../utils/recursiveUpdateChild';

export const useCreateMeetingMutation = () => {
  const history = useHistory();

  return useMutation(API.createMeeting, {
    onSuccess: ({ data }) => {
      if (data.type === 'RETRO') {
        history.push(ROUTES.retroMeeting.route(data.id));
      } else {
        history.push(ROUTES.meeting.route(data.id));
      }
    },
  });
};

export const useRemoveMeetingMutation = () => {
  const queryClient = useQueryClient();

  let meetingId = null;

  return useMutation(
    ({ id }) => {
      meetingId = id;

      return API.removeMeeting(id);
    },
    {
      onSuccess({ status }) {
        if (status === 200) {
          queryClient.setQueryData('meetings', (old) => {
            if (old) {
              old.data = old?.data?.filter(
                (meeting) => meeting.id !== meetingId,
              );
            }

            return old;
          });
        }
      },
    },
  );
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(API.updateProfile, {
    onSuccess({ data, status }) {
      if (status === 200) {
        queryClient.setQueryData('profile', (old) => {
          if (old) {
            old.data = data;
          }

          return old;
        });
      }
    },
  });
};

export const useCreateOrUpdateGroupMutation = (groupId) => {
  const queryClient = useQueryClient();

  return groupId
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useMutation((data) => API.updateGroup(groupId, data), {
        onSuccess({ data }) {
          queryClient.setQueryData('groups', (old) => {
            if (old) {
              old.data = old.data.map((group) => {
                if (data.id === group.id) {
                  return {
                    ...data,
                  };
                }

                return group;
              });
            }

            return old;
          });
        },
      })
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useMutation(API.createGroup, {
        onSuccess({ data }) {
          queryClient.setQueryData('groups', (old) => {
            if (old) {
              old.data.push(data);
            }

            return old;
          });
        },
      });
};

export const useSendInviteMutation = () => {
  return useMutation(API.sendInvite);
};

export const useRemoveGroupMutation = (id) => {
  const queryClient = useQueryClient();

  return useMutation(() => API.removeGroup(id), {
    onSuccess() {
      queryClient.setQueryData('groups', (old) => {
        if (old) {
          old.data = old.data.filter((group) => group.id !== id);
        }

        return old;
      });
    },
  });
};

export const useRemoveAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(API.removeAvatar, {
    onSuccess({ status }) {
      if (status === 200) {
        queryClient.setQueryData('profile', (old) => {
          if (old) {
            old.data.avatar = null;
            old.data.contentType = null;
            old.data.fileName = null;
          }

          return old;
        });
      }
    },
  });
};

export const useImportFromMeetingMutation = (meetingId) => {
  const queryClient = useQueryClient();

  return useMutation(API.importFromMeeting, {
    onSuccess({ status, data }) {
      if (status === 200) {
        queryClient.setQueryData(['issues', meetingId], (old) => {
          if (old) {
            old.data.push(...data);
          }

          return old;
        });
      }
    },
  });
};

export const useCreateOrUpdateIssueMutation = (meetingId, issueId) => {
  const queryClient = useQueryClient();

  return issueId
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useMutation((data) => API.updateIssue(issueId, data), {
        onSuccess({ status, data }) {
          if (status === 200) {
            client.send(EVENT_TYPES.ISSUES, data.id);

            queryClient.setQueryData(['issues', meetingId], (old) => {
              if (old) {
                old.data = recursiveUpdate(old.data, data);
              }

              return old;
            });
          }
        },
      })
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useMutation((data) => API.createIssue(meetingId, data), {
        onSuccess({ status, data }) {
          if (status === 200) {
            client.send(EVENT_TYPES.ISSUES, data.id);

            queryClient.setQueryData(['issues', meetingId], (old) => {
              if (old) {
                old.data.push(data);
              }

              return old;
            });
          }
        },
      });
};

export const useDeleteIssueMutation = (issueId, meetingId) => {
  const queryClient = useQueryClient();

  return useMutation(() => API.deleteIssues(issueId), {
    onSuccess({ status }) {
      if (status === 200) {
        client.send(EVENT_TYPES.ISSUES, issueId);

        queryClient.setQueryData(['issues', meetingId], (old) => {
          if (old) {
            old.data = recursiveRemove(old.data, issueId);
          }

          return old;
        });
      }
    },
  });
};

export const useImportFromJiraMutation = (meetingId) => {
  const queryClient = useQueryClient();

  return useMutation((data) => API.importFromJira(meetingId, data), {
    onSuccess({ status, data }) {
      client.send(EVENT_TYPES.ISSUES, null);

      if (status === 200) {
        queryClient.setQueryData(['issues', meetingId], (old) => {
          if (old) {
            data.forEach((item) => {
              if (item.parentId) {
                old.data = recursiveUpdateChild(item.parentId, old.data, [
                  item,
                ]);
              } else {
                old.data.push(item);
              }
            });
          }

          return old;
        });
      }
    },
  });
};

export const useImportSubTasksMutation = (meetingId, issueId) => {
  const queryClient = useQueryClient();

  return useMutation(() => API.importSubTasks(issueId), {
    onSuccess({ status, data }) {
      if (status === 200) {
        client.send(EVENT_TYPES.ISSUES, issueId);

        if (data.length) {
          const lastTask = data[data.length - 1];

          localStorage.setItem('lastTask', lastTask.id);
        }

        queryClient.setQueryData(['issues', meetingId], (old) => {
          if (old) {
            old.data = recursiveUpdateChild(issueId, old.data, data);
          }

          return old;
        });
      }
    },
  });
};

export const useCreateParticipantMutation = (id) => {
  return useMutation(() => API.createParticipant(id));
};

export const useCreateVoteMutation = (id) => {
  const queryClient = useQueryClient();

  return useMutation((data) => API.createVote(id, data), {
    onSuccess({ status, data }) {
      if (status === 200) {
        client.send(EVENT_TYPES.VOTES, id);

        queryClient.setQueryData(['votes', id], (old) => {
          if (old?.data) {
            old.data.push(data);
          }
          return old;
        });
      }
    },
  });
};

export const useStoryPointMutation = (meetingId, id, setCurrentIssue) => {
  const queryClient = useQueryClient();

  return useMutation((data) => API.syncStoryPoint(id, data), {
    onSuccess({ status, data }) {
      setCurrentIssue(data);

      if (status === 200) {
        client.send(EVENT_TYPES.ISSUES, id);

        queryClient.setQueryData(['issues', meetingId], (old) => {
          if (old.data) {
            old.data = recursiveUpdate(old.data, data, ['storyPoint']);
          }
          return old;
        });
      }
    },
  });
};

export const useUpdateSyncStoryPointMutation = (id) => {
  return useMutation((data) => API.updateSyncStoryPoint(id, data), {
    onSuccess() {
      client.send(EVENT_TYPES.ISSUES, id);
    },
  });
};

export const useUpdateMeetingMutation = (id) => {
  return useMutation((data) => API.updateMeeting(id, data));
};

export const useUpdateVotingStatusMutation = (
  id,
  meetingId,
  setCurrentIssue,
) => {
  const queryClient = useQueryClient();

  return useMutation((data) => API.updateVotingStatus(id, data), {
    onSuccess({ status, data }) {
      if (status === 200) {
        client.send(EVENT_TYPES.ISSUES, id);

        setTimeout(() => {
          client.send(EVENT_TYPES.VOTES, id);
        }, 0);

        setCurrentIssue(data);

        queryClient.setQueryData(['issues', meetingId], (old) => {
          if (old?.data) {
            old.data = recursiveUpdate(old.data, data, ['votingStatus']);
          }
          return old;
        });

        queryClient.removeQueries(['votes', id]);
      }
    },
  });
};

export const useLogoutJiraMutation = () => {
  return useMutation('logout', API.logoutJira);
};

export const useRemoveVoteMutation = (id) => {
  return useMutation(['issue', id], () => API.deleteVote(id), {
    onSuccess() {
      client.send(EVENT_TYPES.VOTES, id);
    },
  });
};

export const useSetResourcesMutation = () => {
  return useMutation(['setResources'], (data) => API.setResources(data));
};

export const useSaveTemplatesMutation = () => {
  return useMutation(['templates'], API.saveTemplates);
};

export const useCreateStickerMutation = () => {
  return useMutation(['stickers'], API.createSticker);
};

export const useUpdateStickerMutation = (id) => {
  return useMutation(['stickers'], (data) => API.updateSticker(id, data));
};

export const useRemoveStickerMutation = (id) => {
  return useMutation(['removeSticker'], () => API.deleteSticker(id));
};

export const useSetLikeStickerMutation = (id) => {
  return useMutation(['setLikeSticker', id], () => API.setLikeSticker(id));
};

export const useDeleteLikeStickerMutation = (id) => {
  return useMutation(['setLikeSticker', id], () =>
    API.setDeleteLikeSticker(id),
  );
};

export const useShareResultMutation = () => {
  return useMutation(['sendEmail'], API.shareResult);
};
