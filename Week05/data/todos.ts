type User = {
    name: string;
    todos: string[];
}

const populateUsers: User[] = [
    {
        name: "Alice",
        todos: ["Buy groceries", "Do laundry"]
    },
    {
        name: "Bob",
        todos: ["Clean house", "Cook dinner"]
    }
];

export default populateUsers;
