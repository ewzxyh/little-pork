"use client"

import * as React from "react"
import {
  BarChart3,
  Bitcoin,
  CreditCard,
  Home,
  Target,
  TrendingUp,
  Wallet,
  Settings,
  Users,
  PlusCircle,
  Calendar,
  Calculator,
  Receipt,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    title: "Geral",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
      {
        title: "Usuários",
        url: "/users",
        icon: Users,
      }
    ],
  },
  {
    title: "Financeiro",
    items: [
      {
        title: "Transações",
        url: "/transactions",
        icon: Receipt,
      },
      {
        title: "Orçamento",
        url: "/budget",
        icon: Calculator,
      },
      {
        title: "Contas",
        url: "/accounts",
        icon: Wallet,
      },
      {
        title: "Cartões",
        url: "/cards",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Planejamento",
    items: [
      {
        title: "Metas",
        url: "/goals",
        icon: Target,
      },
      {
        title: "Dívidas",
        url: "/debts",
        icon: TrendingUp,
      },
      {
        title: "Investimentos",
        url: "/investments",
        icon: BarChart3,
      },
      {
        title: "Crypto",
        url: "/crypto",
        icon: Bitcoin,
      },
    ],
  },
  {
    title: "Relatórios",
    items: [
      {
        title: "Gastos Mensais",
        url: "/reports/monthly",
        icon: Calendar,
      },
      {
        title: "Análise Anual",
        url: "/reports/yearly",
        icon: BarChart3,
      },
    ],
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Wallet className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-sidebar-foreground">
              FinanceCouple
            </span>
            <span className="text-xs text-sidebar-foreground/70">
              Controle Financeiro
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-2 py-2">
          <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/transactions/new">
              <PlusCircle className="h-4 w-4" />
              Nova Transação
            </Link>
          </Button>
        </div>

        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-sidebar-foreground/70">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.url}
                      className="w-full justify-start gap-3 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-600"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full justify-start gap-3">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                Configurações
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-2 py-2 text-xs text-sidebar-foreground/50">
          <div className="flex items-center justify-between">
            <span>v1.0.0</span>
            <span>Enzo & Letícia</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
