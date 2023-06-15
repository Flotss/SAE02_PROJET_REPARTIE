/**
 * Fetches circulation incidents from the circulation incidents feed
 * @returns {Promise<null|*[]>} The circulation incidents or null if an error occurred
 * @example JSON Keys
 * description (Incident description and roads effects),
 * short_description (Incident description,
 * lat (latitude),
 * lon (longitude),
 * location (street),
 * postcode (postcode),
 * city (city),
 * start (Incident start),
 * end (Incident end)
 */
export async function getCirculationIncidents() {
    try {
        let response = await fetch('https://carto.g-ny.org/data/cifs/cifs_waze_v2.json');
        response = await response.json();

        let incidents = [];

        for (const incident of response.incidents) {
            let incidentLocation = await fetch('https://api-adresse.data.gouv.fr/reverse?lon=' + incident.location.polyline.split(' ')[1] + '&lat=' + incident.location.polyline.split(' ')[0] + '&type=street&limit=1')
                .then(r => r.json())
                .then(r => r.features[0].properties)
                .catch(e => console.error(e));

            incidents.push({
                description: incident.description,
                short_description: incident.short_description,
                lat: incident.location.polyline.split(' ')[0],
                lon: incident.location.polyline.split(' ')[1],
                location: incidentLocation.name,
                postcode: incidentLocation.postcode,
                city: incidentLocation.city,
                start: convertDateToFrench(new Date(incident.starttime)),
                end: convertDateToFrench(new Date(incident.endtime)),
            });
        }

        return incidents;

    } catch (error) {
        console.error('Error fetching circulation incidents:', error);
        return null;
    }
}

/**
 * Converts a date to french format from a Date object
 * @param date {Date} The date to convert (ISO)
 * @returns {string} The date in french format DD/MM/YYYY
 */
function convertDateToFrench(date) {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
    return date.toLocaleDateString('fr-FR', options);
}

getCirculationIncidents().then((r => console.log(r)));