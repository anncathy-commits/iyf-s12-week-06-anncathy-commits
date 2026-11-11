Day 1
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function run() {
    console.log("Starting...");

    await delay(2000);

    console.log("This prints after 2 seconds");
}

run();
Day 2

function taskOne() {
    return new Promise((resolve) => {
        const time = Math.random() * 3000;

        setTimeout(() => {
            console.log("Task One completed");
            resolve();
        }, time);
    });
}

function taskTwo() {
    return new Promise((resolve) => {
        const time = Math.random() * 3000;

        setTimeout(() => {
            console.log("Task Two completed");
            resolve();
        }, time);
    });
}

function taskThree() {
    return new Promise((resolve) => {
        const time = Math.random() * 3000;

        setTimeout(() => {
            console.log("Task Three completed");
            resolve();
        }, time);
    });
}

console.time("Total execution time");

taskOne()
    .then(() => taskTwo())
    .then(() => taskThree())
    .then(() => {
        console.log("All tasks completed!");
        console.timeEnd("Total execution time");
    });
Day 3

async function fetchUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (response.status === 404) {
            return {
                id: 0,
                name: "Guest User",
                email: "guest@example.com"
            };
        }

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const user = await response.json();

        return user;

    } catch (error) {
        console.log("Error:", error.message);
        throw error;
    }
}

async function run() {
    const user = await fetchUser(1);
    console.log(user);
}

run();
Day 4

function getUser(callback) {
    setTimeout(() => {
        callback({ name: "Anne", age: 25 });
    }, 1000);
}

getUser((user) => {
    console.log(user);
});


function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Anne", age: 25 });
        }, 1000);
    });
}

async function displayUser() {
    const user = await getUser();

    console.log(user);
}

displayUser();
Day 5

async function fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}

async function run() {

    const urls = [
        "https://jsonplaceholder.typicode.com/users",
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments"
    ];

    const promises = urls.map((url) => fetchData(url));

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {

        if (result.status === "fulfilled") {
            console.log(`Request ${index + 1} successful:`);
            console.log(result.value);

        } else {
            console.log(`Request ${index + 1} failed:`);
            console.log(result.reason);
        }

    });
}

run();
