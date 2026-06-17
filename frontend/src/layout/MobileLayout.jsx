import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'


export default function MobileLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fbf9f4]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-col lg:ml-72">
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-x-clip pb-24 lg:pb-8">{children}</main>

      </div>
    </div>
  )
}
