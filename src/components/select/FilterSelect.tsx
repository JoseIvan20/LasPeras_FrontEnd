import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search, Check, CircleX } from 'lucide-react'

interface FilterSelectProps {
  options: string[]
  onSelect: (option: string) => void
  value?: string | null
  disabled?: boolean
  placeholder?: string
  label: string
  searchPlaceholder?: string
  error?: string
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  onSelect,
  value = null,
  disabled = false,
  placeholder = 'Seleccionar',
  label,
  searchPlaceholder = 'Buscar...',
  error
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
 
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen) {
        setTimeout(() => searchInputRef.current?.focus(), 0)
      }
    }
  }
 
  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
    setSearchTerm('')
  }
 
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )
 
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex !== -1) {
          handleSelect(filteredOptions[focusedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
      default:
        break
    }
  }
 
  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }
 
  return (
    <div className="relative w-full mb-4" ref={selectRef}>
      <AnimatePresence>
        {error && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={errorVariants}
            className='flex justify-center items-center text-red-700 text-sm mt-1 bg-red-100 font-semibold rounded-md p-1 mb-2 gap-2'
          >
            <CircleX className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <label htmlFor={label} className='text-sm font-medium text-gray-700'>
          {label}
        </label>
      </div>
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-slate-700"
        disabled={disabled}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`${value ? 'text-gray-900' : 'text-gray-500'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[60]"
              onClick={() => setIsOpen(false)}
            />
         
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-[70] mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-full"
              style={{ minWidth: '250px' }}
              role="listbox"
              onKeyDown={handleKeyDown}
            >
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                </div>
              </div>
 
              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No se encontraron resultados
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <div
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                        index === focusedIndex ? 'bg-gray-100' : ''
                      }`}
                      role="option"
                      aria-selected={value === option}
                      tabIndex={0}
                    >
                      <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center
                      ${value === option ? 'bg-slate-700 border-slate-700' : 'border-gray-300'}`}
                      >
                      {value === option && (
                        <Check className="text-white" size={12} />
                      )}
                      </div>
                      <span className="text-sm text-gray-700">
                        {option}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
 
export default FilterSelect