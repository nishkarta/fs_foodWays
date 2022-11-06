import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MarkerContext } from './Contexts/MarkerContext';
import { UserContext } from './Contexts/userContext';
import { API } from '../config/api';
import { useQuery } from 'react-query';


const AddMarker = () => {
    // const [loc, setLoc] = useContext(MarkerContext)
    let { loc, setLoc } = useContext(MarkerContext)
    // setLoc(position)
    // setLoc(markerPost)
    console.log("loc di edit", loc)
    const map = useMap();

    useEffect(() => {
        map.on("click", function (e) {
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            const lat = e.latlng.lat
            const lng = e.latlng.lng
            // console.log("ini lat", lat)
            // console.log("ini e.latlng.lat", e.latlng.lat)
            let newLoc = [lat, lng]
            // console.log("newLoc", newLoc)
            setLoc(newLoc)
        });
    }, []);
    return null;
};

const Geocoder = ({ form, setForm, userDefaultLocation }) => {
    const map = useMap();
    // show marker user location when user open map
    userDefaultLocation &&
        L.marker({
            lat: userDefaultLocation.split(',')[0],
            lng: userDefaultLocation.split(',')[1],
        })
            .addTo(map)
            .bindPopup('hahaha')
            .openPopup();
    // event click on map
    map.on('click', (e) => {
        setForm({ ...form, location: `${e.latlng.lat},${e.latlng.lng}` });
        L.marker(e.latlng).addTo(map).bindPopup().openPopup();
    });
    // search map control
    L.Control.geocoder({
        defaultMarkGeocode: false,
    })
        .on('markgeocode', function (e) {
            var latlng = e.geocode.center;
            setForm({ ...form, location: `${latlng.lat},${latlng.lng}` });
            L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
            map.fitBounds(e.geocode.bbox);
        })
        .addTo(map);
    return null;
};
const GeoRouting = ({ partnerLocation }) => {
    const map = useMap();
    // const { userProfile, refetch } = useContext(UserContext);
    const [state] = useContext(UserContext)
    let { data: user } = useQuery("userEditCache", async () => {
        const response = await API.get(`user/${state.user.id}`);
        return response.data.data;
    });

    // const defaultMarker = [-6.408596, 106.764748];
    useEffect(() => {
        var marker1 = L.marker([36.8065, 10.1815], { icon: DefaultIcon }).addTo(
            map
        );
        map.on('click', (e) => {
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            L.Routing.control({

                waypoints: [
                    L.latLng(
                        user?.location.split(',')[0],
                        user?.location.split(',')[1]
                    ),
                    L.latLng(partnerLocation.split(',')[0], partnerLocation.split(',')[1]),
                ],
                lineOptions: {
                    styles: [
                        {
                            color: 'blue',
                            weight: 6,
                        },
                    ],
                },
                routeWhileDragging: false,
                geocoder: L.Control.Geocoder.nominatim(),
                addWaypoints: true,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: false,
                pointMarkerStyle: {
                    color: 'red',
                },
            }).on("routesfound", function (e) {
                e.routes[0].coordinates.forEach((c, i) => {
                    setTimeout(() => {
                        marker1.setLatLng([c.lat, c.lng]);
                    }, 1000 * i);
                });
            }).addTo(map);
        });
    }, []);
    return null;
};

function Map({ showMap, setShowMap, form, setForm, routing, user, partnerLocation }) {
    const [latitudeNow, setLatitudeNow] = useState('')
    const [longitudeNow, setLongitudeNow] = useState('')
    // let [lat, setLat] = useState('')
    // let [lon, setLon] = useState('')


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitudeNow(position.coords.latitude)
            setLongitudeNow(position.coords.longitude)
        })

    }, [])

    console.log("ini latitude di map", latitudeNow)

    const position = [latitudeNow, longitudeNow];

    return (
        <>

            <div className='mapModal'>
                <Modal show={showMap} size='l' centered onHide={() => setShowMap(false)}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* <LeafletGeocoder /> */}
                            {/* <AddMarker /> */}
                            {routing ? (
                                <GeoRouting partnerLocation={partnerLocation} />
                            ) : (
                                <Geocoder
                                    form={form}
                                    setForm={setForm}
                                    userDefaultLocation={user && user.location}
                                />
                            )}
                        </MapContainer>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )

}
let DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],

});

L.Marker.prototype.options.icon = DefaultIcon;

export default Map