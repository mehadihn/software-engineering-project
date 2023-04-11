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
  Flex
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
/**
 * to load css styles to the page since there are no default pagination in Chakra UI
 */
import GlobalStyles from "./globalStyles"
import Question from "../src/business/models/question";

interface ShortAnswerQuestionsProps {
  questions: Question[];
  subjectValue: string;
}
/**
 * define question items per page for pagination
 */
const ITEMS_PER_PAGE = 3;

/**
 * Passing fetched data to the UI mapping the data fielts with form data attributes.
 * Since the questions for a quizz coming from the questionbank, there id's are not serialized, so added auto incrementing question id using indec variable
 * @returns returns a UI with short answer quizz containing quiz items(question and input for ander) and pagination for easy navigation
 */
const ShortAnswerQuestions = ({questions,subjectValue}:ShortAnswerQuestionsProps)=>{
  /**
   * Calculations for pagination
   */
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const handlePageClick = ({ selected }: { selected: number }) => { 
    setCurrentPage(selected); 
  };
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);
  return (
    <Flex>
      <GlobalStyles/>
      <VStack spacing={10} align={"stretch"} justify={"center"}>
        <form>
            {currentQuestions.map((q,index) => (
              <Box
                key={q.question}
                bg="#F2F2E4"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
                marginTop={"3"}
              >
                <FormControl>
                  <FormLabel>
                    Question {startIndex + index + 1}: {q.question}
                  </FormLabel>
                    <Input backgroundColor={"white"} width="50%"/>
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
            <Button type="submit" colorScheme="orange" mt={4}>
              Submit
            </Button>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
};
export default ShortAnswerQuestions;
