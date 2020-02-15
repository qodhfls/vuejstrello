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
              <div>
        {{card.title}}<b-button v-on:click="showModal(card)">Show Modal</b-button>
        <b-button v-on:click="deleteModal(card)">Delete Modal</b-button>
        </div>
            </draggable>
            </div>
              </b-row>
        <b-form-input v-model="cardTitle" type="text" placeholder="cardTitle"/>
        <b-button v-on:click="addCard(cardTitle,board.boardTitle)">Add Card</b-button>
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
          cardTitle:"",
          modal:false,
            // boards:[{boardTitle:"Test",cards:[
            //     {boardId:0,boardTitle:"Test",id:0,
            //     title:"a",content:"1",timeLimit:""}
            //     ,{boardId:0,boardTitle:"Test",id:1,
            //     title:"b",content:"2",timeLimit:""}
            // ]},{boardTitle:"Test2",cards:[
            //     {boardId:1,boardTitle:"Test",id:0,
            //     title:"c",content:"3",timeLimit:""}
            //     ,{boardId:1,boardTitle:"Test2",id:1,
            //     title:"d",content:"5",timeLimit:""}
            //     ]
            // }
            boards:[],
            card:{},
            modalData:{},
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
          var boardTitleTmp=title
         this.boards.push({boardTitle:boardTitleTmp,cards:[]})
         console.log(this.boards);
        },
        addCard:function(cardTitle,boardTitle){
          var index = this.boards.findIndex(function(item){ return item.boardTitle === boardTitle; })
          var cardIndex=this.boards[index].cards.length;
          this.boards[index].cards.push({boardId:index,boardTitle:boardTitle,id:cardIndex+1,title:cardTitle,content:"",timeLimit:""})
          this.$localStorage.set('boards', this.boards);
          console.log(this.boards);
          
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
          console.log(modal.id)
          console.log(this.boards[modal.boardId].cards[index])
           var index = this.boards[modal.boardId].cards.findIndex(function(item){ return item.id === modal.id; })
          this.boards[modal.boardId].cards[index].title=modal.title;
          this.boards[modal.boardId].cards[index].content=modal.content;

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