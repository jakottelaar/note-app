<script lang="ts">
import axios from "axios";
import NoteCard from "./components/NoteCard.vue";

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default {
  data() {
    return {
      notes: [] as Note[],
    };
  },
  components: {
    NoteCard,
  },
  methods: {
    async fetchNotes() {
      const response = await axios.get("http://localhost:8080/note");
      this.notes = response.data.data;
    },
  },
  beforeMount() {
    this.fetchNotes();
  },
};
</script>

<template>
  <div class="flex h-screen w-screen flex-col items-center bg-neutral-100">
    <div class="mt-12">
      <button
        class="mb-6 rounded-2xl border-2 border-black bg-black px-8 py-2 text-sm font-semibold text-white duration-300 hover:border-2 hover:border-black hover:bg-transparent hover:text-black"
      >
        Add
      </button>
      <h1 class="mb-6 text-2xl font-bold">Notes</h1>
      <div class="grid grid-cols-4 gap-6">
        <div v-for="note in notes" :key="note.id">
          <NoteCard :-note="note" />
        </div>
      </div>
    </div>
  </div>
</template>
