import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Cloudinary } from '@cloudinary/url-gen'

// Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: "dgphzdi4e"
  }
})

// Obtener la URL de la imagen del marcador desde Cloudinary
const markerImageUrl = cld.image('xnruzqleome2zopfbyne')
  .format('png')  // Asegurar formato PNG para transparencia
  .quality('auto')
  .toURL()

const PeraIcon = L.icon({
  iconUrl: markerImageUrl,
  iconRetinaUrl: markerImageUrl,
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

