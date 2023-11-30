'use client'
import useConversation from '@/hooks/useConversation'
import useRoutes from '@/hooks/useRoutes'
import React from 'react'
import MobileNavItem from './MobileNavItem'

const MobileFooter = () => {

    const routes = useRoutes()
    const { isOpen } = useConversation()

    if (isOpen) {
        return null
    }

    return (
        <div className='fixed  justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] border-gray-100 lg:hidden '>
            {routes.map((route) => (
                <MobileNavItem 
                key={route.label}
                href={route.href}
                active={route.active}
                onClick={route.onClick}
                icon={route.icon}
                />
            ))}
        </div>
    )
}

export default MobileFooter
