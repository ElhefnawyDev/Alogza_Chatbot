"use client"

import type { User } from "next-auth"
import { useRouter } from "next/navigation"

import { PlusIcon, Wand2Icon } from 'lucide-react'
import { SidebarHistory } from "@/components/sidebar-history"
import { SidebarUserNav } from "@/components/sidebar-user-nav"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, useSidebar } from "@/components/ui/sidebar"
import Link from "next/link"

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-col gap-3 px-2 py-2">
            <Link
              href="/"
              onClick={() => {
                setOpenMobile(false)
              }}
              className="flex flex-row gap-3 items-center mb-2"
            >
              <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                Chatbot
              </span>
            </Link>
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ease-in-out bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg active:shadow-inner"
              onClick={() => {
                setOpenMobile(false);
                router.push('/');
                router.refresh();
              }}
            >
              <PlusIcon className="h-5 w-5" />
              <span>New Chat</span>
            </button>
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ease-in-out bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg active:shadow-inner"
              onClick={() => {
                setOpenMobile(false);
                router.push('/promting/');
                router.refresh();
              }}
            >
              <Wand2Icon className="h-5 w-5" />
              <span>Prompt Generator</span>
            </button>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  )
}