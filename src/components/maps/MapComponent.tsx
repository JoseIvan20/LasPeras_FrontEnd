import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Solución para el ícono por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  shadowUrl: ''
})

const PeraIcon = L.icon({
  iconUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconRetinaUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
  tooltipAnchor: [3, -11],
  shadowUrl: null as any
})

export default function MapComponent() {
  const position: [number, number] = [19.358891, -99.291025] // Coordenadas exactas

  useEffect(() => {
    // Forzar actualización del mapa
    const map = document.querySelector('.leaflet-container')
    if (map) {
      window.dispatchEvent(new Event('resize'))
    }

    // Precargar la imagen
    const img = new Image()
    img.src = PeraIcon.options.iconUrl
  }, [])

  return (
    <div className="h-[400px] w-full">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={PeraIcon}>
          <Popup>
            Salón de Eventos Las Peras <br /> ¡Te esperamos aquí!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}