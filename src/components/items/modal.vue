<template>
<div>
 
  <h1>{{this.sendData.title}}</h1>
<b-form-input v-model="this.card.title" type="text" placeholder="title"/>
<b-form-input v-model="this.card.content" type="text" placeholder="title"/>

  </div>
</template>
<script>

export default {
  namd:'cardModal',
  props: ['sendData'],
   data:function(){
        return{
          title,
          card:{title:"",content:""}

    }
   },created(){
     this.title=this.boardTitle
     this.card.title=this.sendData.title
     this.card.content=this.sendData.content
   },
    methods:{
    hide() {
      this.$refs.modal.hide()
    },
    show() {
      console.log("modal show")
      console.log(this.sendData)
      //this.$emit("child",this.card)
      
    },
    update(){
      console.log("modal update")
      this.$emit("child",boardTitle,this.card)
    } 
    
    }
    
}
</script>