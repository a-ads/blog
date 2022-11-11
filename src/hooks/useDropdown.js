import { useState, useCallback, useEffect } from 'react'

export default function useDropdown({ dropRef }) {
  const dropEl = dropRef.current

  const [drop, setDrop] = useState(false)

  const toggleDrop = useCallback(toggleState => {
    setDrop(toggleState !== undefined ? Boolean(toggleState) : !drop)
  }, [drop])

  const handleClickOutside = useCallback((e) => {
    const clickOutside = !dropEl.contains(e.target)
    if (clickOutside) {
      toggleDrop(false)
    }
  }, [drop])

  useEffect(() => {
    if (drop) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [drop])

  return [
    drop,
    toggleDrop
  ]
}
