'use client'
import { useEffect, useState } from 'react'
export default function CSRPage () {
  const [t, setT] = useState('')
  useEffect(() => setT(new Date().toLocaleTimeString()), [])
  return <p>CSR 时间: {t}</p>
}
