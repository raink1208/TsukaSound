import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {quiz} from "./quiz.ts";

export default createStore({
    modules: {
        quiz,
    }
});