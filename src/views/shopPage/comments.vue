<template>
  <div style="padding:10vw 20vw">
    <p >{{msgI}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg : '还没有写好...',
      msgI: '',
      flashI:'|'
    }
  },
  mounted(){
    var that = this;
    console.log(that.msg.length)
    let i = 0;
    var n = function(){
        that.msgI=that.msg.substring(0,i)+'|';
        if(i > that.msg.length)
            clearInterval(timer);
        i++;
    }
    var nn = function(){
        if(i >= that.msg.length){
            that.flashI = (i%2 ?'|':'' );
            that.msgI = that.msg + that.flashI;
            i++;
        }
    }
    var timer  = setInterval(n , 150);
    setInterval(nn,500);

  }
}
</script>

<style lang="stylus" scoped>
  
</style>