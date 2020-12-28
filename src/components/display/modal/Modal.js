import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import '../../Style/ModalStyle.css'

const modalElement = document.getElementById('modal-root')

const Modal = ({ children, fade=false, defaultOpened = false }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => setIsOpen(false), [])

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }),
    [close],
  )

  const handleEscape = useCallback((event) => {
    if (event.keyCode === 27) { setIsOpen(false) }
  }, [])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? (
      <div className={ `modal ${fade ? 'modal-fade' : ''}` }>
        <div className="modal-overlay" onClick={ close } />
          <span className="modal-close" role='button' aria-label='close' onClick={ close }>
          X
          </span>
        <div className='modal-body'>
          { children }
        </div>

      </div>
    )
      : null
    , modalElement
  )
}

export default forwardRef(Modal)
