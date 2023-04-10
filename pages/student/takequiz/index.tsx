import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../../components/studentNavbar";
import Footer from "../../../components/Footer";
import Card from "../../../components/ExamTitleCard";
import ShortAnswerQuestionList from "../../../components/shortAnswerQuestions";
import { Box } from "@chakra-ui/react";
import MongoQuizData from "../../../src/data/dbconnection";
import Question from "../../../src/business/models/question";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface TakeAQuizProps {
  questions: Array<Question>;
}

export async function getServerSideProps() {
  try {

    var qd = new MongoQuizData();
    let questions = await qd.findQuestionListOfAQuiz("Math");
    console.log("the rerurned array of questions: ",questions);
    return {
      props: {
        questions: JSON.parse(JSON.stringify(questions))
      },
    };
  } 
  catch (e) {
    console.error(e);
    console.log("Error Occurred");
    return {
      props: {},
    };
  }
}
/**
 * Function to return Take a Quiz UI for students
 * @returns Attempt a Quiz UI for students
 */
export default function takeAQuiz({ questions }: TakeAQuizProps) {
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
          </Head>
          <ChakraProvider>
            <Box minHeight="100vh" display="flex" flexDirection="column">
              <NavBar />
              <Box justifyContent="center">
                <Card />
              </Box>
              <Box flex="1" mx="auto" justifyContent="center" alignContent={"center"}>
                <ShortAnswerQuestionList questions={questions} />
              </Box>
              <Footer />
            </Box>
          </ChakraProvider>
        </>
      );
    }
  }
}
