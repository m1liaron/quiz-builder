import { ApiClient } from "./ApiClient";
import { API_URL } from "../common/constants/ApiUrl";
import { ApiRoutes } from "../common/constants/ApiRoutes";

class QuizApi {
    private client = new ApiClient(API_URL);

    async getQuizzes() {
        return this.client.authRequest({
            method: "GET",
            url: `${ApiRoutes._}${ApiRoutes.Quiz._}${ApiRoutes.Quiz.GET_ALL_QUIZZES}`,
        });
    }

    async getQuizById(id: string) {
        return this.client.authRequest({
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

export const api = new QuizApi();