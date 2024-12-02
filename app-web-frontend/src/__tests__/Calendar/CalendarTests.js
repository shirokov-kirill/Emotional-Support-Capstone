import { findStartAndEndDate, getMoods } from '../../MainComponents/Calendar/Calendar';
import { isCurrentDate } from '../../MainComponents/Calendar/Calendar days/CalendarDays';


describe('findStartAndEndDate', () => {
    test('calculates the correct start and end displayed dates for a given month', () => {
        const testDate = new Date(2023, 9, 15);
        const { startDate, endDate } = findStartAndEndDate(testDate);

        expect(new Date(startDate)).toEqual(new Date(2023, 9, 1));
        expect(new Date(endDate)).toEqual(new Date(2023, 10, 5));
    });

    test('handles months starting on different weekdays correctly', () => {
        const testDate = new Date(2024, 0, 1);
        const { startDate, endDate } = findStartAndEndDate(testDate);

        expect(new Date(startDate)).toEqual(new Date(2023, 11, 31));
        expect(new Date(endDate)).toEqual(new Date(2024, 1, 4));
    });

    test('random test - ensures start date is Sunday and end date is Saturday', () => {
        for (let i = 0; i < 10; i++) {
            const randomTestDate = new Date(
                Math.floor(Math.random() * 50) + 1970,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
            );
            const { startDate, endDate } = findStartAndEndDate(randomTestDate);
            const startDay = new Date(startDate).getDay();
            const endDay = new Date(endDate).getDay();

            expect(startDay).toBe(0);
            expect(endDay).toBe(0);
        }
    });
});


describe('isCurrentDate', () => {
    test('returns true if the date is today', () => {
        const today = new Date();
        expect(isCurrentDate(today)).toBe(true);
    });

    test('returns false if the date is tomorrow', () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(isCurrentDate(tomorrow)).toBe(false);
    });

    test('returns false for dates in different months or years', () => {
        const differentYear = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate());
        const differentMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());

        expect(isCurrentDate(differentYear)).toBe(false);
        expect(isCurrentDate(differentMonth)).toBe(false);
    });
});
