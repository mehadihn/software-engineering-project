/**
 * To create title card for QuizBank Page
 */
import { Box,chakra } from "@chakra-ui/react";

/**
 * Creating the title card for the quizbank page
 * @returns the title of quizbank page
 */
export default function Card() {
  return (
    <Box textAlign={"center"} width={"100%"} margin={"auto"}>
      <chakra.h1
        py={5}
        fontSize={48}
        fontFamily={"Work Sans"}
        fontWeight={"bold"}
        color={"gray.800"}
      >
        Quiz Bank
      </chakra.h1>
    </Box>
  );
}
