/**
 * Fetches the station information from the API
 *
 * @returns {Map} Station id => Station data (capacity, lat, lon, name)
 */
async function getStationData() {
    const apiUrl = 'https://transport.data.gouv.fr/gbfs/nancy/station_information.json';

    try {
        let stationData = await fetch(apiUrl);
        stationData = await stationData.json();
        const stationMap = new Map();

        stationData.data.stations.forEach(station => {

            let stationInfo = {
                "capacity": station.capacity,
                "lat": station.lat,
                "lon": station.lon,
                "name": station.name.split(/-(.*)/s)[1].trim()
            }

            stationMap.set(station.station_id, stationInfo);
        });

        console.log('Station information fetched');

        return stationMap;
    } catch (error) {
        console.error('Error fetching station information:', error);
        return null;
    }
}

/**
 * Fetches all the station status from the API or a specific station status if stationId is provided
 * @param stationId {string} The station id to fetch FACULTATIVE
 * @returns {Promise<*|null>} The station status or null if an error occurred
 */
async function getStationStatus(stationId) {
    const apiUrl = 'https://transport.data.gouv.fr/gbfs/nancy/station_status.json';

    try {
        let stationStatus = await fetch(apiUrl);
        stationStatus = await stationStatus.json();

        if (stationId){
            return stationStatus.data.stations.find(station => station.station_id === stationId);
        } else {
            return stationStatus.data.stations;
        }
    } catch (error) {
        console.error('Error fetching station status:', error);
        return null;
    }
}

getStationData().then(r => console.log(r));
getStationStatus().then(r => console.log(r));
getStationStatus('30').then(r => console.log(r));





