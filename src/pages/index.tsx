import { GetServerSideProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-6 items-center">
      <Image
        src={session?.user?.image as string}
        width={100}
        height={100}
        alt="user-image"
        className="rounded-full"
      />
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = () => {
//   return Promise.resolve({
//     redirect: {
//       destination: "/login",
//       permanent: false,
//     },
//     props: null,
//   });
// };
