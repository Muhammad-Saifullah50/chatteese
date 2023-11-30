"use client"

import clsx from "clsx"
import Link from "next/link"

interface MobileNavItemProps {
    href: string
    icon: any
    active?: boolean
    onClick?: () => void
}
const MobileNavItem = ({ href, active, onClick, icon: Icon }: MobileNavItemProps) => {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link href={href} onClick={handleClick} className={clsx('group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-50 hover:text-black hover:bg-gray-100', active && 'bg-gray-100')} >
            <Icon className={'h-6 w-6 text-black'}/>
        </Link>
    )
}

export default MobileNavItem
