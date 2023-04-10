import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../../components/studentNavbar";
import Footer from "../../../components/Footer";
import Card from "../../../components/ExamTitleCard";
import ShortAnswerQuestionList from "../../../components/shortAnswerQuestions";
import { Box } from "@chakra-ui/react";
import MongoQuizData from "../../../src/data/dbconnection";
import Question from "../../../src/business/models/question";

interface TakeAQuizProps {
  questions: Array<Question>;
}
/**
 * To fetch questionlist from the data layer
 * @returns JSON string of questions for Math subject as received from the database
 */
export async function getServerSideProps() {
  try {

    var qd = new MongoQuizData();
    let questions = await qd.findQuestionListOfAQuiz("Math");
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
 * @param questions - json string of questions data for Math subject as received from the database.
 * @returns Attempt a Quiz UI for students
 */
export default function takeAQuiz({ questions }: TakeAQuizProps) {
  return (
    <>
      <Head>
        <title>Take A Quiz</title>
        <meta name="description" content="Take a quiz screen for students" />
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
            <ShortAnswerQuestionList questions={questions}/>
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
}
