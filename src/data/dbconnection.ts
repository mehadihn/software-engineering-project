import { MongoClient , InsertOneResult } from "mongodb";
import Quiz, { UserQuiz , AdminQuizList} from "../business/models/Quiz";
import IQuestion from "../business/models/IQuestion";
import Question from "../business/models/question";
import Student from "../business/models/Student";
import IHandleQuizData from "../business/interfaces/IHandleQuizData";
import IGetQuestionData from "../business/interfaces/IGetQuestionData";
import IGetUserData from "../business/interfaces/IGetUserData";

import Questions from "../business/models/question";

/*
 * Concrete class that implements IHandleQuizData and serves up data from MongoDB
 */
export default class MongoQuizData implements IHandleQuizData, IGetQuestionData, IGetUserData {
  uri = process.env.MONGODB_URI ??"";

  async findQuiz(id: string) {
    const client = new MongoClient(this.uri);
    var quiz: Quiz | null = null;
    try {
      await client.connect();

      const database = client.db("test");
      const quizzes = database.collection("quizes");

      const query = { subject: id };

      const result = await quizzes.findOne(query);
      quiz = JSON.parse(JSON.stringify(result));
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return quiz;
    }
  }

  async deleteQuiz(subject: string) {
    const client = new MongoClient(this.uri);
    var quiz: Quiz | null = null;
    try {
      await client.connect();

      const database = client.db("test");
      const quizzes = database.collection("quizes");

      const query = { subject: subject };

      const result = await quizzes.deleteOne(query);
      quiz = JSON.parse(JSON.stringify(result));
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      await client.close();
      return true;
    }
  }

  async findAllQuizzes() {
    const client = new MongoClient(this.uri);
    var quizzes: Quiz[] | null = null;
    try {
      await client.connect();

      quizzes = await client
        .db("test")
        .collection<Quiz>("quizes")
        .find({})
        .toArray();
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return quizzes;
    }
  }

  async findAllQuizzesWithQuizTakersCount() {
    const client = new MongoClient(this.uri);
    var quizzes: AdminQuizList[] | null = null;
    try {
      await client.connect();

      quizzes = await client
        .db("test")
        .collection<AdminQuizList>("quizes")
        .find({})
        .toArray();

      for (const i in quizzes){
        let userQuiz = await client
        .db("test")
        .collection<Student>("users")
        .countDocuments({ "quizzes.subject": quizzes[i].subject });
        quizzes[i].quizTakers = userQuiz
      }
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return quizzes;
    }
  }

  async findQuizzesTakenByUser(name: string) {
    const client = new MongoClient(this.uri);
    //use an array to populate UserQuizes
    var userQuizzes = Array<UserQuiz>();

    try {
      await client.connect();

      //first get the quiz subjects that the user has taken. Refer: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/project/
      var dummyUser = {
        id: 0,
        name: "dummyname",
        lastname: "dummylastname",
        email: "dummyemail",
        password: "dummypassword",
        role: "dummyrole",
        quizzes: [{ subject: "Math", marks: 101 }],
      };

      var dummyQuiz = {
        id: 0,
        name: "DummyMathQuiz",
        subject: "Math",
        type: "DummyType",
        marks: 0,
        time: 0,
      };
      var user: Student =
        (await client
          .db("test")
          .collection<Student>("users")
          .findOne({ name: name })) ?? dummyUser;
      for (let q in user.quizzes) {
        var quiz: Quiz =
          (await this.findQuiz(user.quizzes[q].subject)) ?? dummyQuiz;
        userQuizzes.push({
          id: quiz.id,
          subject: quiz.subject,
          name: quiz.name,
          marks: user.quizzes[q].marks,
          type: quiz.type
        } as UserQuiz);
      }
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return userQuizzes;
    }
  }

  async findQuestion(qid: number) {
    const client = new MongoClient(this.uri);
    var question: IQuestion | null = null;
    try {
      await client.connect();

      const database = client.db("test");
      const questions = database.collection("questions");

      const query = { qid: qid };

      const result = await questions.findOne(query);
      question = JSON.parse(JSON.stringify(result));
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return question;
    }
  }

  async unlinkQuestionFromQuiz(subject: string) {
    const client = new MongoClient(this.uri);
    var question: IQuestion | null = null;
    try {
      await client.connect();

      const database = client.db("test");
      const questions = database.collection("questions");

      const query = { subject: subject };

      let results = await questions.find(query).toArray();
      for (let r = 0; r < results.length; r++) {
        const result = results[r];
        const updatedResults = { ...result, subject: 'null' }; // update the name field
        await questions.updateOne({ _id: result._id }, { $set: updatedResults }); // update the document in the collection
        results[r] = updatedResults
      }
      question = JSON.parse(JSON.stringify(results));
      
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return question;
    }
  }

  async findQuestionAnswer(qid: number) {
    const client = new MongoClient(this.uri);
    var question: IQuestion | null = null;
    var answer: string = "";
    try {
      await client.connect();

      const database = client.db("test");
      const questions = database.collection("questions");

      const query = { subject: qid };

      const result = await questions.findOne(query);
      question = JSON.parse(JSON.stringify(result));
      answer = question?.answer??"";

    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return answer;
    }
  }

  async findQuestionType(qid: number) {
    const client = new MongoClient(this.uri);
    
    var question: IQuestion | null = null;
    var type: string = "";
    try {
      await client.connect();

      const database = client.db("test");
      const questions = database.collection("questions");

      const query = { subject: qid };

      const result = await questions.findOne(query);
      question = JSON.parse(JSON.stringify(result));
      type = question?.type??"";
      
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return type;
    }
  }

  async findUser(email: string) {
    const client = new MongoClient(this.uri);
    var dummyUser = {
      id: 0,
      name: "NotFound",
      lastname: "NotFound",
      email: "NotFound",
      password: "NotFound",
      role: "NotFound",
      quizzes: [{ subject: "NotFound", marks: 100 }],
    };

    var user: Student = dummyUser
    try {
      await client.connect();

      user =
        (await client
          .db("test")
          .collection<Student>("users")
          .findOne({ email: email })) ?? dummyUser;
    }catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return user;
    }
  }

  async addUser(name: string, email: string, password: string, role: string) {
    const client = new MongoClient(this.uri);
    var dummyUser = {
      name: "NotFound",
      email: "NotFound",
      password: "NotFound",
      role: "NotFound",
      quizzes: [{ subject: "NotFound", marks: 100 }],
    };

    var user: Student = dummyUser
    var newUser: InsertOneResult<Student>;
    try {
      await client.connect();
      
      const data = { name: name, email: email, password: password, role: role, quizzes:[] };
      newUser =
        (await client
          .db("test")
          .collection<Student>("users")
          .insertOne(data));
      const insertedId = newUser.insertedId;
      user = await client.db("test").collection<Student>("users").findOne({_id: insertedId}) ?? dummyUser; // get the inserted document using findOne method

    }catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return user;
    }
  }

  async checkQuesAns(subject: string , question: string , userAns: string) {
    
    const client = new MongoClient(this.uri);
    var dummyQuestion = {
      id: 0,
      question: "NotFound",
      answer: "NotFound",
      subject: "NotFound",
      type: "NotFound",
    };
    
    var _question: Questions = dummyQuestion
    
    try {
      await client.connect();
      //first get the quiz subjects that the user has taken. Refer: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/project/

      _question  =
        (await client
          .db("test")
          .collection<Questions>("questions")
          .findOne({ subject: subject , question: question })) ?? dummyQuestion;
    }catch (err) {
      console.error(err);
      return false
    } finally {
      await client.close();
      if (_question.answer == userAns){
        return true
      }
      else{
        return false
      }
    }
  }
  /**
   * to find the question list of a certain quiz
   * @param subject - subject of the quizz(this is the identifier used to find the quiz which a certain question is belongs to)
   */
  async findQuestionListOfAQuiz(subject:string){
    const client = new MongoClient(this.uri);
    var questions: Question[] | null=null;
    try{
      await client.connect();
      questions = await client
        .db("test")
        .collection<Question>("questions")
        .find({subject})
        .toArray();
    }
    catch(err){
      console.error(err);
    }
    finally {
      await client.close();
      return questions;
    }
  }
  /**
   * To retrive time of a certain quizz based on subject
   * @param subject the subject of the quiz
   * @returns quiz time
   */
  async findQuizTime(subject: string) {
    const client = new MongoClient(this.uri);
    var quizTime: number | null = null;
    try {
      await client.connect();
  
      const database = client.db("test");
      const quizzes = database.collection("quizes");
  
      const query = { subject: subject };
  
      const result = await quizzes.findOne(query);
      quizTime = result?.time ?? null;
  
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
      return quizTime;
    }
  }
}
