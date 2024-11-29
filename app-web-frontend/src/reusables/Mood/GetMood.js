import { SERVER_ADDRESS } from "../../setupInfo";
import { getUserAuthToken } from "../utils/AuthToken"

async function getMoodDataFromServer(authToken, startDate, endDate) {
    let formatStartDate = dateToIsoWithoutTime(startDate)
    let formatEndDate = dateToIsoWithoutTime(endDate)
    const url = `${SERVER_ADDRESS}/user-mood/getByUser/timeframe?start=${formatStartDate}&end=${formatEndDate}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch mood data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching mood data:', error);
        return {}; // Return an empty array in case of error
    }
}

async function getMoodsForTimeFrame(startDate, endDate) {
    const authToken = getUserAuthToken()
    const moodData = await getMoodDataFromServer(authToken, startDate, endDate);
    const moods = [];

    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
        const currentDateISO = dateToIsoWithoutTime(currentDate)
        // Find mood data for the current date
        const moodInfo = moodData[currentDateISO];

        const default_color = "#DCDCDC"
        const default_emoji = "😐"
        let color = (currentDateISO in moodData && moodInfo.color !== undefined) ? moodInfo.color : default_color;
        let emoji = (currentDateISO in moodData && moodInfo.emoji !== undefined) ? moodInfo.emoji : default_emoji;
        moods.push({
            date: new Date(currentDate),
            color: color,
            emoji: emoji,
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return moods;
}

export async function getCriticalPatientsDataForDoctor() {
    const authToken = getUserAuthToken()
    const url = `${SERVER_ADDRESS}/user-mood/getCriticalUsersMoodByDoctor`;
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch doctor data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching doctor data:', error);
        return {}; // Return an empty array in case of error
    }
}


function dateToIsoWithoutTime(dateString) {
    let dateObject = new Date(dateString);
    let isoString = dateObject.toISOString();
    let isoDate = isoString.split('T')[0];
    return isoDate;
}

export default getMoodsForTimeFrame;
