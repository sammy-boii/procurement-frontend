'use client'

import { ClipboardPen, Eraser, Save } from 'lucide-react'
import React, { useRef, useEffect, useState, SetStateAction } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const SignaturePad = ({
  canSign = false,
  signature,
  setSignature
}: {
  canSign?: boolean
  signature?: string
  setSignature: React.Dispatch<SetStateAction<string | undefined>>
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef<boolean>(false)
  const lastXRef = useRef<number>(0)
  const lastYRef = useRef<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    if (signature) return

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (canvas) {
      canvas.width = 200
      canvas.height = 150
      context?.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [signature])

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { offsetX, offsetY } = event.nativeEvent
    isDrawingRef.current = true
    lastXRef.current = offsetX
    lastYRef.current = offsetY
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!context || !isDrawingRef.current) return

    const { offsetX, offsetY } = event.nativeEvent
    context.beginPath()
    context.moveTo(lastXRef.current, lastYRef.current)
    context.lineTo(offsetX, offsetY)
    context.strokeStyle = '#000'
    context.lineWidth = 2
    context.stroke()
    lastXRef.current = offsetX
    lastYRef.current = offsetY
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
  }

  const clearCanvas = () => {
    setSignature(undefined)
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      const pixelData = context?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data
      const isEmpty =
        pixelData && Array.from(pixelData).every((value) => value === 0)

      console.log(isEmpty)

      // if (isEmpty) {
      //   setSignature(undefined)
      // } else {
      const dataUrl = canvas.toDataURL('image/png')
      setSignature(dataUrl)
      // }
    }
    setIsEditing(false)
  }

  return (
    <div className='flex justify-between items-center'>
      <div className='my-4 relative w-[200px] border h-[150px] border-dashed border-gray-400'>
        {signature ? (
          <Image className='object-contain' src={signature} fill alt='' />
        ) : (
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={cn('cursor-cell', !isEditing && 'pointer-events-none')}
          />
        )}
      </div>

      {canSign && (
        <div className='flex mt-3 flex-col self-start gap-2'>
          {!isEditing ? (
            <Button onClick={handleEditClick} className='flex items-center'>
              <ClipboardPen /> Edit
            </Button>
          ) : (
            <>
              <Button
                variant={'destructive'}
                onClick={clearCanvas}
                className='flex items-center'
              >
                <Eraser /> Clear
              </Button>

              <Button onClick={saveSignature} className='flex items-center'>
                <Save /> Done
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SignaturePad
