<template>
<div>
 
  <h1>{{this.card.title}}</h1>
<b-form-input v-model="card.title" type="text" placeholder="title"/>
<b-form-input v-model="card.content" type="text" placeholder="content"/>

  </div>
</template>
<script>

export default {
  namd:'cardModal',
  props: ['sendData'],
   data:function(){
        return{
          card:{}
    }
   },created(){
     if(this.sendData.title==""){
     this.card.boardId=this.sendData.boardId
     this.card.boardTitle=this.sendData.boardTitle
     this.card.id=this.sendData.id
     this.card.title=""
     this.card.content=""
     }else if(this.sendData!=null){
     this.card.boardId=this.sendData.boardId
     this.card.boardTitle=this.sendData.boardTitle
     this.card.id=this.sendData.id;
     this.card.title=this.sendData.title
     this.card.content=this.sendData.content
     }
   },
    methods:{
    hide() {
      this.$refs.modal.hide()
    },
    show() {
    },
    update(){
      console.log("modal update")
      this.$emit("update",this.card)
    },
    add(){
      console.log("modal add")
      console.log(this.card)
      this.$emit("add",this.card)
    } 
    
    }
    
}
</script>