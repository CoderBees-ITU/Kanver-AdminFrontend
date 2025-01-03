import React, { useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { User } from '../data/schema';

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete';

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (type: UsersDialogType | null) => void;
  currentRow: User | null;
  setCurrentRow: Dispatch<SetStateAction<User | null>>;
}

const UsersContext = React.createContext<UsersContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const UsersProvider = ({ children }: Props) => {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<User | null>(null);

  return (
    <UsersContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};