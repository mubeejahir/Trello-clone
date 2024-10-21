<template>
  <div class="font-Poppins">
    <Nav></Nav>
    <div class="flex">
      <SideBar
        class="w-[260px] bg-[#7992de9c] text-slate-800 shadow-lg"
        @add-board="setBoard"
        @board-name="handleBoard"
        @delete-board="handleDeleteBoard"
        v-if="data"
        :boards="data"
        :currentBoard="currentBoard.name"
      ></SideBar>
      <div class="h-[90vh] w-full gap-4 bg-[#7992de42] text-[#555555]">
        <!-- Header -->
        <div
          class="flex h-[40px] items-center justify-between bg-slate-400 px-2 shadow-md"
        >
          <h1 class="font-semibold text-slate-50" v-if="currentBoard">
            {{ currentBoard.name }}
          </h1>
          <div v-else class="text-slate-100">Loading...</div>
          <button class="flex items-center justify-center gap-2 text-slate-50">
            <span
              ><svg
                width="20"
                height="20"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            Filters
          </button>
        </div>
        <!-- cards -->
        <div class="flex flex-wrap gap-4 p-[10px]">
          <Cards
            v-if="currentBoard && currentBoard.boardDetails"
            v-for="data in currentBoard.boardDetails"
            :key="data.header"
            :dataItem="data"
            @move-item="moveItem"
            @add-card="handleAddCard(data.header, $event)"
            @delete-cardItem="handleDeleteCardItem(data.header, $event)"
          ></Cards>
          <AddList @add-header="setAddHeader"></AddList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      currentBoard: null,
      checkData: false,
    };
  },
  methods: {
    async setAddHeader(item) {
      try {
        if (!this.currentBoard.boardDetails) {
          this.currentBoard.boardDetails = [];
        }
        if (!item || item.trim() === "") {
          console.log("Cannot add empty header");
          return;
        }
        const newList = {
          header: item,
          items: [
            {
              id: "delete",
              item: "",
            },
          ],
        };

        this.currentBoard.boardDetails.push(newList);
        console.log("Added new list:", newList);

        const boardIndex = this.data.board.findIndex(
          (board) => board.name === this.currentBoard.name
        );
        if (boardIndex !== -1) {
          this.data.board[boardIndex] = {
            name: this.currentBoard.name,
            boardDetails: this.currentBoard.boardDetails,
          };
        }

        await this.updateFirebase();
        // const response = await fetch(
        //   "https://trello-clone-4712f-default-rtdb.firebaseio.com/data.json",
        //   {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify([
        //       {
        //         board: [
        //           {
        //             name: this.currentBoard.name,
        //             boardDetails: this.currentBoard.boardDetails,
        //           },
        //         ],
        //         userName: this.data.userName || "",
        //         userPassword: this.data.userPassword || "",
        //       },
        //     ]),
        //   }
        // );
        // if (!response.ok) {
        //   throw new Error("failed to update Firebase ");
        // }

        // const updateData = await response.json();
        // console.log("update Successfull", updateData);
        // await this.getData();
      } catch (error) {
        console.error("Error adding new list", error);
      }

      // this.currentBoard.boardDetails.push({ header: item, items: [] });
    },
    async handleAddCard(data, event) {
      try {
        if (!Array.isArray(this.currentBoard.boardDetails)) {
          console.log("Error: Its not an array");
        }

        if (!event || event.trim() === "") {
          console.log("Cannot add empty card data");
          return;
        }
        // const listIndex = this.currentBoard.boardDetails.findIndex(
        //   (el) => el.header === data
        // );

        // this.currentBoard.boardDetails[listIndex].items.push({
        //   id: Math.floor(Math.random() * 1e16).toString(),
        //   item: event,
        // });

        this.currentBoard.boardDetails.forEach((el) => {
          if (el.header === data) {
            el.items.push({
              id: Math.floor(Math.random() * 1e16).toString(),
              item: event,
            });
          }
        });
        console.log("new card", this.currentBoard.boardDetails);

        const boardIndex = this.data.board.findIndex(
          (board) => board.name === this.currentBoard.name
        );
        if (boardIndex !== -1) {
          this.data.board[boardIndex] = {
            name: this.currentBoard.name,
            boardDetails: this.currentBoard.boardDetails,
          };
        }

        await this.updateFirebase();
      } catch (error) {
        console.log("Error", error);
      }
    },
    async setBoard(boardName) {
      try {
        if (!this.data.board) {
          this.data.board = [];
        }

        if (!boardName || boardName.trim() === "") {
          console.log("Cannot add empty board");
          return;
        }

        const newBoard = {
          boardDetails: [
            {
              header: "To Do",
              items: [
                {
                  id: "delete",
                  item: "",
                },
              ],
            },
          ],
          name: boardName,
        };

        this.data.board.push(newBoard);
        this.currentBoard = JSON.parse(JSON.stringify(newBoard)); // Set as current board
        console.log("Added New Board", this.data.board);
        await this.updateFirebase();
      } catch (error) {
        console.log("error adding new Board", error);
      }
    },
    async handleBoard(boardName) {
      try {
        if (!this.data.board) {
          this.data.board = [];
        }

        if (!boardName || boardName.trim() === "") {
          console.log("Cannot add empty board");
          return;
        }

        const findBoardIndex = this.data.board.findIndex(
          (el) => el.name === boardName
        );
        console.log(findBoardIndex);

        if (findBoardIndex !== -1) {
          this.currentBoard = this.data.board[findBoardIndex];
          this.data.board[findBoardIndex] = {
            name: this.currentBoard.name,
            boardDetails: this.currentBoard.boardDetails,
          };
          console.log(this.data.board, this.currentBoard);
        }
      } catch (error) {
        console.log("Error changing board", error);
      }
    },
    async handleDeleteCardItem(header, cardId) {
      try {
        if (typeof cardId !== "string") {
          console.log("Invalid card Id type");
        }
        console.log(this.currentBoard);
        let findId;
        this.currentBoard.boardDetails.forEach((el) => {
          if (el.header === header) {
            findId = el.items.findIndex((item) => {
              return item.id === cardId;
            });
            console.log(findId);
            if (findId) return findId;
          } else {
            return;
          }
        });

        this.currentBoard.boardDetails.forEach((el) => {
          if (findId === 0) {
            el.items[findId].id = "delete";
            el.items[findId].item = "";
            console.log("empty data added", this.currentBoard.boardDetails);
          } else if (el.header === header) {
            el.items.splice(findId, 1);
            console.log("delete card", this.currentBoard.boardDetails);
          }
        });
        const boardIndex = this.data.board.findIndex(
          (board) => board.name === this.currentBoard.name
        );

        if (boardIndex !== -1) {
          this.data.board[boardIndex] = {
            name: this.currentBoard.name,
            boardDetails: this.currentBoard.boardDetails,
          };
        }

        await this.updateFirebase();
      } catch (error) {
        console.log("error on delete card item", error);
      }
    },
    async handleDeleteBoard(boardName) {
      try {
        if (typeof boardName !== "string") {
          console.log("Invalid boardName");
        }
        console.log(this.data.board);
        let findIndex = this.data.board.findIndex((el) => {
          return el.name === boardName;
        });
        console.log(findIndex);
        let isDelete = confirm(
          `Are you sure you want to delete this ${boardName} board ?`
        );
        if (findIndex === -1) {
          console.log("board not found");
        }
        if (findIndex === 0) {
          console.log("cannot delete the default board");
          return;
        }
        if (isDelete) {
          this.data.board.splice(findIndex, 1);
          if (this.currentBoard.name === boardName) {
            this.currentBoard = JSON.parse(JSON.stringify(this.data.board[0]));
          }
          await this.updateFirebase();
          console.log("delete-board succesfull", this.data.board);
        }
        console.log("Delete action cancelled!");
      } catch (error) {
        console.log("Error on deleting board", error);
      }
    },
    async moveItem({ itemId, fromCard, toCard }) {
      // Find the source card's items array
      try {
        const sourceCard = this.currentBoard.boardDetails.find(
          (card) => card.header === fromCard
        );
        const destinationCard = this.currentBoard.boardDetails.find(
          (card) => card.header === toCard
        );
        console.log("move-item", sourceCard, destinationCard, itemId);
        // Find the item in the source card
        const itemIndex = sourceCard.items.findIndex(
          (item) => Number(item.id) === itemId
        );
        console.log(itemIndex);
        if (itemIndex === -1) {
          console.error("Item not found in source card");
          return;
        }
        const item = sourceCard.items.splice(itemIndex, 1)[0]; // Remove from source

        // Add the item to the destination card
        destinationCard.items.push(item);

        const boardIndex = this.data.board.findIndex(
          (board) => board.name === this.currentBoard.name
        );
        if (boardIndex !== -1) {
          this.data.board[boardIndex] = {
            name: this.currentBoard.name,
            boardDetails: this.currentBoard.boardDetails,
          };
        }

        await this.updateFirebase();

        console.log("Moved item:", item, "from", fromCard, "to", toCard);
      } catch (error) {
        console.log("Error on drag and drop the item!", error);
      }
    },
    async getData() {
      try {
        const response = await fetch(
          "https://trello-clone-4712f-default-rtdb.firebaseio.com/data.json"
        );
        const result = await response.json();
        console.log(result, typeof result);
        //process the data to convert empty arrays
        // const processedData = this.processFirebaseData(result);

        if (result.length > 0) {
          this.data = result[0];
          if (this.data && this.data.board && this.data.board.length > 0) {
            this.currentBoard = JSON.parse(JSON.stringify(this.data.board[0])); //deep copy to ensure reactivity
          } else {
            console.error("no board data found");
          }
        } else {
          console.error("Data is not in expected format");
        }

        // Ensure the result has the expected structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async updateFirebase() {
      try {
        const response = await fetch(
          "https://trello-clone-4712f-default-rtdb.firebaseio.com/data.json",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              {
                board: this.data.board,
                userName: this.data.userName || "",
                userPassword: this.data.userPassword || "",
              },
            ]),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update new card into firebase");
        }

        const result = await response.json();
        console.log(
          "update card successfull",
          result,
          this.currentBoard.boardDetails
        );
      } catch (error) {
        console.error("Error updating firebase", error);
      }
    },
  },
  async created() {
    await this.getData();

    console.log(this.data, this.currentBoard);
  },
};
</script>

<style scoped></style>
