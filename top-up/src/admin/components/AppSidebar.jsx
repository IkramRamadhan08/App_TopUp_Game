import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'



// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  


  return (
    <CSidebar
  className="border-end bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-xl"
  colorScheme="dark"
  position="fixed"
  unfoldable={unfoldable}
  visible={sidebarShow}
  onVisibleChange={(visible) => {
    dispatch({ type: 'set', sidebarShow: visible })
  }}
>



      

      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <h1 className='text-white text-4xl  font-thin'>Hadi store</h1>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
