import { Module } from 'vuex';

export interface QuizState {
    quizScore: number;
}

const state = (): QuizState => ({
    quizScore: 0,
});

const getters = {
    getScore(state: QuizState): number {
        return state.quizScore;
    },
};

const mutations = {
    setScore(state: QuizState, value: number) {
        state.quizScore = value;
    },
    incrementScore(state: QuizState) {
        state.quizScore += 1;
    },
};

const actions = {
    setScore({ commit }, value: number) {
        commit('setScore', value);
    },
    incrementScore({ commit }) {
        commit('incrementScore');
    },
};

export const quiz: Module<QuizState, any> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};