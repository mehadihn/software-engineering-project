import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../../components/studentNavbar";
import Footer from "../../../components/Footer";
import ShortAnswerQuestionList from "../../../components/shortAnswerQuestions";
import { Box, Heading, chakra } from "@chakra-ui/react";
import MongoQuizData from "../../../src/data/dbconnection";
import Question from "../../../src/business/models/question";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface TakeAQuizProps {
  questions: Array<Question>;
  subjectValue: string;
}

export async function getServerSideProps(context) {
  const { subject } = context.query;
  const subjectValue = subject ? subject : '';
  console.log("subject is: ",subjectValue);
  try {
    var qd = new MongoQuizData();
    let questions = await qd.findQuestionListOfAQuiz(subjectValue);
    console.log("the rerurned array of questions: ",questions);
    return {
      props: {
        questions: JSON.parse(JSON.stringify(questions)),
        subjectValue
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
export default function takeAQuiz({ questions,subjectValue}: TakeAQuizProps) {
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
            <title>{subjectValue}</title>
            <meta name="description" content="Quiz App Home for students" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ChakraProvider>
            <Box minHeight="100vh" display="flex" flexDirection="column">
              <NavBar />
              <Box textAlign={"center"} width={"100%"} margin={"auto"} paddingTop={'2vh'}>
                <Heading fontSize={'4xl'}>{subjectValue}</Heading>
                <chakra.h3 fontSize={'xl'} paddingTop={'1vh'}>55:30</chakra.h3>
              </Box>
              <Box flex="1" mx="auto" justifyContent="center" alignContent={"center"}>
                <ShortAnswerQuestionList questions={questions}/>
              </Box>
              <Footer />
            </Box>
          </ChakraProvider>
        </>
      );
    }
  }
}
