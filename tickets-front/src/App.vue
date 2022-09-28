<template>
<h1>Call API</h1>
<p v-for="item in list" :key="item.id">
{{item.name}} --- {{item.price}} --- {{item.cast}}
</p>
</template>

<script>
import axios from "axios"
export default {
  name: "App",
  data()
  {
    return {
      list:[]
    }
  },
  async mounted()
  {
    let result = await axios.get("http://localhost:8080/tickets");
    console.warn(result.data.data)
    this.list=result.data
  }
};
</script>