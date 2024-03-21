import getUserID from "../utils/UserID"

async function getMoodDataFromServer(userId, startDate, endDate) {
    const url = `user-mood/getByUser/${userId}/timeframe?start=${startDate}&end=${endDate}`;

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
    while (currentDate <= endDate) {
        const currentDateISO = currentDate.toISOString().split('T')[0];
        // Find mood data for the current date
        const moodInfo = moodData[currentDateISO];

        const default_color = "yellow"
        const default_emoji = "😐"
        let color = moodInfo && moodInfo.color !== null ? moodInfo.color : default_color;
        let emoji = moodInfo && moodInfo.emoji !== null ? moodInfo.emoji : default_emoji;
        moods.push({
            date: new Date(currentDate),
            color: color,
            emoji: emoji,
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return moods;
}


export default getMoodsForTimeFrame;
