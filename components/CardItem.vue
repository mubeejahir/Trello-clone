<template>
  <div v-for="data in itemData.items" :key="data.id">
    <div
      class="min-h-3 group relative mb-2 flex h-[35px] w-[250px] items-center rounded-xl bg-white px-[9px] py-[6px] shadow-md hover:outline hover:outline-2 hover:outline-[#A7C7E7]"
      draggable="true"
      @dragstart="startDrag($event, data)"
      v-if="data.item"
    >
      {{ data.item }}
      <span
        class="absolute right-1 hidden h-[28px] w-[28px] items-center justify-center rounded-[13px] hover:bg-[#D4BFFF] group-hover:flex"
        @click="deleteCard(data.id)"
      >
        <img src="../assets/img/delete.png" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemData"],
  methods: {
    deleteCard(cardId) {
      this.$emit("delete-card", cardId);
      console.log(typeof cardId);
    },
    startDrag(event, item) {
      console.log("Starting drag for:", item);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item.id);
      event.dataTransfer.setData("sourceCard", this.itemData.header);
      console.log("Dragging itemID:", item.id, "from", this.itemData.header);
    },
  },
  mounted() {
    console.log(this.itemData);
  },
};
</script>

<style lang="scss" scoped></style>
