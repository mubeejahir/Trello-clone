<template>
  <div>
    <div
      class="h-fit w-[275px] rounded-xl bg-[#f1f2f4] p-3 shadow-md"
      @dragenter.prevent
      @dragover.prevent
      @drop="handleDrop"
    >
      <h2 class="px-[9px] pb-[6px] font-medium">
        {{ dataItem.header }}
      </h2>
      <CardItem
        :itemData="cardItemData"
        @delete-card="handleDeleteCard"
      ></CardItem>
      <div :class="[` flex-col ${addCard ? 'flex' : 'hidden'} justify-start`]">
        <input
          type="text"
          class="mb-2 h-[50px] rounded-xl p-2 pl-4 text-[15px] focus:outline-2 focus:outline-[#A7C7E7]"
          name="listName"
          placeholder="Enter a title"
          ref="listName"
          v-model="cardData"
        />
        <div class="flex items-center">
          <button
            @click="setCardItem"
            class="ml-1 mr-2 h-[28px] w-[90px] rounded-sm bg-[#2759e2] text-[13px] text-[#FFFFFF]"
          >
            Add Card
          </button>
          <button
            class="rounded-sm p-1 hover:bg-slate-200"
            @click="handleCancel"
          >
            <img
              src="/assets/img/cancel.png"
              class="h-[20px] w-[20px] opacity-50"
            />
          </button>
        </div>
      </div>

      <button
        @click="setAddCard"
        :class="[
          `${
            addCard ? 'hidden' : 'flex'
          } py-3 pl-[6px] text-[13px] font-semibold`,
        ]"
      >
        <span
          ><img src="/assets/img/add.png " class="mr-[6px] h-[18px] w-[18px]"
        /></span>
        Add a card
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataItem"],
  data() {
    return {
      addCard: false,
      cardData: "",
      cardItemData: this.dataItem,
    };
  },
  methods: {
    setAddCard() {
      this.addCard = !this.addCard;

      this.$nextTick(() => {
        this.$refs.listName.focus();
      });
    },
    setCardItem() {
      // this.cardItemData.push(this.cardData);
      console.log(this.cardData);
      this.$emit("add-card", this.cardData);

      this.addCard = !this.addCard;
      this.cardData = "";
    },
    handleCancel() {
      this.addCard = !this.addCard;
      this.cardData = "";
    },
    handleDeleteCard(cardId) {
      this.$emit("delete-cardItem", cardId);
      console.log("card", cardId);
    },
    handleDrop(event) {
      const itemId = event.dataTransfer.getData("itemID");

      const sourceCard = event.dataTransfer.getData("sourceCard");
      console.log("droppeditemid", itemId, "from", sourceCard);
      const numericItemId = Number(itemId);
      const dragData = this.dataItem.items;

      if (sourceCard !== this.dataItem.header) {
        console.log("Item dropped from another card:", sourceCard);
        this.$emit("move-item", {
          itemId: numericItemId,
          fromCard: sourceCard,
          toCard: this.dataItem.header,
        });
      } else {
        // Handle the case where the item is dropped within the same card
        const draggedCard = dragData.find((card) => card.id === numericItemId);
        console.log("Same card drag & drop:", draggedCard);
      }
    },
  },
  mounted() {
    console.log(this.dataItem);
  },
};
</script>

<style lang="scss" scoped></style>
