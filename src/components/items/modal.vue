<template>
<div>
 
  <h1>{{this.sendData.title}}</h1>
<b-form-input v-model="this.sendData.title" type="text" placeholder="title"/>
<b-form-input v-model="this.sendData.content" type="text" placeholder="title"/>

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
      this.$emit("child",this.card)
      
    },
     handleOk(){
          
        } 
    
    }
    
}
</script>