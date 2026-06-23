import { ApiRoutes } from "../common/constants/ApiRoutes";
import { API_URL } from "../common/constants/ApiUrl";
import type { Quiz } from "../common/types/Quiz.type";
import { ApiClient } from "./ApiClient";

class QuizApi {
    private client = new ApiClient(API_URL);

    async getQuizzes(): Promise<Quiz[]> {
        return this.client.authRequest<Quiz[]>({
            method: "GET",
            url: `${ApiRoutes._}${ApiRoutes.Quiz._}${ApiRoutes.Quiz.GET_ALL_QUIZZES}`,
        });
    }

    async getQuizById(id: string): Promise<Quiz> {
        return this.client.authRequest<Quiz>({
            method: "GET",
            url: `${ApiRoutes._}${ApiRoutes.Quiz._}${ApiRoutes.Quiz.GET_BY_ID_QUIZ}`.replace(
                ":id",
                id
            ),
        });
    }

    async createQuiz(data: unknown) {
        return this.client.authRequest({
            method: "POST",
            url: `${ApiRoutes._}${ApiRoutes.Quiz._}${ApiRoutes.Quiz.CREATE_QUIZ}`,
            data,
        });
    }

    async deleteQuiz(id: string) {
        return this.client.authRequest({
            method: "DELETE",
            url: `${ApiRoutes._}${ApiRoutes.Quiz._}${ApiRoutes.Quiz.DELETE_QUIZ}`.replace(
                ":id",
                id
            ),
        });
    }
}

export const quizApi = new QuizApi();