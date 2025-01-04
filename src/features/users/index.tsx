import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { fetchBannedUsers } from './api/userApis.ts'
import { getColumns } from './components/users-columns'
// Updated to use dynamic columns
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import { UsersProvider } from './context/users-context'
import { User } from './data/schema'
import { fetchUsers } from './data/users'

const Users = () => {
  const [userList, setUserList] = useState<User[]>([])
  const [bannedUsers, setBannedUsers] = useState<string[]>([]) // State for banned users
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadUsersAndBannedStatus = async () => {
      try {
        const [users, bannedIds] = await Promise.all([
          fetchUsers(),
          fetchBannedUsers(),
        ])
        setUserList(users)
        setBannedUsers(bannedIds)
        setError(null)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadUsersAndBannedStatus()
  }, [])

  if (loading) {
    return (
      <div className='text-center'>
        <p>Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-red-500 text-center'>
        <p>{error}</p>
      </div>
    )
  }

  const refreshBannedUsers = async () => {
    try {
      const bannedIds = await fetchBannedUsers()
      setBannedUsers(bannedIds)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) { /* empty */ }
  }

  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>

        <div className='overflow-x-auto'>
          <UsersTable
            data={userList}
            columns={getColumns(bannedUsers, refreshBannedUsers)}
            bannedUsers={bannedUsers}
          />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}

export default Users
