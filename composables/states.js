export const useTables = () => useState('tables', () => []);
export const sharedState = () => useState('share', () => 0);
export const useStoreOpenNewTicketModal = () =>
  useState('openTicketModal', () => false);
