import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default async function Home() {
  revalidatePath("/")
  
  const posts = await sql`
    SELECT
      posts.post_id,
      posts.title AS post_title,
      posts.comment AS post_comment,
      CASE 
          WHEN DATE(posts.timestamp) = CURRENT_DATE THEN 'Today ' || TO_CHAR(posts.timestamp, 'HH24:MI')
          ELSE TO_CHAR(posts.timestamp, 'HH24:MI DD Mon YYYY')
      END AS post_date,
      COUNT(post_likes.user_clerk_id) AS like_count,
      users.display_name AS user_display_name
    FROM 
      posts
    JOIN 
      users ON posts.user_clerk_id = users.clerk_id
    LEFT JOIN 
      post_likes ON posts.post_id = post_likes.post_id
    GROUP BY 
      posts.post_id, posts.title, posts.comment, posts.timestamp, users.display_name
    ORDER BY 
      posts.timestamp DESC
    LIMIT 4`;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 bg-white shadow-md py-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to NGage Social, the Platform for Sharing Posts.</h1>
        <h1 className="text-3xl font-bold mb-4 text-center">Latest Posts</h1>
      </div>
      <div className="container mx-auto flex-grow">
        <div className="flex justify-center">
          <div className="grid gap-4">
            {posts.rows.map((post) => (
              <div key={post.post_id} className="bg-white shadow-md rounded-lg p-4 mb-4 overflow-hidden max-w-lg">
                <h2 className="text-xl font-bold mb-2">{post.post_title}</h2>
                <p className="mb-2">{post.post_comment}</p>
                <div className="flex items-center mb-2">
                  <p className="text-gray-600 flex-1">Likes: {post.like_count}</p>
                  <p className="text-gray-600 flex-1 text-center"> {post.post_date}</p>
                  <p className="text-gray-600 flex-1 text-right">By: {post.user_display_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
