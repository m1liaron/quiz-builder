import { Option } from "@src/modules/option/option";
import { Question } from "@src/modules/question/question";
import { Quiz } from "@src/modules/quiz/quiz";
import { User } from "@src/modules/user/user";


export function initModels() {
    User.hasMany(Quiz, { foreignKey: "userId", as: "quizzes" });
    Quiz.belongsTo(User, { foreignKey: "userId", as: "user" });

    Quiz.hasMany(Question, { foreignKey: "quizId", as: "questions" });
    Question.belongsTo(Quiz, { foreignKey: "quizId", as: "quiz" });

    Question.hasMany(Option, { foreignKey: "questionId", as: "options" });
    Option.belongsTo(Question, { foreignKey: "questionId", as: "question" });
}