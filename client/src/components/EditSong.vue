<template>
 <v-layout>
    <v-flex xs6 >
      <panel title="Songs MetaData">
        <div>
         <v-text-field
            label="Title"
            required
            :rules="[required]"
            v-model="song.title"
         ></v-text-field>

         <v-text-field
            label="Artist"
            required
            :rules="[required]"
            v-model="song.artist"
         ></v-text-field>

         <v-text-field
            label="Genre"
            required
            :rules="[required]"
            v-model="song.genre"
         ></v-text-field>

         <v-text-field
            label="Album"
            required
            :rules="[required]"
            v-model="song.album"
         ></v-text-field>

         <v-text-field
            label="Album Image Url"
            required
            :rules="[required]"
            v-model="song.albumImageUrl"
         ></v-text-field>

         <v-text-field
            label="Youtube Id"
            required
            :rules="[required]"
            v-model="song.youtubeId"
         ></v-text-field>
        </div>
      </panel>
    </v-flex>

    <v-flex xs8>
     <panel title="Songs Structure" class="ml-2">
         <v-text-field
            label="Lyrics"
            required
            :rules="[required]"
            multiLine
            v-model="song.lyrics"
         ></v-text-field>

         <v-text-field
            label="Tab"
            required
            :rules="[required]"
            multiLine
            v-model="song.tab"
         ></v-text-field>        
     </panel>
      <span class="error-msg" v-if="error">
        {{error}}
      </span>
      <div class="mt-2">
        <v-btn class="cyan" @click="save" dark>Save Song</v-btn>
      </div>
    </v-flex>
 </v-layout>
</template>

<<script>
import SongService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please Fill in all the required fields!'
        return
      }
      const songId = this.$store.state.route.params.songId
      try {
        await SongService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
.error-msg {
   color: red
}
</style>
