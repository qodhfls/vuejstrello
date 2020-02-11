<template>
    <div >
        <div class="board">
            <!-- <b-form-input v-model="title" type="text" placeholder="title"/> -->
            
            <div v-for="(board,index) in boards" :key="index">
              <b-button v-on:click="onAddList(title)">Add list</b-button>
            <b-container>           
            <draggable >
              <b-row>
                <div class="board-container">
                  <div>{{board.boardTitle}}</div>
            <draggable v-for="card in board.Cards" :key="card.id" group="people" >
              <div>
        {{card.title}}<b-button v-on:click="showModal(card)">Show Modal</b-button>
        </div>
            </draggable>
            </div>
              </b-row>
            </draggable>
            </b-container>
             </div>
        </div>
     <b-modal  size="lg" v-model="modal" @ok="handleOk">
              <modal ref="cardModal" v-bind:sendData="modalData" @child="getData"/>
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
          modal:false,
            boards:[{boardTitle:"Test",Cards:[
                {id:1,
                title:"a",content:"1",timeLimit:""}
                ,{id:2,
                title:"b",content:"2",timeLimit:""}
            ]},{boardTitle:"Test2",Cards:[
                {id:1,
                title:"c",content:"3",timeLimit:""}
                ,{id:2,
                title:"d",content:"4",timeLimit:""}
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
          console.log(this.modalData)
          this.$nextTick(() => {
            this.$refs.cardModal.show()
        })
        },
        handleOk(){
          console.log("Press Ok")
          
        },
        getData(card){
          console.log("getDataFromChild")
          console.log(card.title)
          console.log(card.content)
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