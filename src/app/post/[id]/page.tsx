"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import useFetch from "~/hooks/useFetch";

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = useFetch(`/posts/${id}`);
  const { data: author, isLoading: isAuthorLoading, refetch: authorRefetch } = useFetch(`/users/${post.user_id}`);
  const { data: comments, isLoading: isCommentLoading } = useFetch(`/posts/${id}/comments`);

  const { title, body } = post;

  useEffect(() => {
    if (!isPostLoading) authorRefetch();
  }, [isPostLoading]);

  return (
    <section className="container mx-auto my-8">
      {!isAuthorLoading && !isPostLoading && !isCommentLoading ? (
        <>
          {/* POST */}
          <div className="mb-4">
            <h1 className="mb-2 text-xl font-semibold">{title}</h1>
            <p className="mb-2 text-justify">{body}</p>
            <p className="text-sm">
              Posted by&nbsp;
              {author.name ? (
                <Link href={`/user/${author.id}`} className="text-blue-500 underline">
                  {author.name}
                </Link>
              ) : (
                "Unknown"
              )}
            </p>
          </div>
          {/* COMMENT SECTION */}
          {comments.length > 0 ? (
            <div className="flex flex-col gap-y-4 rounded-md bg-gray-600 px-2 py-4">
              {comments.map((comment: any) => {
                const { id, name, body } = comment;

                return (
                  <div key={id} className="flex items-center gap-2 px-2">
                    {/* PARENT TO KEEP THE WIDTH THE SAME AS THE HEIGHT */}
                    <div>
                      <div className="h-12 w-12 rounded-full bg-white" />
                    </div>
                    <div className="w-full">
                      <p className="mb-2 leading-none text-white">{name}</p>
                      <div className="w-full rounded-md bg-white p-2">
                        <p className="text-sm text-black">{body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        "Loading"
      )}
    </section>
  );
};
export default PostDetail;
