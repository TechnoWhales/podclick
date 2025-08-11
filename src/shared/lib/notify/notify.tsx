import { ReactNode } from 'react'
import { toast, ToastOptions } from 'react-toastify'

export const notify = {
  success: (msg: string | ReactNode, options?: ToastOptions) => toast.success(msg, options),
  info: (msg: string | ReactNode, options?: ToastOptions) => toast.info(msg, options),
  warning: (msg: string | ReactNode, options?: ToastOptions) => toast.warn(msg, options),
  error: (msg: string | ReactNode, options?: ToastOptions) =>
    toast.error(
      <p>
        <strong>Error!&nbsp;</strong> {msg}
      </p>,
      options
    ),
}
