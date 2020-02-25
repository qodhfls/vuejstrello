<template>
    <div >
        <div class="board">
            <b-form-input v-model="newTitle" type="text" placeholder="listTitle"/>
            <b-button v-on:click="onAddList(newTitle)">Add list</b-button>
            <div>
              <draggable>
            <div v-for="(board,index) in boards" :key="index">
               <b-container>  
              <b-row>
                <div class="board-container">
                  <div>{{board.boardTitle}}</div>
            <draggable v-for="card in board.cards" :key="card.id" group="people" >
              <div class="button">
        {{card.title}}<b-button v-on:click="showModal(card)">Show Modal</b-button>
        <b-button v-on:click="deleteModal(card)">Delete Modal</b-button>
        </div>
        </draggable>
            </div>
              </b-row>
              <div class="cardTitle">
        <b-form-input v-model="cardTitle" type="text" placeholder="cardTitle"/>
        </div>
        <div class="button"><b-button v-on:click="addModalButton(board.boardId)">Add Card</b-button></div>
            </b-container>
        </div>
        </draggable>
            </div>
        </div>
     <b-modal  size="lg" v-model="modal" @ok="handleOk">
              <modal ref="cardModal" v-bind:sendData="modalData" @add="addCard" @update="updateCard"/>
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
          cardTitle:"",
          modal:false,
            boards:[],
            card:{},
            modalData:{}
        }
    },
    created(){
if(this.$localStorage.get('boards')==undefined){
this.$localStorage.set('boards', this.boards)
  console.log(this.boards);
}else{
  this.boards=this.$localStorage.get('boards')
  console.log(this.boards);
}
   },
    methods:{
        onAddList:function(title){
         this.boards.push({boardTitle:title,cards:[]})
         this.storageSetBoards()
         console.log(this.boards);
        },
        addModalButton:function(boardId){
          var boardIndex = this.boards.findIndex(function(item){ return item.boardId === boardId; })
          var cardIndex=this.boards[boardIndex].cards.length;
          this.modalData={boardId:boardIndex,boardTitle:this.boards[boardIndex].boardTitle,id:cardIndex+1,title:"",content:"",timeLimit:""}
          this.modal=true
          // this.boards[boardIndex].cards.push({boardId:boardIndex,boardTitle:boardTitle,id:cardIndex+1,title:cardTitle,content:"",timeLimit:""})
          // this.storageSetBoards() 
        },
        showModal(items){
          console.log()
          this.modal=true
          this.modalData=items
        },
        deleteModal(items){
          console.log("deleteModal")
          var index = this.boards[items.boardId].cards.findIndex(function(item){ return item.id === items.id; })
          this.boards[items.boardId].cards.splice(index,1);
          this.storageSetBoards() 
        },
        handleOk(){
          console.log("Press Ok")
          console.log(this.modalData)
          if(this.modalData.title==""){
            this.$nextTick(() => {
              console.log("add")
            this.$refs.cardModal.add()
        })
        } else{
            console.log("update")
            this.$nextTick(() => {
            this.$refs.cardModal.update()
        })}     
        },
        addCard(modal){
          console.log("addCard")
          console.log(modal)
          console.log(this.boards[modal.boardId].cards[index])
           var index = this.boards[modal.boardId].cards.findIndex(function(item){ return item.id === modal.id; })
          this.boards[modal.boardId].cards.push({boardId:modal.boardId,boardTitle:modal.boardTitle,id:modal.id+1,title:modal.title,content:modal.content,timeLimit:""})
          this.storageSetBoards() 
        },
        updateCard(modal){
          console.log("updateCard")
          console.log(modal)
          console.log(this.boards[modal.boardId].cards[index])
           var index = this.boards[modal.boardId].cards.findIndex(function(item){ return item.id === modal.id; })
          this.boards[modal.boardId].cards[index].title=modal.title;
          this.boards[modal.boardId].cards[index].content=modal.content;
          this.storageSetBoards() 
        },
        storageSetBoards:function(){
          this.$localStorage.set('boards', this.boards);
        }, 
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
  .button{ 
    width: 150px;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;

  }
  .cardTitle{
    width: 100px;
  }

</style>