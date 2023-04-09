/**
 * Creating the component for displaying short answer quiz with pagination
 */
import { useState } from "react"; //for pagination
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
/**
 * to load css styles to the page since there are no default pagination in Chakra UI
 */
import GlobalStyles from "./globalStyles"
import Question from "../src/business/models/question";
import adminHome from "../pages/admin";
import { useSession, getSession, signIn, signOut } from "next-auth/react";

export async function updateMarks(postId: number, subject: string, marks: number) {
  try {
    const options: any = {
      method: "POST",

      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },

      body: `{"marks": ${marks}, "subject": "${subject}"}`, 

    };

    let response = await fetch(`/api/quizes/quizMarks?id=${postId}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

  } catch (error) {
    console.log("An error occured while updating marks ", error);
  }
}

type Question = {
  id: number;
  text: string;
};

interface ShortAnswerQuestionsProps {
  questions: Question[];
  subjectValue: string;
  emailValue: string;
  totalMarks:number;
}
/**
 * defining the set of question sets
 */
let texts = ["What is your name before the marriage if you are married ?sumrish","What is your favorite color?black","What is your favorite food?biryani","What is your favorite animal?dog","What is your favorite book?novel","What is your favorite book when you were in high school and still willing to read?novel"]
/**
 * Adding sample data to the quiz, this will be replaced by the database data
 * id will be auto incremented as the mapping loop index in order to provide a rerialized question id to the questions in the quizz
 */
const questions: Question[] = texts.map((text, index) => ({ id: index + 1, text: text.split('?')[0] , answer: text.split('?')[1]}));

/**
 * define question items per page for pagination
 */
const ITEMS_PER_PAGE = 3;

/**
 * Passing fetched data to the UI mapping the data fielts with form data attributes.
 * Since the questions for a quizz coming from the questionbank, there id's are not serialized, so added auto incrementing question id using indec variable
 * @returns returns a UI with short answer quizz containing quiz items(question and input for ander) and pagination for easy navigation
 */
const ShortAnswerQuestions = ({questions,subjectValue,emailValue,totalMarks}:ShortAnswerQuestionsProps)=>{
  /**
   * Calculations for pagination
   */
  const [currentPage, setCurrentPage] = useState(0);

  let indexUpdate  = 0; 
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const handlePageClick = ({ selected }: { selected: number }) => {
    console.log("Seclected" + selected);
    indexUpdate = 3
    setCurrentPage(selected);
  
  };
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const [formValues, setFormValues] = useState([]);

  const { data: session, status } = useSession();

  const handleChange = (event, index) => {
    indexUpdate = currentPage * 3;
    // console.log(index + indexUpdate);
    const { name, value } = event.target;
    const newFormValues = [...formValues];
    newFormValues[index+ indexUpdate] = { ...newFormValues[index + indexUpdate], [name]: value };
    setFormValues(newFormValues);
  };

  let marks = 0

  
  const handleSubmit = (event) => {

    
    event.preventDefault();

    let finalArray = []
    const monkey = (dict) => {
      for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        console.log(dict[key]);
        finalArray.push(dict[key])
      }
      }
  }
  formValues.map(x => monkey(x))

  for (let j = 0; j < finalArray.length; j++){
    if(questions[j].answer == finalArray[j]){
              // console.log("Correct Answer")
              marks = marks +1
          }
        }

    // console.log("Total marks" + marks)
    updateMarks("6421f6d62f585fab90f5328f" as Number,"Biology",  marks)
    console.log("Marks Updated Successfully");

  };


  return (
    <Flex>
      <GlobalStyles/>
      <VStack spacing={10} align={"stretch"} justify={"center"}>
        <form action="" method="post" onSubmit={handleSubmit}>
            {currentQuestions.map((q, index) => (
              <Box
                key={q.question}
                bg="#F2F2E4"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
                marginTop={"3"}
              >
                <FormControl id="answer">
                  <FormLabel>
                    Question {startIndex + index + 1}: {q.question}
                  </FormLabel>
                    <Input 
                      type="text" 
                      id="answer" 
                      backgroundColor={"white"} width="50%"
                      key={index}
                      name={`input${index}`} // use a unique name for each input
                      value={q ? q[`input${index}`] : ""} // use the corresponding value from the state
                      onChange={(event) => handleChange(event, index)}
                     />
                </FormControl>
              </Box>
            ))}
          
          <Flex justifyContent="center" mt={10}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={totalPages}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </Flex>
          <Flex justifyContent="center" mt={10}>
            <Button id="submit" type="submit" colorScheme="orange" mt={4} >
              {" "}
              Submit
            </Button>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
};
export default ShortAnswerQuestions;
