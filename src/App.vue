<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <li v-for="(num, index) in info.results">
            <router-link :to="'/Film/' + index">
              {{num.title}}
            </router-link>
          </li>
        </div>
        <div class="col-md-8">
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      info: ''
    }
  },
  mounted() {
    this.axios.get('https://swapi.co/api/films').then(response => (this.info = response.data));
  }
}
</script>

<style>

</style>
