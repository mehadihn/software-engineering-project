import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Center, Flex, HStack, Box } from "@chakra-ui/react";
import {Quiz} from "../src/models/studentQuizBank";
/**
 * to load css styles to the page since there are no default pagination in Chakra UI
 */
import { Global } from '@emotion/react';

interface Props {
  quizzes: Quiz[];
}

/**
 * Adding sample data to the table, these will be replaced by the database data
 */
const quizzes: Quiz[] = [
  {
    id: 1,
    name: "Quiz 1",
    subject: "Math",
    type: "Multiple Choice",
    time:"60 min"
  },
  {
    id: 2,
    name: "Quiz 2",
    subject: "English",
    type: "True or False",
    time:"60 min"
  },
  {
    id: 3,
    name: "Quiz 8",
    subject: "Science",
    type: "Fill in the Blanks",
    time:"60 min"
  },
  {
    id: 4,
    name: "Quiz 15",
    subject: "IQ",
    type: "Short Answer",
    time:"60 min"
  },
  {
    id: 5,
    name: "Quiz 16",
    subject: "IQ",
    type: "Short Answer",
    time:"60 min"
  },
  {
    id: 6,
    name: "Quiz 17",
    subject: "IQ",
    type: "Short Answer",
    time:"60 min"
  },
  {
    id: 7,
    name: "Quiz 18",
    subject: "IQ",
    type: "Short Answer",
    time:"60 min"
  },
  {
    id: 8,
    name: "Quiz 19",
    subject: "IQ",
    type: "Short Answer",
    time:"60 min"
  },
  {
    id: 9,
    name: "Quiz 20",
    subject: "IQ",
    type: "Short Answer",
    time:"60 min"
  },
  {
    id: 10,
    name: "Quiz 21",
    subject: "IQ",
    type: "Short Answer",
    time:"60 min"
  }
  // Add more quizzes as needed
];

/**
 * Defining the number of items per a page for pagination. 
 */
const ITEMS_PER_PAGE = 5;

/**
 * to map  data to the table view and to handle pagination
 * @returns table with provided data and pagination
 */
const QuizTable = ({ quizzes }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

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
              <Td>{quiz.time}</Td>
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
            pageCount={Math.ceil(quizzes.length / ITEMS_PER_PAGE)}
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
const TableView2 = () => {
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
      <QuizTable quizzes={quizzes} />
    </>
  );
};

export default TableView2;
