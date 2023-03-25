import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Center, Flex, HStack, Box } from "@chakra-ui/react";
import {Quiz} from "../src/models/studentQuizBank";
/**
 * to load css styles to the page since there are no default pagination in Chakra UI
 */
import GlobalStyles from "./globalStyles"

interface QuizBankProps {
  quizzes: Quiz[];
}

/**
 * to map  data to the table view and to handle pagination
 * @returns table with provided data and pagination
 */

const QuizTable =  ({ quizzes }: QuizBankProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 5;
  
  const PAGE_COUNT = Math.ceil(quizzes.quiz.length / ITEMS_PER_PAGE)
  const offset = currentPage * ITEMS_PER_PAGE;
  const pagedQuizzes = quizzes.quiz.slice(offset, offset + ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  

  return (
    <>
    <GlobalStyles/>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Quiz Name</Th>
            <Th>Subject</Th>
            <Th>Quiz Type</Th>
            <Th>Quiz Weight</Th>
            <Th>Time</Th>
            <Th textAlign={"right"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedQuizzes.map((quiz) => (
            <Tr key={quiz.id}>
              <Td>{quiz.name}</Td>
              <Td>{quiz.subject}</Td>
              <Td>{quiz.type}</Td>
              <Td>{quiz.marks}</Td>
              <Td>{quiz.time} min</Td>
              <Td textAlign={"right"}>
                <Button colorScheme="orange">Take Quiz</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="center" mt={5}>
        <Box display="inline-block" borderRadius="md" border="0px solid gray" >
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={PAGE_COUNT}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"} 
          />
        </Box>
      </Flex>
    </>
  );
};


export default QuizTable;