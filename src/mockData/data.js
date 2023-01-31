import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";

const dates = [];
for (let i = 1; i <= 7; i++) {
    dates.push(moment().day(i));
}

export const dataWorkout = [
    {
        id: uuidv4(),
        date: dates[0].format('ddd'),
        day: dates[0].format('DD'),
        fullDate: dates[0].format('DD/MM/YYYY'),
        workouts: [],
    },
    {
        id: uuidv4(),
        date: dates[1].format('ddd'),
        day: dates[1].format('DD'),
        fullDate: dates[1].format('DD/MM/YYYY'),
        workouts: [
            {
                id: uuidv4(),
                name: 'Chest Day - with Arm exercises',
                exercises: [
                    {
                        id: 'ex_01',
                        name: 'Bench Press Medium Grip',
                        set: '3x',
                        infomation: '50 lb x 5, 60 lb x 5, 70 lb x 5',
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        date: dates[2].format('ddd'),
        day: dates[2].format('DD'),
        fullDate: dates[2].format('DD/MM/YYYY'),
        workouts: [
            {
                id: uuidv4(),
                name: 'Leg Day',
                exercises: [
                    {
                        id: uuidv4(),
                        name: 'Exercise C',
                        set: '1x',
                        infomation: '30 lb x 6',
                    },
                    {
                        id: uuidv4(),
                        name: 'Exercise D',
                        set: '1x',
                        infomation: '40 lb x 5',
                    },
                    {
                        id: uuidv4(),
                        name: 'Exercise E',
                        set: '1x',
                        infomation: '50 lb x 5',
                    },
                ]
            },
            {
                id: uuidv4(),
                name: 'Arm day',
                exercises: [
                    {
                        id: uuidv4(),
                        name: 'Exercise F',
                        set: '1x',
                        infomation: '60 lb x 6',
                    },
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        date: dates[3].format('ddd'),
        day: dates[3].format('DD'),
        fullDate: dates[3].format('DD/MM/YYYY'),
        workouts: []
    },
    {
        id: uuidv4(),
        date: dates[4].format('ddd'),
        day: dates[4].format('DD'),
        fullDate: dates[4].format('DD/MM/YYYY'),
        workouts: []
    },
    {
        id: uuidv4(),
        date: dates[5].format('ddd'),
        day: dates[5].format('DD'),
        fullDate: dates[5].format('DD/MM/YYYY'),
        workouts: []
    },
    {
        id: uuidv4(),
        date: dates[6].format('ddd'),
        day: dates[6].format('DD'),
        fullDate: dates[6].format('DD/MM/YYYY'),
        workouts: []
    },
];
