/**
 * Fetches the station information from the API
 * @param stationId {string} The station id to fetch FACULTATIVE
 * @returns {Map} Station id (String) => Station data (JSON)
 * @example JSON Keys
 * station_id (Station id),
 * name (Station name),
 * lat (Station latitude),
 * lon (Station longitude),
 * capacity (Station capacity)
 * address (Station address)
 */
export async function getStationData(stationId) {
    const apiUrl = 'https://transport.data.gouv.fr/gbfs/nancy/station_information.json';

    try {
        let stationData = await fetch(apiUrl);
        stationData = await stationData.json();
        const stationMap = new Map();

        for (const station of stationData.data.stations) {

            let stationInfo = {
                "id": station.station_id,
                "capacity": station.capacity,
                "lat": station.lat,
                "lon": station.lon,
                "name": station.name.split(/-(.*)/s)[1].trim(),
                "address": station.address,
            };

            stationMap.set(station.station_id, stationInfo);
        }

        console.log('Station information fetched');
        if (stationId) {
            return stationMap.get(stationId);
        } else {
            return stationMap;
        }

    } catch (error) {
        console.error('Error fetching station information:', error);
        return null;
    }
}

/**
 * Fetches all the station status from the API or a specific station status if stationId is provided
 * @param stationId {string} The station id to fetch FACULTATIVE
 * @returns {Promise<*|null>} The station status or null if an error occurred
 * @example JSON Keys
 * station_id (Station id),
 * is_installed (Station installed),
 * is_renting (Station renting),
 * is_returning (Station returning),
 * last_reported (Station last reported),
 * num_bikes_available (Number of bikes available),
 * num_docks_available (Number of docks available)
 */
export async function getStationStatus(stationId) {
    const apiUrl = 'https://transport.data.gouv.fr/gbfs/nancy/station_status.json';

    try {

        let stationStatus = await fetch(apiUrl);
        stationStatus = await stationStatus.json();

        if (stationId) {
            return stationStatus.data.stations.find(station => station.station_id === stationId);
        } else {
            return stationStatus.data.stations;
        }

    } catch (error) {
        console.error('Error fetching station status:', error);
        return null;
    }
}

/**
 * Fetches the bike availability from the API or a specific station bike availability if stationId is provided
 * @param stationId {string} The station id to fetch FACULTATIVE
 * @returns {Promise<Map<any, any>|*>} The bike availability or null if an error occurred
 */
export async function getBikeAvailability(stationId) {
    if (stationId) {
        const stationStatus = await getStationStatus(stationId);
        return stationStatus.num_bikes_available;
    } else {
        const stationStatus = await getStationStatus();
        let bikeAvailability = new Map();
        for (const station of stationStatus) {
            bikeAvailability.set(station.station_id, station.num_bikes_available);
        }
        return bikeAvailability;
    }
}

/**
 * Fetches the station availability from the API or a specific station station availability if stationId is provided
 * @param stationId {string} The station id to fetch FACULTATIVE
 * @returns {Promise<Map<any, any>|*>} The station availability or null if an error occurred
 */
export async function getStationAvailability(stationId) {
    if (stationId) {
        const stationStatus = await getStationStatus(stationId);
        return stationStatus.num_docks_available;
    } else {
        const stationStatus = await getStationStatus();
        let stationAvailability = new Map();
        for (const station of stationStatus) {
            stationAvailability.set(station.station_id, station.num_docks_available);
        }
        return stationAvailability;
    }
}

// getStationData().then(r => console.log(r));
// getStationStatus().then(r => console.log(r));
// getBikeAvailability().then(r => console.log(r));
// getStationAvailability().then(r => console.log(r));
//
// getStationData('30').then(r => console.log(r));
// getStationStatus('30').then(r => console.log(r));
// getBikeAvailability('30').then(r => console.log(r));
// getStationAvailability('30').then(r => console.log(r));

//TODO : Nombre de vélos disponibles par station et nombre de places disponibles par station != de la capacité ??




