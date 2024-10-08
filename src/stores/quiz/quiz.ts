import { Module } from 'vuex';

export interface QuizState {
    quizScore: number;
    nowId: number;
}

const state = (): QuizState => ({
    quizScore: 0,
    nowId: 0,
});

const getters = {
    getScore(state: QuizState): number {
        return state.quizScore;
    },
    getNowId(state: QuizState): number {
        return state.nowId;
    }
};

const mutations = {
    setScore(state: QuizState, value: number) {
        state.quizScore = value;
    },
    incrementScore(state: QuizState) {
        state.quizScore += 1;
    },
    setNowId(state: QuizState, value: number) {
        state.nowId = value;
    },
    incrementNowId(state: QuizState) {
        state.nowId += 1;
    }
};

const actions = {
    setScore({ commit }, value: number) {
        commit('setScore', value);
    },
    incrementScore({ commit }) {
        commit('incrementScore');
    },
    setNowId({ commit }, value: number) {
        commit('setNowId', value);
    },
    incrementNowId({ commit }) {
        commit('incrementNowId');
    }
};

export const quiz: Module<QuizState, any> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};