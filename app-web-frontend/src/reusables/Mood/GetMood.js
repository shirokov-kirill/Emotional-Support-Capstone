function getMoodsForTimeFrame(startDate, endDate) {
    const moods = [];
  
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      moods.push({
        date: new Date(currentDate),
        color: "yellow",
        smiley: "😐",
      });
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return moods;
  }


export default getMoodsForTimeFrame;
