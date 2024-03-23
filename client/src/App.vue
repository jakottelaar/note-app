<script setup>
import axios from "axios";
import { useStore } from "vuex";
import NoteCard from "./components/NoteCard.vue";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ref, onMounted } from "vue";

const store = useStore();

const title = ref("");
const content = ref("");

onMounted(async () => {
  await store.dispatch("fetchNotes");
});

const createNote = async () => {
  const newNote = {
    title: title.value,
    content: content.value,
  };
  await store.dispatch("createNote", newNote);
  // Clear input fields after creating note
  title.value = "";
  content.value = "";
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
              <textarea
                v-model="content"
                class="col-span-3 h-[200px] resize-none rounded-xl bg-neutral-200 p-2 outline-none"
                placeholder="Content"
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              @click="createNote"
              class="rounded-xl bg-black px-4 py-2 font-semibold text-white duration-300 hover:bg-transparent hover:text-black"
            >
              Save changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 class="mb-6 text-2xl font-bold">Notes</h1>
      <div class="grid grid-cols-4 gap-6">
        <div v-for="note in $store.state.notes" :key="note.id">
          <NoteCard :note="note" />
        </div>
      </div>
    </div>
  </div>
</template>
