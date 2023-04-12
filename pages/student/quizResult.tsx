import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../../components/ResultHeader";
import Footer from "../../components/Footer";
import Result from "../../components/Result";
import { Box, Container, Card, Text, Button, Stack} from "@chakra-ui/react";
import MongoQuizData from "../../src/data/dbconnection";
import Quiz from "../../src/business/models/Quiz";
import Student from "../../src/business/models/Student";


interface QuizBankProps {
  quiz: Quiz;
  student: Student;
}

export async function getServerSideProps({req: String}) {
  try {

    var qd = new MongoQuizData();
    let quiz = await qd.findQuiz("Math");
    // let student = await qd.findUserById("6421f6d62f585fab90f5328f");
    let student = await qd.findUser("Mikel@Mikel.com");

    return {
      props: {
        quiz: JSON.parse(JSON.stringify(quiz)),
        student:  JSON.parse(JSON.stringify(student)),

      },
    };
  } catch (e) {
    console.error(e);
  }
}
/**
 * Function to build the Student Quiz Result page with components
 * @returns the Quiz Result page for students build with the components Navigation Bar, Report Card, anf optionns to switch to various views and the footer. 
 */
export default function QuizResult(quiz: QuizBankProps) {
  let marks;
  for (let j = 0; j < quiz.student.quizzes.length; j++){
    console.log("Quiz Taken" + quiz.student.quizzes[j].subject)

    if(quiz.student.quizzes[j].subject == "Biology"){
        marks = quiz.student.quizzes[j].marks;
    }

  }

    let value='100'
  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Quiz App Home for students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <NavBar />
          <Box justifyContent="center">
            <Result/>
            <Container maxWidth='64vw' minHeight="20vh">
                    <Card bgColor='#D9D9D9'
                    maxWidth='100vw' minHeight="30vh"
                    borderRadius={'10px'} 
                    marginStart={16}
                    >
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Your Final Score: {marks}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Maximum Score: {quiz.quiz.maxMarks}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Correct Questions: {marks}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Total Questions: {quiz.quiz.maxMarks}</Text>
                        <Text align={'center'} py={1} fontSize={20} fontFamily={"Work Sans"} fontWeight={"bold"} color={"gray.800"}>Time Taken: {quiz.quiz.time}</Text>
                    </Card>
                </Container>
          </Box>
          <Box flex="1"  mx="auto" justifyContent="center">
                 <Stack  spacing={20} mt={14}  direction='row'>
                            <Button colorScheme="orange" >Attempt Again </Button>
                            <Button colorScheme="orange" >Main Menu </Button>
                            <Button colorScheme="orange" >Leaders Board </Button>
                        </Stack>
          </Box>
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
}
