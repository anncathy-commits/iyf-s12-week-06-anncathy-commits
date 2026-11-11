// ============================================
// LESSON 11 — CLASSWORK EXERCISE
// Callbacks  ->  Promises + chaining  ->  Async/await
// Week 6 · Run with:  node lesson-11-exercise.js
//
// ONE scenario, THREE styles. You are GIVEN working callback code (Part A).
// Your job: rewrite the SAME flow with Promises (Part B), then async/await (Part C).
// Answer key: lesson-11-solution.js  (try first, peek last).
// ============================================


// ============================================
// PART A — GIVEN (runs as-is). Read it, run it, notice the nesting = "callback hell".
// Three async steps: get a user, then their orders, then the total spend.
// ============================================
const nameFor = (id) => ({ 1: "Amina", 2: "Brian" }[id] || "Unknown");

function getUserCb(userId, cb) {
  setTimeout(() => {
    if (!userId) return cb(new Error("Missing userId"));
    cb(null, { id: userId, name: nameFor(userId) });
  }, 400);
}

function getOrdersCb(user, cb) {
  setTimeout(() => {
    cb(null, [
      { id: 101, amount: 20 },
      { id: 102, amount: 35 },
    ]);
  }, 400);
}

function getOrderTotalCb(orders, cb) {
  setTimeout(() => {
    const total = orders.reduce((sum, o) => sum + o.amount, 0);
    cb(null, total);
  }, 400);
}

// Caller — callback version (this nesting is what we're about to fix)
getUserCb(1, (err, user) => {
  if (err) return console.error("A error:", err.message);
  getOrdersCb(user, (err, orders) => {
    if (err) return console.error("A error:", err.message);
    getOrderTotalCb(orders, (err, total) => {
      if (err) return console.error("A error:", err.message);
      console.log(`A: ${user.name} spent ${total}`);
    });
  });
});


// ============================================
// PART B — TODO: convert each step to a Promise, then CHAIN them.
// ============================================

// TODO B1: rewrite each function to RETURN a Promise
//          (resolve on success; reject with an Error on failure).
function getUser(Amina) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Amina) return reject(new Error("Missing userId"));
      resolve({ id: Amina, name: nameFor(Amina) });
    }, 400);
  });
}
function getOrders(Amina) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 101, amount: 20 },
        { id: 102, amount: 35 },
        ]);
      }, 400);
    });
  }
  function getOrderTotal(orders) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const total = orders.reduce((sum, o) => sum + o.amount, 0);
        resolve(total);
      }, 400);
    });
  }

// TODO B2: chain the three with .then()
//   - RETURN the next promise inside each .then (or the chain breaks)
// Promise chain
function getUser(Amina) {
  .then((Amina) => {
  console.log("User loaded:", Amina);
  return getOrders(Amina).then((orders) => ({user, orders}));
})
 .then(({ user, orders }) => {
    const total = orders.reduce((sum, order) => sum + order.amount, 0);
      console.log(`B: ${user.name} spent ${total}`);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  })};

//   - use a SINGLE .catch at the end
//   - final log:  `B: ${user.name} spent ${total}`
//   - (hint: chaining loses earlier values — how will you still have `user` at the end?)
//
// getUser(1)
//   .then((user) => /* ... */)
//   .then((orders) => /* ... */)
//   .then((total) => console.log(`B: ...`))
//   .catch((err) => console.error("B error:", err.message));
getUser(1)

    .then((user) => {
        return getOrders(user).then((orders) => {
            return { user, orders };
        });
    })

    .then(({ user, orders }) => {
        return getOrderTotal(orders).then((total) => {
            return { user, total };
        });
    })

    .then(({ user, total }) => {
        console.log(`B: ${user.name} spent ${total}`);
    })

    .catch((err) => {
        console.error("B error:", err.message);
    });




// ============================================
// PART C — TODO: refactor the SAME flow to async/await.
// ============================================

// TODO C1: write  async function checkout(userId)  that:
//   - awaits getUser -> getOrders -> getOrderTotal
//   - wraps the flow in try/catch (log "C error: ...")
//   - logs  `C: ${user.name} spent ${total}`
//   - notice: user, orders AND total are all in scope here — no juggling.
async function checkout(userId) {
    try {
        const user = await getUser(userId);

        const orders = await getOrders(user);

        const total = await getOrderTotal(orders);

        console.log(`C: ${user.name} spent ${total}`);

    } catch (err) {
        console.error("C error:", err.message);
    }
}
// TODO C2: call  checkout(1)
checkout(1);

// ============================================
// BONUS — TODO: run two INDEPENDENT lookups in parallel with Promise.all
//   - fetch users 1 and 2 at the same time, then log both names.
Promise.all([
    getUser(Amina),
    getUser(Brian)
])

.then((users) => {
    console.log("Bonus: Users loaded");

    users.forEach((user) => {
        console.log(user.name);
    });
})

.catch((err) => {
    console.error("Bonus error:", err.message);
});
// ============================================


// ============================================
// SAVE + COMMIT
//   Save this file as async-practice.js in iyf-s12-week-06-{username}
//   (create the repo today with a .gitignore that already lists config.js —
//    Lesson 12's API key will live in config.js and must never be committed)
//   node async-practice.js
//   git add async-practice.js
//   git commit -m "Add: callbacks, promises and async/await practice"
//   git push
// ============================================
