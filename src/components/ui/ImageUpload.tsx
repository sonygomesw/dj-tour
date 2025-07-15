'use client'

import { useState, useRef } from 'react'
import { Camera, X } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onUpload: (file: File) => void
  value?: string
  size?: number
}

export function ImageUpload({ onUpload, value, size = 150 }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onUpload(new File([], ''))
  }

  return (
    <div
      className={`relative group cursor-pointer ${
        dragActive ? 'ring-2 ring-violet-500' : ''
      }`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        width: size,
        height: size
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
      
      {value ? (
        <>
          <Image
            src={value}
            alt="Profile"
            width={size}
            height={size}
            className="rounded-full object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4 text-gray-900 dark:text-white" />
          </button>
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-8 h-8 text-gray-900 dark:text-white" />
          </div>
        </>
      ) : (
        <div
          className={`w-full h-full rounded-full border-2 border-dashed ${
            dragActive ? 'border-violet-500 bg-violet-500/10' : 'border-white/20 bg-white/[0.02]'
          } flex items-center justify-center transition-colors`}
        >
          <Camera className="w-8 h-8 text-gray-500 dark:text-white/40" />
        </div>
      )}
    </div>
  )
} 