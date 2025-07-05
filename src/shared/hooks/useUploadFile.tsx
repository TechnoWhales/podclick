import { ComponentProps, useRef } from 'react'

import { Button } from '@/shared/components/ui'

/**
 * Список допустимых типов файлов.
 */
type FileType =
  | 'all'
  | 'image'
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
export function useUploadFile({ typeFile = 'all', onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Обработчик выбора файла.
   * Использует FileReader для чтения файла в формате base64
   * и вызывает колбэк onUpload, если он передан.
   */
  const handleFileChange = () => {
    const file = inputRef.current?.files?.[0]

    if (!file) {return}

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


