/**
 * Import required reusable components for creating the quizbank UI
 */
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../../components/studentNavbar";
import Footer from "../../../components/Footer";
import Card from "../../../components/QuizBankTitle";

import QuizTable from "../../../components/QuizBankTable";
import { Box } from "@chakra-ui/react";
import clientPromise from "../../../src/lib/mongodb";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps() {
  try {

    const client = await clientPromise;
    const db = client.db("test");
    const quiz = await db.collection("quizes").find({}).toArray();

    return {
      props: {
        quiz: JSON.parse(JSON.stringify(quiz))
      },
    };
  } catch (e) {
    console.log("IN ERROR")
    console.error(e);
  }
}


/**
 * Creating the QuizBank UI using reusable components
 * @returns 
 */

export default function QuizBank({ quiz }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const userRole = (session: any) => {
    let role = session?.user?.role;
    if (role) return role;
    return null;
  };

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status]);

  if (status === "authenticated") {
    var role: any = userRole(session);

    if (role == "admin") {
      router.replace("/admin");
    } else if (role == "student") {

      return (
        <>
          <Head>
            <title>Quiz Bank</title>
            <meta name="description" content="Quiz App Home for students" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="../../../components/styles.css" />
          </Head>
          <ChakraProvider>
            <Box minHeight="100vh" display="flex" flexDirection="column">
              <NavBar />
              <Box justifyContent="center">
                <Card />
              </Box>
              <Box flex="1" width="80%" mx="auto" justifyContent="center" display={"inline-block"} marginTop={"10"}>
                <QuizTable data={quiz} />
              </Box>
              <Footer />
            </Box>
          </ChakraProvider>
        </>
      );
    }
  }
}
