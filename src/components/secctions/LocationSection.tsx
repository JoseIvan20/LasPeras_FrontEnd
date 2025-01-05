import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from "@cloudinary/url-gen/actions/resize"
import { format, quality } from "@cloudinary/url-gen/actions/delivery"
import { auto } from "@cloudinary/url-gen/qualifiers/format"
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality"
import { MapPin } from 'lucide-react'


// Configuración de Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: "dgphzdi4e"
  }
})

const PeraIcon = L.icon({
  iconUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconRetinaUrl: 'https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/xnruzqleome2zopfbyne.png',
  iconSize: [10, 30],
  iconAnchor: [3, 22],
  popupAnchor: [0, -22],
  tooltipAnchor: [3, -11],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined
})

export default function LocationSection() {
  const [isMounted, setIsMounted] = useState(false)
  const position: [number, number] = [19.363984795125166, -99.29821437241759] // Coordenadas de ejemplo (Ciudad de México)

  const latitude = 19.363984795125166
  const longitude = -99.29821437241759
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
  const wazeUrl = `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // o un placeholder mientras se carga el mapa
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-2 text-[#444444]">
            Salón de Evento
            <span className='flex items-center font-bold text-gray-500'>
              Las Peras
              <img
                src={cld.image('contact_images/yavwqfubik47qtv4w6po')
                  .resize(fill().width(40).height(40))
                .delivery(format(auto()))
                .delivery(quality(autoQuality()))
                .toURL()
                }
                alt="Logo pera"
                className='w-10'
              />
            </span>
          </h3>
          <a href='https://maps.app.goo.gl/WbUDvE7W5ZNKi94WA?g_st=com.google.maps.preview.copy' className="text-gray-600">
            Lic. Castillo Ledón 205, Cuajimalpa, Cuajimalpa de Morelos, 05000 Ciudad de México, CDMX
          </a>
          <div className='flex flex-col sm:flex-row justify-center md:justify-end gap-4 mt-6'>
            <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 transition-colors"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Abrir en Google Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-[#444] bg-[#F8F8F8] hover:bg-[#F4F4F4] transition-colors"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Abrir en Waze
              </a>
          </div>
          
        </div>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={PeraIcon}>
              <Popup>
                Salón de Eventos Las Peras <br /> ¡Te esperamos aquí!
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  )
}