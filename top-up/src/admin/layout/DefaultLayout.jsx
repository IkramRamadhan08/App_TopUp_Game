import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar, AppHeader, AppFooter } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100" style={{ marginLeft: '250px' }}>
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <Outlet /> {/* render konten berdasarkan route */}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
