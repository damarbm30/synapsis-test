"use client";

import Link from "next/link";
import { useState } from "react";

import { Loader, Pagination } from "~/components";
import useFetch from "~/hooks/useFetch";

export default function Home() {
  // CURRENT PAGE INDICATOR
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const { data: posts, isLoading } = useFetch(`/posts?page=1&per_page=100`);

  const lastIndex = postsPerPage * currentPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = posts?.slice(firstIndex, lastIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(posts?.length / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <section className="container mx-auto my-8">
      {!isLoading ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {currentPosts?.length > 0 &&
              currentPosts?.map((post: any) => {
                const { id, title, body } = post;

                return (
                  <Link key={id} href={`/post/${id}`} className="shadow-md">
                    <h2 className="rounded-t-lg border-b bg-slate-600 p-4 text-lg font-bold text-white">{title}</h2>
                    <p className="p-4">{body}</p>
                  </Link>
                );
              })}
          </div>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}
