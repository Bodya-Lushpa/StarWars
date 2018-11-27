<template>
  <div id="app">
    <div class="mainWindow">
      <div class="header">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <img src="./img/Logo.png" alt="" class="logo">
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <ul class="mainWindowList">
              <li v-for="(num, index) in info.results"
                  v-bind:class="{ active: index === selected }" @click="selected = index">
                <router-link :to="'/Film/' + index" :films="info">
                  {{num.title}}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-8">
            <router-view v-bind:films="info"></router-view>
          </div>
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
      info: '',
      selected: null
    }
  },
  mounted() {
    this.axios.get('https://swapi.co/api/films').then(response => (this.info = response.data));
  }
}
</script>

<style lang="less">
  ul{
    display: block;
  }
  li{
    list-style-type: none;
  }
  .mainWindow{
    background: url("img/bgMain.jpg") center top no-repeat, #000;
    background-size: cover;
    min-height: 100vh;
    padding: 50px 0;
    padding-top: 0;
  }
  .header{
   background: rgba(0, 0, 0, 0.5);
    margin-bottom: 30px;
  }
  .logo{
    display: block;
    width: 200px;
    margin: 0 auto;
  }
  .mainWindowList {
    a {
      color: Gold;
      display: block;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 20px;
      line-height: 45px;
      transition: 0.3s;
      &:hover{
        color: #0000CD;
        text-decoration: none;
        margin-left: 5px;
      }
    }
    li.active a{
      color: #0000CD;
      margin-left: 10px;
    }
  }
  @media (max-width: 990px) {
    .mainWindowList{
      margin-bottom: 50px;
      padding-left: 0;
      text-align: center;
      a{
        font-weight: 700;
        font-size: 18px;
        line-height: 40px;
      }
    }
  }
</style>
