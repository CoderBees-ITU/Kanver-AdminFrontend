import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import { DonationsThisMonth } from '@/features/dashboard/components/donationsThisMonth.tsx'
import { TotalDonations } from '@/features/dashboard/components/totalDonations.tsx'
import { UserCount } from '@/features/dashboard/components/userCount.tsx'
import { Overview } from './components/overview'

export default function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}

      {/* ===== Main ===== */}
      <Main>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Donations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TotalDonations />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    User Count
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UserCount />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Donations This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DonationsThisMonth />
                </CardContent>
              </Card>
            </div>
            <div className=''>
              <Card className=''>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
