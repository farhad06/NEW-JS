//basic promises

const myPromises = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve('Data Fetchd!');
    } else {
        reject('Data fetched Failed');
    }
})


myPromises.then(result => {
    console.log('Success', result);

}).catch(error => {
    console.log('Error', error);

}).finally(() => {
    console.log('This Block Always run');

})

console.log("------ Another Example -------------");

function getUserById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const users = [
                { id: 1, name: 'Rohit' },
                { id: 2, name: 'Virat' },
                { id: 3, name: 'Farhad' },
            ];

            const user = users.find(u => u.id === id);

            if (user) {
                resolve(user);
            } else {
                reject('User Not Found');
            }
        }, 1000);
    })
}


getUserById(1).then(user => {
    console.log("User Details ", user);

}).catch(err => {
    console.log('Error is: ', err);

})


//USING ASYNG-AWAIT

async function getUserWithPosts(userId) {
    try {
        const user = await getUserById(userId);
        console.log('Got user:', user.name);

        const posts = await getPostsByUser(user.id);
        console.log('Got posts:', posts);

        const comments = await getCommentsByPost(posts[0].id);
        console.log('Got comments:', comments);

        return { user, posts, comments };

    } catch (error) {
        console.log('Error:', error);
    }
}

getUserWithPosts(1);


//Promise.all()
// like running multiple DB queries at the same time
// much faster than running one by one

async function getDashboardData(userId) {
    try {
        // all 3 run AT THE SAME TIME — not one by one
        const [user, posts, notifications] = await Promise.all([
            getUserById(userId),
            getPostsByUser(userId),
            getNotifications(userId),
        ]);

        // waits until ALL are done
        console.log(user, posts, notifications);

    } catch (error) {
        // if ANY one fails — goes to catch
        console.log('One of them failed:', error);
    }
}

// Sequential (slow) — one after another
const user = await getUserById(1);     // wait 1s
const posts = await getPostsByUser(1);  // wait 1s
// total: 2 seconds

// Parallel (fast) — all at once
const [user, posts] = await Promise.all([
    getUserById(1),                     // run together
    getPostsByUser(1),                  //
]);
// total: 1 second


//Promise.allSettled() — run all, don't stop on failure:
// unlike Promise.all() — this doesn't stop if one fails
// gets result of ALL promises whether success or failure

const results = await Promise.allSettled([
    getUserById(1),        // success
    getUserById(999),      // fails — user not found
    getPostsByUser(1),     // success
]);

results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
    } else {
        console.log('Failed:', result.reason);
    }
});

// output:
// Success: { id: 1, name: 'Rohit' }
// Failed: 'User not found'
// Success: [{ id: 1, title: 'Post 1' }]


// Promise.race() — whichever resolves first wins:
// useful for timeouts — if API takes too long, use fallback

function timeout(ms) {
    return new Promise((_, reject) =>
        setTimeout(() => reject('Request timed out'), ms)
    );
}

try {
    const result = await Promise.race([
        getUserById(1),         // actual call
        timeout(3000),          // 3 second timeout
    ]);
    console.log('Result:', result);

} catch (error) {
    console.log('Error:', error);   // 'Request timed out'
}



//Promise.any() — first success wins:

// like race() but ignores failures — returns first SUCCESS

const result = await Promise.any([
    fetchFromServer1(),    // might fail
    fetchFromServer2(),    // might fail
    fetchFromServer3(),    // returns first successful one
]);

console.log('Got data from:', result);


console.log('REAL WORLD EXAMPLE IN EXPRESS CONTROLLER');
// controllers/UserController.js

const UserController = {

    // Single promise with async/await
    show: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: 'Not found' });
            res.json({ success: true, data: user });

        } catch (err) {
            next(err);   // pass to error middleware
        }
    },

    // Promise.all — fetch multiple things at once
    dashboard: async (req, res, next) => {
        try {
            const userId = req.params.id;

            const [user, posts, comments] = await Promise.all([
                User.findByPk(userId),
                Post.findAll({ where: { user_id: userId } }),
                Comment.findAll({ where: { user_id: userId } }),
            ]);

            res.json({ success: true, data: { user, posts, comments } });

        } catch (err) {
            next(err);
        }
    },

    // Promise chaining with .then() style
    store: (req, res, next) => {
        User.create(req.body)
            .then(user => {
                return Profile.create({ user_id: user.id });
            })
            .then(profile => {
                res.status(201).json({ success: true, data: profile });
            })
            .catch(err => next(err));
    },
};

module.exports = UserController;

// REAL PROJECT USES 
/*
1st  →  async / await          ← used everywhere(controllers, services, middleware)
2nd  →  Promise.all()        ← used often(dashboard, parallel queries)
3rd  →  .then() /.catch()     ← rare(legacy code, quick scripts)
4th  →  Promise.allSettled() ← occasionally(bulk operations)
5th  →  Promise.race()       ← rarely(timeout handling)
6th  →  new Promise()        ← rarely(wrapping old callback libraries)
*/