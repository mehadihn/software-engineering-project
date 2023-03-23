import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Center, Flex, HStack, Box, cookieStorageManager } from "@chakra-ui/react";
import {Quiz} from "../src/models/studentQuizBank";
/**
 * to load css styles to the page since there are no default pagination in Chakra UI
 */
import { Global } from '@emotion/react';

interface Props {
  quizzes: Quiz[];
}


/**
 * to map  data to the table view and to handle pagination
 * @returns table with provided data and pagination
 */
const QuizTable = ({ quizItem }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const quizzes: Quiz[] = quizItem.data
  const ITEMS_PER_PAGE = 5;
  const PAGE_COUNT = Math.ceil(quizzes.length / ITEMS_PER_PAGE)
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const offset = currentPage * ITEMS_PER_PAGE;
  
  const pagedQuizzes = quizzes.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <>
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

/**
 * To load data to the designed QuizTable and to load css styles to the quiz table since there is no styles for pagination in Chakra UI
 * @returns data for the quiz table
 */
const TableView2 = (data) => {
  return (
    <>
      <Global
        styles={`
          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            pointer-events: auto;
            cursor: pointer;
            list-style:none;s
          }
          
          ::marker {
            list-style: none;
            display:none;
          }

          .pagination li a{
            display: inline-block;
            margin: 0 10px;
            border: 1px solid orange;
            padding: 10px;
            border-radius:5px;
            background-color:#FFFFCE;
            cursor: pointer;
            pointer-events: auto;
            font-weight:bold;
          }


          .pagination li a.active{
            color: black;
            bg-color:orange;
          }

          .pagination li.hover{
            background-color:orange;
          }

          .pagination li.clicked{
            background-color:orange;
            color:orange;
          }

          .pagination__link--active {
            color: #DD6B20;
          }

          .pagination__link--disabled {
            opacity: 0.5;
            pointer-events: none;
          }
        `}
      />
      <QuizTable quizItem={data} />
    </>
  );
};

export default TableView2;
