import ContractsCustomer from "./contracts-from-user";

export interface Contracts {
    contratos: ContractsCustomer[]
}

export interface CustomerFrequency {
    date: string,
    classroomStartTime: string,
    classroomType: string,
    isPresent: boolean
}