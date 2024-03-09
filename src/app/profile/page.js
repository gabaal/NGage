import { sql } from "@vercel/postgres";

export default async function AllUsers() {
  // Fetch all users data along with the count of their posts, followers, and followees
  const usersData = await sql`
    SELECT 
      users.clerk_id,
      users.display_name,
      users.bio,
      TO_CHAR(users.date_of_birth, 'DD Mon') AS birthdate,
      (
        SELECT COUNT(*)
        FROM posts
        WHERE posts.user_clerk_id = users.clerk_id
      ) AS post_count,
      (
        SELECT COUNT(*)
        FROM follows
        WHERE follows.followed_clerk_id = users.clerk_id
      ) AS follower_count,
      (
        SELECT COUNT(*)
        FROM follows
        WHERE follows.follower_clerk_id = users.clerk_id
      ) AS followee_count
    FROM 
      users
    ORDER BY 
      users.display_name;
  `;

  // Render user data
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">All Users</h1>
      <div className="max-w-lg mx-auto">
        {usersData.rows.map((user) => (
          <div key={user.clerk_id} className="bg-white shadow-md rounded-lg p-4 mb-4 overflow-hidden">
            <div className="flex items-center mb-2">
              <label className="block font-semibold mr-2">Display Name:</label>
              <span>{user.display_name}</span>
              <label className="block font-semibold ml-auto mr-2">Birthday:</label>
              <span>{user.birthdate}</span>
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Bio:</label>
              <span>{user.bio}</span>
            </div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold mr-2">Posts Made:</label>
              <span>{user.post_count}</span>
              <label className="block font-semibold ml-auto mr-2">Followers:</label>
              <span>{user.follower_count}</span>
              <label className="block font-semibold ml-4 mr-2">Followees:</label>
              <span>{user.followee_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
