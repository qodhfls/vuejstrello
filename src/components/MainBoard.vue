<template>
    <div >
        <div class="board" style="position:absolute;left:500px;top:250px;height:500px; width:600px">
          Trello
            <b-form-input v-model="newTitle" type="text" style="position:relative;width:300px;" placeholder="listTitle"/>
            <b-button v-on:click="onAddList(newTitle)">Add list</b-button>
            <div>
              <draggable>
            <div v-for="(board,index) in boards" :key="index">
               <b-container>  
              <b-row>
                <div class="board-container">
                  <div>{{board.boardTitle}}</div>
            <draggable  group="people" >
              <div v-for="card in board.cards" :key="card.id">
              <div class="button">
        {{card.title}}<br>
        {{card.content}}<br>
        <b-button v-on:click="showModal(card)">Update</b-button><b-button v-on:click="deleteModal(card)">Delete</b-button>
        </div>
              </div>
        </draggable>
            </div>
              </b-row>
              <b-form inline>
        <div class="button"><b-button v-on:click="addModalButton(board.boardTitle)">Add Card</b-button></div>
        <div class="button"><b-button v-on:click="deleteList(board.boardTitle)">deleteList</b-button></div>
              </b-form>
            </b-container>
        </div>
        </draggable>
            </div>
        </div>
     <b-modal  id="cardModal" size="lg" v-model="modal" @ok="handleOk">
              <modal ref="cardModal" v-bind:sendData="modalData" @add="addCard" @update="updateCard"/>
    </b-modal> 
         <b-modal  id="alertModal" size="sm" v-model="alertModal" ok-only>
              <alertModal ref="alertModal" v-bind:alertMessage="alertMessage"/>
    </b-modal> 
    
    </div>   
</template>


<script>
import draggable from 'vuedraggable'
import modal from './items/modal'
import alertModal from './items/alertModal'

export default {
     components: {
            draggable,
            modal,
            alertModal
        },
    data:function(){
        return{
          newTitle:"",
          cardTitle:"",
          modal:false,
          alertModal:false,
            boards:[],
            card:{},
            modalData:{},
            alertMessage:""
        }
    },
    created(){
if(this.$localStorage.get('boards')==undefined){
this.$localStorage.set('boards', this.boards)
}else{
  this.boards=this.$localStorage.get('boards')
}
   },
    methods:{
        onAddList:function(boardTitle){
          var boardIndex = this.boards.findIndex(function(item){ return item.boardTitle === boardTitle; })

          if(boardTitle==""){
            this.alertMessage="no titlename"
            this.alertModal=true
            return 0;
          }

          if(boardIndex!=-1){
            this.alertMessage="already have title"
            this.alertModal=true
            return 0;
          }

         this.boards.push({boardTitle:boardTitle,cards:[]})
         this.storageSetBoards()
        },

        deleteList:function(boardTitle){
          var boardIndex = this.boards.findIndex(function(item){ return item.boardTitle === boardTitle; })
          this.boards.splice(boardIndex,1)
          this.storageSetBoards()
        },

        addModalButton:function(boardTitle){
          var boardIndex = this.boards.findIndex(function(item){ return item.boardTitle === boardTitle; })
          var cardIndex=this.boards[boardIndex].cards.length;
          this.modalData={boardId:boardIndex,boardTitle:this.boards[boardIndex].boardTitle,id:cardIndex+1,title:"",content:"",timeLimit:"",image:""}
          this.modal=true
        },

        showModal(items){
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
           var index = this.boards[modal.boardId].cards.findIndex(function(item){ return item.title === modal.title; })
            if(index!=-1){
            this.alertMessage="already have cardtitle"
            this.alertModal=true
            return 0;
          }
          this.boards[modal.boardId].cards.push({boardId:modal.boardId,boardTitle:modal.boardTitle,id:modal.id+1,title:modal.title,content:modal.content,timeLimit:"",image:modal.image})
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