import MongoQuizData from "../../../src/data/dbconnection";

export default async (req, res) => {
    try {
        var qd = new MongoQuizData();
        console.log(req.query)
        console.log(req.body.subject)
        console.log(req.body.marks)

        const addMarks = await qd.addMarks(req.query , req.body.subject, req.body.marks)
        res.status(200).json();
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}