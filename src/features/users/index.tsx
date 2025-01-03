import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { columns } from './components/users-columns';
import { UsersDialogs } from './components/users-dialogs';
import { UsersPrimaryButtons } from './components/users-primary-buttons';
import { UsersTable } from './components/users-table';
import { UsersProvider } from './context/users-context';
import { fetchUsers } from './data/users';
import { User } from './data/schema';

const Users = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setUserList(users);
        setError(null);
      } catch (err) {
        console.error('Error loading users:', err);
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
            <p className="text-muted-foreground">
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <UsersTable data={userList} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  );
};

export default Users;