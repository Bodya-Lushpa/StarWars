<template>
  <div>
    <h2 class="TitleFilm">{{ info.results[id].title }}</h2>
     <p class="DescriptionFilm">
       {{ info.results[id].opening_crawl }}
     </p>
    <p>
      {{ this.character }}
    </p>


  </div>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        info: "",
        people: "",
        character: [],
        i: 0
      }
    },
    mounted(){
      this.axios.get('https://swapi.co/api/films').then(response => (this.info = response.data));
    },
    watch: {
      id: function(){
        this.character = [];
        this.people = this.info.results[this.id].characters;
        for(this.i = 0; this.i < this.people.length; this.i++){
          this.axios.get(this.people[this.i]).then(response => (this.character[this.i] = response.data));
        }
        console.log(this.character);
      }
    }
  }
</script>
