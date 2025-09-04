import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinanceCouple - Controle Financeiro para Casal",
  description:
    "Aplicação completa de controle financeiro para casais, com gestão de receitas, despesas, metas e investimentos.",
  keywords:
    "controle financeiro, casal, orçamento, metas, investimentos, crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="flex-1 min-h-screen bg-gray-50/50">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
