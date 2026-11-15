import React from 'react'
import { Outlet } from 'react-router-dom'
import { OrganicPurpleBackground } from '../features/auth/components/OrganicPurpleBackground'

interface AuthLayoutProps {
  children?: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen h-screen w-full relative overflow-hidden select-none">
      {/* Code-Generated Organic Vector Waves Background */}
      <OrganicPurpleBackground />

      {/* Konten Halaman Auth */}
      {children || <Outlet />}
    </div>
  )
}

export default AuthLayout
