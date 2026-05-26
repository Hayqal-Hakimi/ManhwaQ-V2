import { emptyList, emptyItem } from './api';

export const getNotifications = async () => ({
  data: [],
  unread_count: 0,
  message: 'API belum disambung.',
});

export const markNotificationRead = async () => emptyItem('API belum disambung.');

export const markAllNotificationsRead = async () => emptyItem('API belum disambung.');
