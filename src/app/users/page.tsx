"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Loader, Pagination } from "~/components";
import useFetch from "~/hooks/useFetch";

const Users = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);
  const { data: users, isLoading } = useFetch(`/users?page=1&per_page=100`);
  const searchRef = useRef<HTMLInputElement>(null!);

  const lastIndex = usersPerPage * currentPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = searchResults?.slice(firstIndex, lastIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(searchResults?.length / usersPerPage); i++) {
    pages.push(i);
  }

  const handleFilterUsers = () => {
    const regex = new RegExp(searchRef.current.value, "i");

    if (!isLoading) {
      const filtered = users.filter((user: User) => regex.test(user.name) || regex.test(user.email));
      setSearchResults(filtered);
    }
  };

  useEffect(() => {
    if (!isLoading) setSearchResults(users);
  }, [isLoading]);

  return (
    <section className="container mx-auto my-8">
      <div className="mb-8 flex items-center gap-2">
        <input
          type="text"
          placeholder="Input a name or email"
          ref={searchRef}
          className="rounded-md border border-black px-2 py-1 outline-none"
        />
        <button
          className="cursor-pointer rounded-md bg-slate-600 px-3 py-1 font-medium text-white transition-all hover:brightness-50"
          onClick={handleFilterUsers}
        >
          Search
        </button>
      </div>
      {!isLoading ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {currentUsers.length > 0 &&
              currentUsers.map((user: any) => {
                const { id, name, email, gender, status } = user;

                return (
                  <Link key={id} href={`/user/${id}`} className="shadow-md">
                    <h2 className="rounded-t-lg border-b bg-slate-600 p-4 text-lg font-bold text-white">ID: {id}</h2>
                    <div className="p-4">
                      <p className="break-all">Name: {name}</p>
                      <p className="break-all">Email: {email}</p>
                      <p className="break-all">Gender: {gender}</p>
                      <p className="break-all">Status: {status}</p>
                    </div>
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
};
export default Users;
