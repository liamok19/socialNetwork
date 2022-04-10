const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { post } = require('../models/Reaction');
const { getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

     // Drop existing Users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Create empty array to hold the users
    const users = [];

        // Loop 20 times -- add students to the students array
        for (let i = 0; i < 20; i++) {
            // Get some random reaction objects using a helper function that we imported from ./data
            const reactions = getRandomReactions(4);
        
            const fullName = getRandomName();
            const first = fullName.split(' ')[0];
            // const last = fullName.split(' ')[1];
                
            users.push({
            userName,
            email,
            // posts:post,
            friends:[friend],
            // last,
            });
        }
        
        // Add users to the collection and await the results
        await User.collection.insertMany(users);
        
        // Add thoughts to the collection and await the results
        await Thought.collection.insertOne({
            thoughtName: 'so happy',
            inPerson: false,
            users: [...users],
        });
        
        // Log out the seed data to indicate what should appear in the database
        console.table(users);
        console.info('Seeding complete! 🌱');
        process.exit(0);
        });
    
