import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { getAuth } from 'firebase/auth'
import { useRouter } from '@tanstack/react-router'

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export const Main = ({ fixed, ...props }: MainProps) => {

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user === null) {
        router.navigate({ to: '/sign-in' })
      }
    })
    return unsubscribe
  }, [router])




  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        'px-4 py-6',
        fixed && 'fixed-main flex flex-col flex-grow overflow-hidden'
      )}
      {...props}
    />
  )
}

Main.displayName = 'Main'
