const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((pos) => {
        const { latitude, longitude } = pos.coords;

        socket.emit("send-location", { latitude, longitude })

    }, (error) => {
        console.log(error)
    },
    {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    })
}
 
const map = L.map("map").setView([0,0],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Tanmay Papa"
}).addTo(map)


const markers = {};

socket.on("receive-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude],10)

    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id]= L.marker([latitude,longitude]).addTo(map)
    }

})

socket.on("user-disconnected", (id)=>{
    if(marker[id]){
        map.removeLayer(markers[id]);
        delete markers[id]; 
    }
})