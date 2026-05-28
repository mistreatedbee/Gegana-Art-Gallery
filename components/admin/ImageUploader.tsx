'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  currentUrl?: string | null
  onUpload: (url: string, publicId: string) => void
  folder?: string
}

export function ImageUploader({ currentUrl, onUpload, folder = 'gegana-gallery' }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('File must be under 20MB.')
      return
    }

    setError('')
    setUploading(true)

    try {
      // Get signed upload params from our API
      const paramRes = await fetch('/api/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder }),
      })
      if (!paramRes.ok) throw new Error('Failed to get upload credentials')
      const { timestamp, signature, apiKey, cloudName, folder: uploadFolder } = await paramRes.json()

      // Upload directly to Cloudinary
      const formData = new FormData()
      formData.append('file', file)
      formData.append('timestamp', timestamp)
      formData.append('signature', signature)
      formData.append('api_key', apiKey)
      formData.append('folder', uploadFolder)

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!cloudRes.ok) throw new Error('Cloudinary upload failed')
      const result = await cloudRes.json()

      setPreview(result.secure_url)
      onUpload(result.secure_url, result.public_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-sm transition-colors cursor-pointer ${
          uploading ? 'opacity-50 cursor-not-allowed' : 'border-bone/20 hover:border-gold/60'
        }`}
      >
        {preview ? (
          <div className="relative aspect-[3/4] max-h-64 overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            {!uploading && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setPreview(null); onUpload('', '') }}
                className="absolute top-2 right-2 bg-ink/70 text-bone p-1 hover:bg-ink transition-colors"
              >
                <X size={16} />
              </button>
            )}
            <div className="absolute inset-0 bg-ink/0 hover:bg-ink/30 transition-colors flex items-center justify-center">
              <span className="text-bone text-xs font-sans tracking-widest uppercase opacity-0 hover:opacity-100">
                Change Image
              </span>
            </div>
          </div>
        ) : (
          <div className="aspect-[3/4] max-h-48 flex flex-col items-center justify-center gap-3 p-6">
            {uploading ? (
              <div className="text-bone/40 font-sans text-sm">Uploading…</div>
            ) : (
              <>
                <ImageIcon size={32} className="text-bone/20" strokeWidth={1} />
                <div className="text-center">
                  <p className="text-bone/60 font-sans text-sm">Click to upload</p>
                  <p className="text-bone/30 font-sans text-xs mt-1">JPG, PNG, WebP up to 20MB</p>
                </div>
                <div className="flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 text-xs font-sans tracking-widest uppercase">
                  <Upload size={14} />
                  Choose File
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-400 font-sans text-xs">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  )
}
