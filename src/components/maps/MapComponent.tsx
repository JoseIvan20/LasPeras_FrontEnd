import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'


const PeraIcon = L.icon({
  iconUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconRetinaUrl: '../src/images/pera-marker-x2.png',
  iconSize: [28, 28],           // Tamaño ajustado para mejor visibilidad
  iconAnchor: [14, 28],         // Punto de anclaje en la base del ícono
  popupAnchor: [0, -28],        // Popup aparece arriba del ícono
  tooltipAnchor: [3, -11],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined
})

export default function MapComponent() {
  const position: [number, number] = [19.4326, -99.1332] // Coordenadas de ejemplo (Ciudad de México)

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

