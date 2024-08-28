"use client"

import { cn } from "@/lib/utils"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
    {
        name: 'Dashboard',
        href: '/dashboard'
    },
    {
        name: '0rders',
        href: '/dashboard/orders'
    },
    {
        name: 'Products',
        href: '/dashboard/products'
    },
    {
        name: 'Categories',
        href: '/dashboard/categories'
    }
]

export function DashboardNavigation() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link key={link.href} href={link.href} className={cn(
                    link.href === pathname 
                    ? "text-blue-600 font-bold underline underline-offset-8"
                    : "text-muted-foreground hover:text-foreground"
                )}>
                    {link.name}
                </Link>
            ))}
        </>
    )
}