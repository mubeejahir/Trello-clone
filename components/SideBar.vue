<template>
  <div class="relative hidden md:block">
    <div
      class="flex items-center justify-between px-3 py-4 text-[15px] font-bold"
    >
      <h1 class="text-slate-900">Your boards</h1>
      <button @click="setAddBoard">
        <img src="/assets/img/add.png" class="h-[20px] w-[20px]" />
      </button>
    </div>
    <div
      :class="[
        'group flex cursor-pointer items-center px-3 py-2 text-[14px] font-medium',
        isActiveBoard(board.name)
          ? 'bg-slate-400 text-white'
          : 'hover:bg-slate-300',
      ]"
      v-for="board in boards.board"
      :key="board.name"
      @click="changeBoard(board.name)"
    >
      <img src="/assets/img/board.png" class="mr-3 h-[20px] w-[20px]" />
      <h3>{{ board.name }}</h3>
      <span
        class="absolute right-[9px] hidden h-[25px] w-[25px] rounded-xl p-[5px] shadow-sm hover:bg-slate-200 group-hover:block"
        @click="deleteBoard(board.name)"
      >
        <img src="/assets/img/delete.png" />
      </span>
    </div>
    <!-- board popup -->
    <div
      :class="[
        `absolute left-[210px] top-[12px] ${
          displayBoard ? 'flex' : 'hidden'
        } h-[200px] w-[255px] flex-col rounded-lg bg-white shadow-md px-[16px] pt-[11px] pb-[12px] z-[1]`,
      ]"
    >
      <div
        class="relative flex items-center justify-center border-b-[1px] border-[#808080] pb-[4px]"
      >
        <h3 class="text-center text-[14px] font-semibold">Create Board</h3>
        <button
          class="absolute right-0 rounded-sm p-1 hover:bg-slate-200"
          @click="handleCancel"
        >
          <img
            src="/assets/img/cancel.png"
            class="h-[20px] w-[20px] opacity-50"
          />
        </button>
      </div>
      <label for="boardName" class="py-[7px] text-[14px] font-semibold"
        >Board Name:</label
      >
      <input
        type="text"
        id="boardName"
        name="boardName"
        placeholder="Enter a Board title"
        class="custom h-[45px] rounded-md border border-slate-200 bg-[#f1f2f4e3] p-[10px] shadow-md focus:outline focus:outline-2 focus:outline-[#A7C7E7]"
        v-model="boardName"
      />
      <div class="flex items-center justify-center">
        <button
          @click="setBoard"
          class="m-[15px] h-[40px] w-[115px] rounded-2xl bg-[#104172] p-[5px] font-normal text-white"
        >
          Create
        </button>
      </div>
    </div>
    <!-- delete popup -->
    <div></div>
  </div>
</template>

<script>
export default {
  props: ["boards", "currentBoard"],
  data() {
    return {
      displayBoard: false,
      boardName: "",
      // boards: ["Trello Clone"],
    };
  },
  methods: {
    setAddBoard() {
      this.displayBoard = !this.displayBoard;
      //   console.log(this.displayBoard);
    },
    setBoard() {
      this.$emit("add-board", this.boardName);

      this.$router.push({
        query: {
          board: this.boardName,
        },
      });
      this.displayBoard = !this.displayBoard;
      this.boardName = "";
    },
    changeBoard(name) {
      this.$emit("board-name", name);
      console.log(name);
    },
    deleteBoard(name) {
      this.$emit("delete-board", name);
      console.log(name);
    },
    isActiveBoard(boardName) {
      return this.currentBoard == boardName;
    },
    handleCancel() {
      this.displayBoard = !this.displayBoard;
      this.boardName = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
