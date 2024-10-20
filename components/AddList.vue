<template>
  <div
    class="h-fit w-[275px] rounded-xl bg-[#ffffff] p-3 text-[13px] font-bold shadow-md"
  >
    <div
      :class="[` flex-col ${displayList ? 'flex' : 'hidden'} justify-start`]"
    >
      <input
        type="text"
        class="mb-2 rounded-xl p-2 pl-4 focus:outline-2 focus:outline-[#A7C7E7]"
        name="listName"
        placeholder="Enter List name..."
        ref="listName"
        v-model="listName"
      />
      <div class="flex items-center">
        <button
          @click="setListName"
          class="ml-1 mr-2 h-[28px] w-[75px] rounded-sm bg-[#2759e2] text-[#FFFFFF]"
        >
          Add List
        </button>
        <button class="rounded-sm p-1 hover:bg-slate-200" @click="handleCancel">
          <img
            src="/assets/img/cancel.png"
            class="h-[20px] w-[20px] opacity-50"
          />
        </button>
      </div>
    </div>

    <button :class="[`${displayList ? 'hidden' : 'flex'}`]" @click="setList">
      <span
        ><img src="/assets/img/add.png " class="mr-[6px] h-[20px] w-[20px]"
      /></span>

      Add Another List
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayList: false,
      listName: "",
    };
  },
  methods: {
    setList() {
      this.displayList = !this.displayList;
      this.$nextTick(() => {
        this.$refs.listName.focus();
      });
    },
    setListName() {
      this.$emit("add-header", this.listName);
      this.displayList = !this.displayList;
      this.listName = "";
    },
    handleCancel() {
      this.displayList = !this.displayList;
      this.listName = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
