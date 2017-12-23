<template>
 <panel title="Song MetaData">
   <v-layout>
        <v-flex xs6 >
           <div class="song-title">
               {{song.title}}
           </div>
          
           <div class="song-artist">
               {{song.artist}}
           </div>

           <div class="song-genre">
               {{song.genre}}
           </div>

           <v-btn 
              class="cyan" 
              dark
              :to="{
              name: 'song-edit',
              params () {
                return {
                 songId: song.id
                }                
               }
              }"
          >Edit Song</v-btn>
          <v-btn 
              v-if= "isUserLoggedIn && !bookmark"
              class="cyan" 
              dark
              @click="setAsBookmark"
          >Set As Bookmark</v-btn>
          <v-btn 
              v-if= "isUserLoggedIn && bookmark"
              class="cyan" 
              dark
              @click="unsetAsBookmark"
          >Unset As Bookmark</v-btn>
        </v-flex>
        
        <v-flex xs6 >
           <img class="album-image" :src="song.albumImageUrl"/>
           <br>
            {{song.album}}
        </v-flex>
    </v-layout>
 </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    try {
      this.bookmark = (await BookmarksService.index({
        songId: this.$store.state.route.params.songId,
        userId: this.$store.state.user.id
      })).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.$store.state.route.params.songId,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.song-title {
 font-size: 30px;
}

.song-artist {
 font-size: 24px;
}

.song-genre {
 font-size: 15px; 
}

.album-image {
  width: 70%;
  height: 70%;
  margin: 0 auto;
}
</style>
