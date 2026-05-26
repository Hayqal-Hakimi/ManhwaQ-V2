import { emptyList, emptyItem } from './api';

export const getPolls = async () => {
  return {
    data: [
      {
        id: 'poll-1',
        question: 'Who is the strongest Monarch?',
        ends_at: '2025-06-01',
        options: [
          { id: 'opt-1a', label: 'Shadow Monarch (Jinwoo)', votes: 1250 },
          { id: 'opt-1b', label: 'Destruction Monarch (Antares)', votes: 890 },
          { id: 'opt-1c', label: 'Frost Monarch', votes: 120 }
        ],
        user_vote: null
      },
      {
        id: 'poll-2',
        question: 'Best Revenge Manhwa?',
        ends_at: '2025-06-15',
        options: [
          { id: 'opt-2a', label: 'Nano Machine', votes: 560 },
          { id: 'opt-2b', label: 'Legend of the Northern Blade', votes: 610 },
          { id: 'opt-2c', label: 'Return of the Mount Hua Sect', votes: 890 }
        ],
        user_vote: null
      }
    ]
  };
};

export const getPollById = async () => emptyItem();

export const createPoll = async () => emptyItem('API belum disambung.');

export const votePoll = async () => emptyItem('API belum disambung.');
