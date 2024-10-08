import {defineStore} from "pinia";

export interface QuizState {
    quizScore: number;
    nowId: number;
    answered: number;
}

export const useQuizStore = defineStore('quiz', {
    state: (): QuizState => ({
        quizScore: 0,
        nowId: 0,
        answered: 0,
    }),
    getters: {
        getScore: (state): number => state.quizScore,
        getNowId: (state): number => state.nowId,
        getAnswered: (state): number => state.answered,
    },
    actions: {
        setScore(value: number) {
            this.quizScore = value;
        },
        incrementScore() {
            this.quizScore += 1;
        },
        setNowId(value: number) {
            this.nowId = value;
        },
        incrementNowId() {
            this.nowId += 1;
        },
        setAnswered(value: number) {
            this.answered = value;
        },
        incrementAnswered() {
            this.answered += 1;
        }
    },
});