import { getUserID } from "../utils/UserID"

async function getMoodDataFromServer(userId, startDate, endDate) {
    let formatStartDate = dateToIsoWithoutTime(startDate)
    let formatEndDate = dateToIsoWithoutTime(endDate)
    const url = `http://localhost:8080/user-mood/getByUser/${userId}/timeframe?start=${formatStartDate}&end=${formatEndDate}`;
    try {
        const response = await fetch(url);
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
    const userId = getUserID()
    const moodData = await getMoodDataFromServer(userId, startDate, endDate);
    const moods = [];

    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
        const currentDateISO = dateToIsoWithoutTime(currentDate)
        // Find mood data for the current date
        const moodInfo = moodData[currentDateISO];

        const default_color = "grey"
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

async function getPatientsDataForDoctor(doctorId) {
    const url = `http://localhost:8080/user-mood/getCriticalUsersMoodByDoctor/${doctorId}`;
    try {
        const response = await fetch(url);
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
