import { getMoodDataFromServer, getMoodsForTimeFrame, getCriticalPatientsDataForDoctor, dateToIsoWithoutTime } from '../../reusables/Mood/GetMood';


describe('moodService functions', () => {
    const validStartDate = new Date(2023, 9, 1);
    const validEndDate = new Date(2023, 9, 31);
    const invalidAuthToken = 'invalid-token';
    
    let consoleErrorSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    describe('getMoodDataFromServer', () => {
        test('returns {} and logs an error when provided with an incorrect token', async () => {
            const result = await getMoodDataFromServer(invalidAuthToken, validStartDate, validEndDate);

            expect(result).toEqual({});
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching mood data:', expect.any(Error));
        });
    });

    describe('getMoodsForTimeFrame', () => {
        test('returns moods with dates increasing by one day, and correct start and end dates', async () => {
            const moods = await getMoodsForTimeFrame(validStartDate, validEndDate);

            expect(moods[0].date).toEqual(validStartDate);
            expect(moods[moods.length - 1].date).toEqual(new Date(validEndDate.setDate(validEndDate.getDate() - 1)));
            
            for (let i = 1; i < moods.length; i++) {
                let dateAfterPrevious = new Date(moods[i - 1].date);
                dateAfterPrevious.setDate(dateAfterPrevious.getDate() + 1);
                const currentDate = moods[i].date;
                expect(currentDate).toEqual(new Date(dateAfterPrevious));
            }
        });
    });

    describe('getCriticalPatientsDataForDoctor', () => {
        test('returns {} and logs an error when provided with an incorrect token', async () => {
            const result = await getCriticalPatientsDataForDoctor();

            expect(result).toEqual({});
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching doctor data:', expect.any(Error));
        });
    });

    describe('dateToIsoWithoutTime', () => {
        test('correctly converts date to ISO format without time (case 1)', () => {
            const inputDate = new Date(2023, 9, 1, 12);
            const result = dateToIsoWithoutTime(inputDate);

            expect(result).toBe('2023-10-01');
            expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
        });

        test('correctly converts date to ISO format without time (case 2)', () => {
            const inputDate = new Date(2024, 0, 15, 12);
            const result = dateToIsoWithoutTime(inputDate);

            expect(result).toBe('2024-01-15');
        });
    });
});