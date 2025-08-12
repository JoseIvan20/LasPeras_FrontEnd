// Hook de GTM

import { useEffect } from 'react'


declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const useGTM = (gtmId: string) => {
  useEffect(() => {
    // Verificar si GTM ya está cargado para evitar duplicados
    if (window.dataLayer) {
      return;
    }

    // Crear dataLayer si no existe
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })

    // Crear y añadir el script de GTM
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`

    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    }

    // Cleanup function para remover el script si el componente se desmonta
    return () => {
      const existingScript = document.querySelector(`script[src*="${gtmId}"]`)
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    };
  }, [gtmId]);
};
