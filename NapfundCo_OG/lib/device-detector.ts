'use client'

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'tv' | 'unknown'
export type Orientation = 'portrait' | 'landscape'

export interface DeviceInfo {
  type: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTV: boolean
  orientation: Orientation
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  isTouchDevice: boolean
  isHighDPI: boolean
  browserName: string
  osName: string
  // Spezifische Geräte-Erkennung
  isIPhone: boolean
  isIPad: boolean
  isAndroid: boolean
  isSamsung: boolean
  isSmartTV: boolean
}

class DeviceDetector {
  private static instance: DeviceDetector
  private deviceInfo: DeviceInfo | null = null
  private listeners: ((info: DeviceInfo) => void)[] = []

  private constructor() {
    if (typeof window !== 'undefined') {
      this.detectDevice()
      window.addEventListener('resize', this.handleResize.bind(this))
      window.addEventListener('orientationchange', this.handleResize.bind(this))
    }
  }

  static getInstance(): DeviceDetector {
    if (!DeviceDetector.instance) {
      DeviceDetector.instance = new DeviceDetector()
    }
    return DeviceDetector.instance
  }

  private detectDevice(): void {
    if (typeof window === 'undefined') return

    const ua = navigator.userAgent.toLowerCase()
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const pixelRatio = window.devicePixelRatio || 1

    // OS Detection
    const isIOS = /iphone|ipad|ipod/.test(ua)
    const isAndroid = /android/.test(ua)
    const isWindows = /windows/.test(ua)
    const isMac = /macintosh|mac os x/.test(ua)
    const isLinux = /linux/.test(ua) && !isAndroid

    // Browser Detection
    const isChrome = /chrome/.test(ua) && !/edge|edg/.test(ua)
    const isFirefox = /firefox/.test(ua)
    const isSafari = /safari/.test(ua) && !isChrome
    const isEdge = /edge|edg/.test(ua)
    const isOpera = /opera|opr/.test(ua)

    // Device Detection
    const isIPhone = /iphone/.test(ua)
    const isIPad = /ipad/.test(ua) || (isMac && 'ontouchend' in document)
    const isSamsung = /samsung/.test(ua)
    const isSmartTV = /smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv/.test(ua)
    
    // Touch Detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Device Type Detection
    let type: DeviceType = 'unknown'
    
    if (isSmartTV || screenWidth >= 1920 && /tv|television/.test(ua)) {
      type = 'tv'
    } else if (isIPhone || (isAndroid && /mobile/.test(ua)) || screenWidth < 768) {
      type = 'mobile'
    } else if (isIPad || (isAndroid && !/mobile/.test(ua)) || (screenWidth >= 768 && screenWidth < 1024 && isTouchDevice)) {
      type = 'tablet'
    } else {
      type = 'desktop'
    }

    // Orientation
    const orientation: Orientation = screenHeight > screenWidth ? 'portrait' : 'landscape'

    // Browser Name
    let browserName = 'unknown'
    if (isChrome) browserName = 'Chrome'
    else if (isFirefox) browserName = 'Firefox'
    else if (isSafari) browserName = 'Safari'
    else if (isEdge) browserName = 'Edge'
    else if (isOpera) browserName = 'Opera'

    // OS Name
    let osName = 'unknown'
    if (isIOS) osName = 'iOS'
    else if (isAndroid) osName = 'Android'
    else if (isWindows) osName = 'Windows'
    else if (isMac) osName = 'macOS'
    else if (isLinux) osName = 'Linux'

    this.deviceInfo = {
      type,
      isMobile: type === 'mobile',
      isTablet: type === 'tablet',
      isDesktop: type === 'desktop',
      isTV: type === 'tv',
      orientation,
      screenWidth,
      screenHeight,
      pixelRatio,
      isTouchDevice,
      isHighDPI: pixelRatio > 1.5,
      browserName,
      osName,
      isIPhone,
      isIPad,
      isAndroid,
      isSamsung,
      isSmartTV,
    }

    this.notifyListeners()
  }

  private handleResize(): void {
    this.detectDevice()
  }

  private notifyListeners(): void {
    if (this.deviceInfo) {
      this.listeners.forEach(listener => listener(this.deviceInfo!))
    }
  }

  getDeviceInfo(): DeviceInfo {
    if (!this.deviceInfo) {
      // Fallback für SSR
      return {
        type: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTV: false,
        orientation: 'landscape',
        screenWidth: 1920,
        screenHeight: 1080,
        pixelRatio: 1,
        isTouchDevice: false,
        isHighDPI: false,
        browserName: 'unknown',
        osName: 'unknown',
        isIPhone: false,
        isIPad: false,
        isAndroid: false,
        isSamsung: false,
        isSmartTV: false,
      }
    }
    return this.deviceInfo
  }

  subscribe(listener: (info: DeviceInfo) => void): () => void {
    this.listeners.push(listener)
    // Sofort aktuellen Status mitteilen
    if (this.deviceInfo) {
      listener(this.deviceInfo)
    }
    // Unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  // Responsive Breakpoint Helpers
  isSmallMobile(): boolean {
    return this.deviceInfo?.screenWidth ? this.deviceInfo.screenWidth < 375 : false
  }

  isMediumMobile(): boolean {
    const width = this.deviceInfo?.screenWidth || 0
    return width >= 375 && width < 428
  }

  isLargeMobile(): boolean {
    const width = this.deviceInfo?.screenWidth || 0
    return width >= 428 && width < 768
  }

  isSmallTablet(): boolean {
    const width = this.deviceInfo?.screenWidth || 0
    return width >= 768 && width < 1024
  }

  isLargeTablet(): boolean {
    const width = this.deviceInfo?.screenWidth || 0
    return width >= 1024 && width < 1280
  }

  isSmallDesktop(): boolean {
    const width = this.deviceInfo?.screenWidth || 0
    return width >= 1280 && width < 1536
  }

  isLargeDesktop(): boolean {
    const width = this.deviceInfo?.screenWidth || 0
    return width >= 1536 && width < 1920
  }

  is4K(): boolean {
    const width = this.deviceInfo?.screenWidth || 0
    return width >= 1920
  }
}

export const deviceDetector = DeviceDetector.getInstance()

// React Hook für Device Detection
export function useDeviceDetector(): DeviceInfo {
  if (typeof window === 'undefined') {
    return deviceDetector.getDeviceInfo()
  }
  return deviceDetector.getDeviceInfo()
}
