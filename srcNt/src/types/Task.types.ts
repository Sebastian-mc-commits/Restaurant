
export interface TaskType<T> {
    title: string;
    description: string;
    state: boolean;
    creationDate: string;
    id: T
}

export const Tasks: [TaskType<number>] = [{
    title: "Example of task",
    id: 1,
    description: "A good task one",
    state: false,
    creationDate: "12/15/11"
}]