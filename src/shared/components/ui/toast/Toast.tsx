import { ToastContainer, Zoom } from 'react-toastify'

import './Toast.scss'

export const ToastProvider = () => {
  return (
    <ToastContainer
      position={'bottom-left'}
      autoClose={3000}
      hideProgressBar
      transition={Zoom}
      closeOnClick
      pauseOnHover
      draggable
      theme={'colored'}
      icon={false}
    />
  )
}
