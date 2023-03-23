/**
 * Defining the types of data used in the QuizBank Table
 */
export interface Quiz {
    id: number;
    name: string;
    subject: string;
    type: string;
    time:number;
    marks:number;
}