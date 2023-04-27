import * as yup from 'yup';

import { EMAIL_MESSAGE, REQUIRED_MESSAGE } from './messages';

export const pokerPlanningSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE).trim(),
});

export const editProfileSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE).trim(),
});

export const createGroupSchema = yup.object().shape({
  email: yup.string().email(EMAIL_MESSAGE).trim(),
});

export const retroMeetingSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE).trim(),
  columns: yup.array().of(
    yup.object().shape({
      value: yup.string().required(REQUIRED_MESSAGE).trim(),
    }),
  ),
});

export const createEditSticker = yup.object().shape({
  text: yup.string().required(REQUIRED_MESSAGE).trim(),
});

export const shareSchema = yup.object().shape({
  email: yup.string().email(EMAIL_MESSAGE).trim(),
});
