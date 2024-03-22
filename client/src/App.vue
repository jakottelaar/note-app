<script lang="ts">
import axios from "axios";
import NoteCard from "./components/NoteCard.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ref } from "vue";

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default {
  data() {
    let title = ref("");
    let content = ref("");
    return {
      notes: [] as Note[],
      title,
      content,
    };
  },
  components: {
    NoteCard,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  },
  methods: {
    async fetchNotes() {
      const response = await axios.get("http://localhost:8080/note");
      this.notes = response.data.data;
    },
    async createNote() {
      const response = await axios.post("http://localhost:8080/note", {
        title: this.title,
        content: this.content,
      });
      console.log(response.data);
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
      <Dialog>
        <DialogTrigger
          class="mb-6 rounded-2xl border-2 border-black bg-black px-8 py-2 text-sm font-semibold text-white duration-300 hover:border-2 hover:border-black hover:bg-transparent hover:text-black"
        >
          Add
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a note</DialogTitle>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <input
                v-model="title"
                class="col-span-3 rounded-xl bg-neutral-200 p-2 outline-none"
                placeholder="Title"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <input
                v-model="content"
                class="col-span-3 rounded-xl bg-neutral-200 p-2 outline-none"
                placeholder="Content"
              />
            </div>
          </div>
          <DialogFooter>
            <button type="submit" @click="createNote">Save changes</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 class="mb-6 text-2xl font-bold">Notes</h1>
      <div class="grid grid-cols-4 gap-6">
        <div v-for="note in notes" :key="note.id">
          <NoteCard :-note="note" />
        </div>
      </div>
    </div>
  </div>
</template>
