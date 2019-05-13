export interface IEmployee {
    _id: string,
    userName: string,
    password: string,
    roles: string[],
    position: string,
    fullName: string,
    birthday: Date,
    idNumber: string,
    phoneNumber: string,
    address: string,
    salary: number,
    startDate: Date,
    endDate: Date,
    workShifts: {
        monday: {
            start: string,
            end: string,
        },
        tuesday: {
            start: string,
            end: string
        },
        wednesday: {
            start: string,
            end: string
        },
        thursday: {
            start: string,
            end: string
        },
        friday: {
            start: string,
            end: string
        },
        saturday: {
            start: string,
            end: string
        },
        sunday: {
            start: string,
            end: string
        }
    }
    isWorking: boolean,
}
