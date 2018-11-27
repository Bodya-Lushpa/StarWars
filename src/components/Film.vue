<template>
  <div class="componentFilm">
    <h2 class="TitleFilm">{{ films.results[id].title }}</h2>
    <p class="DescriptionFilm">
      {{ films.results[id].opening_crawl }}
    </p>
    <div class="row">
      <div class="col-md-4">
        <p class="titleDesc">Character:</p>
        <ul class="listDesc">
          <li v-for="characterItem of this.characters">- {{ characterItem.name }}</li>
        </ul>
      </div>
      <div class="col-md-4">
        <p class="titleDesc">Planets:</p>
        <ul class="listDesc">
          <li v-for="planetsItem of this.planets">- {{ planetsItem.name }}</li>
        </ul>
      </div>
      <div class="col-md-4">
        <p class="titleDesc">Starships:</p>
        <ul class="listDesc">
          <li v-for="starshipsItem of this.starships">- {{ starshipsItem.name }}</li>
        </ul>
      </div>
    </div>

    <p class="reviewTitle">Reviews:</p>
    <ul class="reviewList">
      <li v-for="review of this.reviews[id]">
        <h4>Name: {{ review.name }}</h4>
        <hr>
        <p>{{ review.reviews }}</p>
      </li>
    </ul>

    <h5 class="reviewTitleForm">Leave your feedback</h5>
    <form v-on:submit="writeReviewData(nameReviews, textReview, $event)" class="reviewForm">
      <span>{{ nameErrors }}</span>
      <input type="text" name="name" placeholder="Enter your name" v-model.lazy="nameReviews">
      <span>{{ textErrors }}</span>
      <textarea name="" id="" cols="30" rows="10" placeholder="Your comment" v-model.trim="textReview"></textarea>
      <button>To add</button>
    </form>

  </div>
</template>

<script>
  import * as Firebase from 'firebase'

  export default {
    props: ['id', 'films'],
    data () {
      return {
        peopleFilm: "",
        characters: [],
        planetsFilm: '',
        planets: '',
        starshipsFilm: '',
        starships: '',
        reviews: '',
        reviewsKol: 0,
        nameReviews: '',
        textReview: '',
        nameErrors: '',
        textErrors: ''
      }
    },
    methods: {
      writeReviewData(name, review, e) {
        e.preventDefault();
        this.nameErrors = '';
        this.textErrors = '';
        if(name && review){
          Firebase.database().ref('reviews/' + this.id + '/' + this.reviewsKol).set({
            name: name,
            reviews: review
          });
          this.downloadReviewData();
          this.nameReviews = '';
          this.textReview = '';
        }else{
          if (!name){
            this.nameErrors = 'Enter your name!';
          }
          if(!review){
            this.textErrors = 'Enter your comment!';
          }
        }
      },
      downloadReviewData(){
        Firebase.database().ref('reviews').once('value').then(response =>{
          this.reviews = response.val();
          try{
            this.reviewsKol = this.reviews[this.id].length;
          } catch (err) {
            this.reviewsKol = 0;
          }
        });
      },
      charactersMethods() {
        this.characters = [];
        this.peopleFilm = this.films.results[this.id].characters;
        for(this.i = 0; this.i < this.peopleFilm.length; this.i++){
          this.axios.get(this.peopleFilm[this.i]).then(response => (this.characters.push(response.data)));
        }
      },
      planetsMethods(){
        this.planets = [];
        this.planetsFilm = this.films.results[this.id].planets;
        for(this.i = 0; this.i < this.planetsFilm.length; this.i++){
          this.axios.get(this.planetsFilm[this.i]).then(response => (this.planets.push(response.data)));
        }
      },
      starshipsMethods(){
        this.starships = [];
        this.starshipsFilm = this.films.results[this.id].starships;
        for(this.i = 0; this.i < this.starshipsFilm.length; this.i++){
          this.axios.get(this.starshipsFilm[this.i]).then(response => (this.starships.push(response.data)));
        }
      }
    },
    mounted(){
      this.charactersMethods();
      this.planetsMethods();
      this.starshipsMethods();
      this.downloadReviewData();
    },
    watch: {
      id: function(){
        this.charactersMethods();
        this.planetsMethods();
        this.starshipsMethods();
        this.downloadReviewData();
      }
    }
  }
</script>

<style lang="less">
  .componentFilm{
    color: #fff;
  }
  .TitleFilm{
    margin-bottom: 40px;
  }
  .DescriptionFilm{
    margin-bottom: 60px;
  }
  .titleDesc{
    font-size: 20px;
    font-weight: 500;
    color: #F0E68C;
  }
  .reviewTitle{
    .titleDesc;
  }
  .listDesc{
    padding-left: 15px;
    li{
      line-height: 30px;
    }
  }
  .reviewList{
    padding-left: 20px;
    li{
      background: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      padding: 10px 30px;
      margin-bottom: 15px;
      width: 90%;
      hr{
        background: #fff;
      }
    }
  }
  .reviewTitleForm{
    margin-top: 50px;
    margin-bottom: 20px;
    font-size: 18px;
  }
  .reviewForm{
    width: 450px;
    display: block;
    input{
      background: rgba(255, 255, 255, 0.15);
      border: none;
      display: block;
      width: 100%;
      margin-bottom: 10px;
      line-height: 50px;
      border-radius: 5px;
      padding-left: 30px;
      color: #fff;
    }
    textarea{
      background: rgba(255, 255, 255, 0.15);
      border: none;
      resize: none;
      width: 100%;
      border-radius: 5px;
      padding-left: 30px;
      padding-right: 30px;
      height: 200px;
      padding-top: 15px;
      color: #fff;
    }
    span{
      color: #FF6347;
      margin-bottom: 5px;
      display: block;
      font-size: 14px;
    }
    button{
      width: 100%;
      display: block;
      background: #FFFF00;
      color: #000;
      border: 0;
      border-radius: 5px;
      line-height: 45px;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 500;
      margin-top: 15px;
      transition: 0.3s;

      background: rgba(255,255,0,1);
      background: -moz-linear-gradient(top, rgba(255,255,0,1) 0%, rgba(255,217,0,1) 100%);
      background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,0,1)), color-stop(100%, rgba(255,217,0,1)));
      background: -webkit-linear-gradient(top, rgba(255,255,0,1) 0%, rgba(255,217,0,1) 100%);
      background: -o-linear-gradient(top, rgba(255,255,0,1) 0%, rgba(255,217,0,1) 100%);
      background: -ms-linear-gradient(top, rgba(255,255,0,1) 0%, rgba(255,217,0,1) 100%);
      background: linear-gradient(to bottom, rgba(255,255,0,1) 0%, rgba(255,217,0,1) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffff00', endColorstr='#ffd900', GradientType=0 );
      -webkit-box-shadow: 0px 0px 16px 0px rgba(255,215,0,1);
      -moz-box-shadow: 0px 0px 16px 0px rgba(255,215,0,1);
      box-shadow: 0px 0px 16px 0px rgba(255,215,0,1);
    }
    button:hover{
      -webkit-box-shadow: 0px 0px 36px 0px rgba(255,215,0,1);
      -moz-box-shadow: 0px 0px 36px 0px rgba(255,215,0,1);
      box-shadow: 0px 0px 36px 0px rgba(255,215,0,1);
    }
  }
  @media (max-width: 990px) {
    .reviewForm{
      width: 100%;
    }
  }
</style>
