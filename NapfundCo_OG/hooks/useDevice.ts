'use client'

import { useState, useEffect } from 'react'
import { deviceDetector, type DeviceInfo } from '@/lib/device-detector'

export function useDevice(): DeviceInfo & { isLoading: boolean } {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(deviceDetector.getDeviceInfo())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial device info
    setDeviceInfo(deviceDetector.getDeviceInfo())
    setIsLoading(false)

    // Subscribe to changes
    const unsubscribe = deviceDetector.subscribe((info) => {
      setDeviceInfo(info)
    })

    return unsubscribe
  }, [])

  return { ...deviceInfo, isLoading }
}

// Shorthand hooks
export function useIsMobileDevice(): boolean {
  const { isMobile, isLoading } = useDevice()
  return !isLoading && isMobile
}

export function useIsTabletDevice(): boolean {
  const { isTablet, isLoading } = useDevice()
  return !isLoading && isTablet
}

export function useIsDesktopDevice(): boolean {
  const { isDesktop, isLoading } = useDevice()
  return !isLoading && isDesktop
}

export function useIsTouchDevice(): boolean {
  const { isTouchDevice, isLoading } = useDevice()
  return !isLoading && isTouchDevice
}

export function useOrientation(): 'portrait' | 'landscape' {
  const { orientation } = useDevice()
  return orientation
}

export function useScreenSize(): { width: number; height: number } {
  const { screenWidth, screenHeight } = useDevice()
  return { width: screenWidth, height: screenHeight }
}
