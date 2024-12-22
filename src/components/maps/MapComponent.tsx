import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const PeraIcon = L.icon({
  iconUrl: '..src/images/pera-marker.png',
  iconRetinaUrl: '../src/images/pera-marker-2x.png',
  iconSize: [7, 22],
  iconAnchor: [3, 22],
  popupAnchor: [0, -22],
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

