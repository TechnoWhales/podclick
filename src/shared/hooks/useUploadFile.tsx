import { ComponentProps, useRef } from 'react'

import { Button } from '@/shared/components/ui'
import {notify} from "@/shared/lib/notify";

/**
 * Список допустимых типов файлов.
 */
type FileType =
  | 'all'
  | 'image'
    | 'pngjpeg'
  | 'video'
  | 'audio'
  | 'pdf'
  | 'doc'
  | 'excel'
  | 'ppt'
  | 'text'
  | 'archive'
  | 'code'

/**
 * MIME-типы для соответствующих типов файлов.
 */
const MIME_TYPES: Record<FileType, string> = {
  all: '*/*',
  image: 'image/*',
  pngjpeg: 'image/png, image/jpeg',
  video: 'video/*',
  audio: 'audio/*',
  pdf: 'application/pdf',
  doc: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  excel: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation',
  text: 'text/plain',
  archive: 'application/zip, application/x-rar-compressed, application/x-7z-compressed',
  code: 'text/javascript, text/html, text/css, application/json',
}

/**
 * Параметры хука useUploadFile.
 */
type Props = {
  /**
   * Тип файла, который разрешено загружать (по умолчанию — 'all').
   */
  typeFile?: FileType

  /**
   * Колбэк, вызываемый после загрузки файла.
   * Возвращает объект с исходным файлом и его base64-представлением(e.target?.result).
   */
  onUpload?: ({ file, base64 }: { file: File; base64: string }) => void
  maxSizeMB?: number //
}



/**
 * Кастомный хук для загрузки файлов.
 *
 * @param {Props} props — настройки хука: допустимый тип файла и обработчик загрузки.
 *
 * @returns {{
 *   UploadButton: (props: ComponentProps<typeof Button>) => JSX.Element
 * }} — компонент кнопки, открывающей окно выбора файла.
 */
export function useUploadFile({ typeFile = 'all', onUpload, maxSizeMB = 20 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const MAX_SIZE_MB = maxSizeMB
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

  /**
   * Обработчик выбора файла.
   * Использует FileReader для чтения файла в формате base64
   * и вызывает колбэк onUpload, если он передан.
   */
  const handleFileChange = () => {
    const file = inputRef.current?.files?.[0]

    if (!file) {return}

    if (typeFile === 'pngjpeg' && !['image/png', 'image/jpeg'].includes(file.type)) {
      notify.error("PNG or JPEG files only")

      return
    }


    if (file.size > MAX_SIZE_BYTES) {
      notify.error(`File size is too big. Max size is ${maxSizeMB}MB`)

      return;
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      const base64 = e.target?.result

      if (typeof base64 === 'string') {
        onUpload?.({ file, base64 })
      }
    }

    reader.readAsDataURL(file)
  }

  /**
   * Скрытый input для выбора файла.
   */
  const Input = (
    <input
      type={"file"}
      ref={inputRef}
      onChange={handleFileChange}
      style={{ display: 'none' }}
      accept={MIME_TYPES[typeFile]}
    />
  )

  /**
   * Компонент кнопки загрузки.
   * При нажатии открывает системный выбор файла.
   */
  const UploadButton = ({ children, ...props }: ComponentProps<typeof Button>) => (
    <>
      {Input}
      <Button {...props} onClick={() => inputRef.current?.click()}>
        {children}
      </Button>
    </>
  )

  return { UploadButton }
}


