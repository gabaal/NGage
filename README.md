I've really struggled this week as i have a lot going on and my meds have been changed knocking me for six! I am not sleeping very well and i cant clear my head thus trying to code is tricky. 

## Todo

 - allow logged in user to click on another users profile to see thier profile details and posts

# Build a social network

## User Stories
- [x] As a user, I am able to sign up for an account and create a user profile
- [x] As a user, I am able to log in and out of my account
- [x] As a user, I am able to create posts on my profile timeline
- [x] As a user, I am able to see all posts by all users on a global timeline

## Stretch Stories
- [x] As a user, I am able to see a list of other user's posts and/or profiles on the site
- [ ] As a user, I am able able to visit other user profiles
- [ ] As a user, I am able to follow other users
- [ ] As a user, I am able to like posts I think are good, and see how many likes a post has

## Requirements
- [x] Use Clerk.com to set up user signup and login.
- [x] Use the Clerk userId to associate posts with a user.
- [x] Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to /user/[userId].
- [x] Enable users to create posts associated with the userId, and display those posts on the user's profile page
- [x] Show a 404 error if a user profile doesn't exist
- [ ] Use at least 1 Radix UI Primitive or similar

## Stretch Goals
- [ ] Enable users to visit other user profiles after seeing their posts on a global timeline
- [ ] Enable users to follow other users by creating a follower and follwee relationship between two user profiles
- [ ] Enable users to like other users' posts by creating a user_id and liked_post relationship in a junction table
- [ ] A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in

## Ideas

## Create Database Tables

### Create the users table
CREATE TABLE users (
    clerk_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100),
    display_name VARCHAR(100),
    email VARCHAR(100),
    bio TEXT,
    date_of_birth DATE,
    location VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### Create the posts table
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    comment TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_clerk_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE
);

### Create the follows table to store user follow relationships
CREATE TABLE follows (
    follower_clerk_id VARCHAR(255) NOT NULL,
    followed_clerk_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (follower_clerk_id, followed_clerk_id),
    FOREIGN KEY (follower_clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE
);

### Create the likes table to store post likes
CREATE TABLE post_likes (
    user_clerk_id VARCHAR(255) NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (user_clerk_id, post_id),
    FOREIGN KEY (user_clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);


## Seed database with dummy data

### Insert sample data into Users table
INSERT INTO users (clerk_id, name, display_name, email, bio, date_of_birth, location)
VALUES 
    ('user1', 'John Doe', 'JohnD', 'john.doe@example.com', 'I love exploring new places and trying out different cuisines. Coffee enthusiast.', '1988-05-15', 'New York'),
    ('user2', 'Jane Smith', 'JaneS', 'jane.smith@example.com', 'Bookworm. Passionate about art and photography. Foodie at heart.', '1992-10-20', 'Los Angeles'),
    ('user3', 'Alice Johnson', 'AliceJ', 'alice.johnson@example.com', 'Tech geek. Music lover. Amateur baker. Travel addict.', '1985-03-02', 'Chicago'),
    ('user4', 'Bob Brown', 'BobB', 'bob.brown@example.com', 'Fitness freak. Dog lover. Nature enthusiast. Adventure seeker.', '1990-12-12', 'Houston'),
    ('user5', 'Emily Wilson', 'EmilyW', 'emily.wilson@example.com', 'Fashion enthusiast. Coffee addict. Yoga practitioner. Aspiring traveler.', '1995-08-25', 'San Francisco');

### Insert sample data into Posts table
INSERT INTO posts (title, comment, user_clerk_id)
VALUES 
    ('Exploring the streets of NYC', 'Just stumbled upon this quaint little cafe in the heart of NYC. Loving the vibe here! #citylife #coffeeholic', 'user1'),
    ('Sunset vibes in Venice Beach', 'Captured this breathtaking sunset while strolling along Venice Beach. Nature truly is the best artist! #sunset #naturephotography', 'user2'),
    ('Coding marathon this weekend!', 'Spent the entire weekend coding and building new projects. Can''t wait to share them with everyone! #codinglife #webdev', 'user3'),
    ('Morning hike with my furry friend', 'Started my day with a refreshing hike in the woods with my adorable pup. Nothing beats the feeling of being in nature! #hikingadventures #doglovers', 'user4'),
    ('New fashion trends for fall', 'Exploring the latest fashion trends for fall. Can''t wait to revamp my wardrobe with cozy sweaters and stylish boots! #fashionista #fallfashion', 'user5'),
    ('Hidden gems of NYC', 'Visited this hidden gem of a bookstore in NYC. Found some amazing reads to add to my collection! #bookworm #nyc', 'user1'),
    ('Art therapy session', 'Spent the afternoon indulging in some art therapy. There''s something so calming about putting brush to canvas! #arttherapy #creativity', 'user2'),
    ('Road trip to the countryside', 'Embarked on a spontaneous road trip to the countryside. Loving the scenic views and fresh air! #roadtrip #naturelover', 'user3'),
    ('Healthy recipe experimentation', 'Experimenting with new healthy recipes in the kitchen today. Who says eating clean has to be boring? #healthyfood #cooking', 'user4'),
    ('Weekend yoga retreat', 'Attended a weekend yoga retreat to unwind and rejuvenate. Feeling refreshed and ready to take on the week ahead! #yogalife #selfcare', 'user5'),
    ('Coffee shop adventures', 'Visited a cozy coffee shop and tried their new seasonal brew. Perfect way to kickstart the day! #coffeetime #caffeinefix', 'user1'),
    ('Art exhibition at the museum', 'Spent the afternoon exploring an art exhibition at the museum. So much creativity and inspiration in one place! #artlover #museum', 'user2'),
    ('Tech gadgets wishlist', 'Putting together my wishlist of the latest tech gadgets. Can''t wait to get my hands on the newest releases! #gadgets #techgeek', 'user3'),
    ('Outdoor workout session', 'Took my workout outdoors today and enjoyed some fresh air while breaking a sweat. Feeling energized and invigorated! #outdoorfitness #workout', 'user4'),
    ('Weekend getaway planning', 'Planning a weekend getaway to escape the hustle and bustle of the city. Can''t wait for some relaxation and adventure! #travelplans #weekendgetaway', 'user5'),
    ('Delicious homemade brunch', 'Whipped up a delicious homemade brunch spread with pancakes, eggs, and fresh fruit. Brunch is always a good idea! #brunchtime #homemade', 'user1'),
    ('Exploring street art', 'Took a leisurely stroll through the city streets and discovered some amazing street art. Every corner is a canvas! #streetart #urbanexploration', 'user2'),
    ('Music playlist for the soul', 'Curated a new music playlist for those cozy evenings at home. Music has a way of soothing the soul! #musiclover #playlist', 'user3'),
    ('Beach day with friends', 'Spent the day soaking up the sun at the beach with friends. Nothing beats good company and ocean waves! #beachday #friends', 'user4'),
    ('New beginnings', 'Embracing new beginnings and looking forward to what the future holds. Here''s to new adventures! #newbeginnings #positivity', 'user5');


### Insert sample data into Follows table
INSERT INTO follows (follower_clerk_id, followed_clerk_id)
VALUES 
    ('user1', 'user2'),
    ('user1', 'user3'),
    ('user1', 'user4'),
    ('user2', 'user1'),
    ('user2', 'user3'),
    ('user2', 'user5'),
    ('user3', 'user1'),
    ('user3', 'user4'),
    ('user3', 'user5'),
    ('user4', 'user2'),
    ('user4', 'user3'),
    ('user4', 'user5'),
    ('user5', 'user1'),
    ('user5', 'user2'),
    ('user5', 'user3'),
    ('user5', 'user4');

### Insert sample data into post_likes table
INSERT INTO post_likes (user_clerk_id, post_id)
VALUES 
    ('user1', 1), ('user2', 1), ('user3', 1),
    ('user2', 2), ('user3', 2), ('user4', 2),
    ('user1', 3), ('user2', 3), ('user5', 3),
    ('user1', 4), ('user3', 4), ('user4', 4),
    ('user1', 5), ('user2', 5), ('user5', 5);