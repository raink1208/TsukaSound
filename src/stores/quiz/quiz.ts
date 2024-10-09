import {defineStore} from "pinia";

export interface QuizState {
    quizScore: number;
    answered: number;
}

export const useQuizStore = defineStore('quiz', {
    state: (): QuizState => ({
        quizScore: 0,
        answered: 0,
    }),
    getters: {
        getScore: (state): number => state.quizScore,
        getAnswered: (state): number => state.answered,
    },
    actions: {
        setScore(value: number) {
            this.quizScore = value;
        },
        incrementScore() {
            this.quizScore += 1;
        },
        setAnswered(value: number) {
            this.answered = value;
        },
        incrementAnswered() {
            this.answered += 1;
        },
        resetQuiz() {
            this.quizScore = 0;
            this.answered = 0;
        }
    },
});