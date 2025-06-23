"use client"

import * as React from "react"
import Image from "next/image"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarRail,
} from "@/components/ui/sidebar"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader>
            <span className="flex rounded-md items-center justify-center bg-primary p-5">
               <Image
                  src={'/media/images/logo.webp'}
                  alt="Logo"
                  width={100}
                  height={100}
               />
            </span>
         </SidebarHeader>
         <SidebarContent>
            <NavMain />
         </SidebarContent>
         <SidebarFooter>
            <NavUser />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}
