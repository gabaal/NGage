import { sql } from "@vercel/postgres";
import ClerkCurrentUser from "@/components/ClerkCurrentUser";

export default async function Profile() {
  const currentUser = await ClerkCurrentUser();

  const getProfile = await sql.query(`
    SELECT 
      users.name, 
      users.display_name, 
      users.email, 
      users.bio, 
      users.location,   
      TO_CHAR(users.date_of_birth, 'DD Mon YYYY') AS date_of_birth
    FROM 
      users
    WHERE 
      users.clerk_id = '${currentUser}';
  `);

  const profileData = getProfile.rows[0];

  const followersResult = await sql.query(`
    SELECT 
      users.display_name
    FROM 
      users
    INNER JOIN 
      follows ON users.clerk_id = follows.follower_clerk_id
    WHERE 
      follows.followed_clerk_id = '${currentUser}';
  `);

  const followersData = followersResult.rows.map(row => row.display_name);

  const followeesResult = await sql.query(`
    SELECT 
      users.display_name
    FROM 
      users
    INNER JOIN 
      follows ON users.clerk_id = follows.followed_clerk_id
    WHERE 
      follows.follower_clerk_id = '${currentUser}';
  `);

  const followeesData = followeesResult.rows.map(row => row.display_name);

  const userPostsResult = await sql.query(`
    SELECT 
      title,
      comment
    FROM 
      posts
    WHERE 
      user_clerk_id = '${currentUser}';
  `);

  const userPosts = userPostsResult.rows;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
      <div className="max-w-xl mx-auto">
        {profileData && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="mb-6 flex">
              <div className="w-1/2 pr-6">
                <label className="block font-semibold">Name:</label>
                <p className="text-gray-800">{profileData.name}</p>
              </div>
              <div className="w-1/2">
                <label className="block font-semibold text-right">Display Name:</label>
                <p className="text-gray-800">{profileData.display_name}</p>
              </div>
            </div>
            <div className="mb-6 flex">
              <div className="w-1/2 pr-6">
                <label className="block font-semibold">Location:</label>
                <p className="text-gray-800">{profileData.location}</p>
              </div>
              <div className="w-1/2">
                <label className="block font-semibold text-right">Date of Birth:</label>
                <p className="text-gray-800">{profileData.date_of_birth}</p>
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-semibold">Email:</label>
              <p className="text-gray-800">{profileData.email}</p>
            </div>
            <div className="mb-6">
              <label className="block font-semibold">Bio:</label>
              <p className="text-gray-800">{profileData.bio}</p>
            </div>
            <div className="mb-6 flex">
              <div className="w-1/2 pr-6">
                <label className="block font-semibold">Followers:</label>
                <ul>
                  {followersData.map((follower, index) => (
                    <li key={index}>{follower}</li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2 pl-6">
                <label className="block font-semibold">Followees:</label>
                <ul>
                  {followeesData.map((followee, index) => (
                    <li key={index}>{followee}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {userPosts.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">User Posts</h2>
            {userPosts.map((post, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-800">{post.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

