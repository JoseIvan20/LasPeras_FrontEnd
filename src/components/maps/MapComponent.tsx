import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Asegurarnos de que los estilos de Leaflet estén cargados
import 'leaflet/dist/leaflet.css'

const PeraIcon = L.icon({
  iconUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconRetinaUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconSize: [28, 28],           // Tamaño ajustado para mejor visibilidad
  iconAnchor: [14, 28],         // Punto de anclaje en la base del ícono
  popupAnchor: [0, -28],        // Popup aparece arriba del ícono
  tooltipAnchor: [3, -11],
})

export default function MapComponent() {
  const position: [number, number] = [19.4326, -99.1332] // Coordenadas de ejemplo (Ciudad de México)

  useEffect(() => {
    // Forzar una actualización del mapa después de que se monte
    const map = document.querySelector('.leaflet-container')
    if (map) {
      window.dispatchEvent(new Event('resize'))
    }
  }, [])

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
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
  )
}

