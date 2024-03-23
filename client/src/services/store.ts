import axios from "axios";
import { createStore } from "vuex";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export const store = createStore({
  state: {
    notes: [] as Note[],
  },
  getters: {
    getNotes: (state: any) => state.notes,
  },
  actions: {
    async fetchNotes({ commit }: { commit: Function }) {
      const response = await axios.get("http://localhost:8080/note");
      commit("SET_NOTES", response.data.data);
    },
    async createNote({ dispatch }: { dispatch: Function }, note: Note) {
      await axios.post("http://localhost:8080/note", note);
      dispatch("fetchNotes");
    },
    async deleteNote({ dispatch }: { dispatch: Function }, id: number) {
      await axios.delete(`http://localhost:8080/note/${id}`);
      dispatch("fetchNotes");
    },
  },
  mutations: {
    SET_NOTES(state: any, notes: Note[]) {
      state.notes = notes;
    },
  },
});
