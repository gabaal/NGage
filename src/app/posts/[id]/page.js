import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export default async function Post({params}) {
  
  const getPost = await sql.query(`
    SELECT 
      posts.title AS post_name,
      posts.comment AS post_comment,
      COUNT(post_likes.user_clerk_id) AS like_count,
      users.display_name AS user_display_name,
      CASE 
        WHEN DATE(posts.timestamp) = CURRENT_DATE THEN 'Today ' || TO_CHAR(posts.timestamp, 'HH24:MI')
        ELSE TO_CHAR(posts.timestamp, 'HH24:MI DD Mon YYYY')
      END AS created_at
    FROM 
        posts
    JOIN 
        users ON posts.user_clerk_id = users.clerk_id
    LEFT JOIN 
        post_likes ON posts.post_id = post_likes.post_id
    WHERE 
        posts.post_id = ${params.id}
    GROUP BY 
        posts.post_id, posts.title, posts.comment, users.display_name, posts.timestamp`)
        
  const post = getPost.rows[0];
  if (!post) {
    notFound();
  }
  
  return (
    <div className="flex justify-center min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Post</h1>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-md">
          <h2 className="text-xl font-bold mb-2">{post.post_name}</h2>
          <p className="mb-2">{post.post_comment}</p>
          <div className="mb-2">
            <p className="text-gray-600">Likes: {post.like_count}</p>
          </div>
          <div className="flex text-gray-600">
            <p className="mr-4">Created by: {post.user_display_name}</p>
            <p>{post.created_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
