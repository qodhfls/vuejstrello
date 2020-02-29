<template>
<div>
  <h3>{{this.Message}}</h3>
  </div>
</template>
<script>

export default {
  namd:'alertModal',
  props: ['alertMessage'],
   data:function(){
        return{
          Message:""
    }
   },created(){
       this.Message=this.alertMessage
   }
}
</script>