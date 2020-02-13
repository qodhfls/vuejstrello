<template>
    <div >
        <div class="board">
            <b-form-input v-model="newTitle" type="text" placeholder="title"/>
            <b-button v-on:click="onAddList(title)">Add list</b-button>
            <div>
              <draggable>
            <div v-for="(board,index) in boards" :key="index">
               <b-container>  
              <b-row>
                <div class="board-container">
                  <div>{{board.boardTitle}}</div>
            <draggable v-for="card in board.cards" :key="card.id" group="people" >
              <div>
        {{card.title}}<b-button v-on:click="showModal(card)">Show Modal</b-button>
        }<b-button v-on:click="deleteModal(card)">Delete Modal</b-button>
        </div>
            </draggable>
            </div>
              </b-row>
            </b-container>
        </div>
        </draggable>
            </div>
        </div>
     <b-modal  size="lg" v-model="modal" @ok="handleOk">
              <modal ref="cardModal" v-bind:sendData="modalData" @child="updateCard"/>
    </b-modal> 
    </div>   
</template>


<script>
import draggable from 'vuedraggable'
import modal from './items/modal'

export default {
     components: {
            draggable,
            modal
        },
    data:function(){
        return{
          newTitle:"",
          modal:false,
            boards:[{boardTitle:"Test",cards:[
                {boardId:0,boardTitle:"Test",id:0,
                title:"a",content:"1",timeLimit:""}
                ,{boardId:0,boardTitle:"Test",id:1,
                title:"b",content:"2",timeLimit:""}
            ]},{boardTitle:"Test2",cards:[
                {boardId:1,boardTitle:"Test",id:0,
                title:"c",content:"3",timeLimit:""}
                ,{boardId:1,boardTitle:"Test2",id:1,
                title:"d",content:"5",timeLimit:""}
                ]
            }
            ],
            card:{},
            modalData:{}
        }
    },
    methods:{
        onAddList:function(title){
         console.log(title);
        },
        makeNewList:function(title){
            console.log(title);
        },
        showInputForm:function(){
            console.log("showInputForm");
        },
        showModal(items){
          this.modal=true
          this.modalData=items
        },
        deleteModal(items){
          console.log("deleteModal")
          var index = this.boards[items.boardId].cards.findIndex(function(item){ return item.id === items.id; })
          this.boards[items.boardId].cards.splice(index,1);
        },
        handleOk(){
          console.log("Press Ok")
            this.$nextTick(() => {
            this.$refs.cardModal.update()
        })
          
        },
        updateCard(modal){
          console.log("getDataFromChild")
          console.log(modal.boardId)
          console.log(modal.boardTitle)
          console.log(modal.title)
          console.log(modal.content)
          console.log(this.boards[modal.boardId].cards[modal.id])
          this.boards[modal.boardId].cards[modal.id].title=modal.title;
          this.boards[modal.boardId].cards[modal.id].content=modal.content;

        }   
    }
    
}
</script>

<style>
  .board-container {
    width: 500px;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  }

</style>