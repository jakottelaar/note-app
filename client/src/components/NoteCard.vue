<script lang="ts">
export default {
  props: {
    Note: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      const date = new Date(this.Note.created_at);

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
};
</script>

<template>
  <div
    class="flex h-[250px] w-[225px] flex-col justify-between rounded-xl bg-white p-4 shadow-lg"
  >
    <div>
      <h1 class="text-xl font-bold">{{ Note.title }}</h1>
      <p class="text-clip">{{ Note.content }}</p>
    </div>
    <p class="text-sm text-neutral-500">{{ formattedDate }}</p>
  </div>
</template>
