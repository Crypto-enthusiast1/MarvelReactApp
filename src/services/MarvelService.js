import { Component } from "react";

class MarvelService extends Component {

   _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   _apiKey = 'apikey=e00523b13d7dc4415650fcb181018a25'

   getResource = async (url) => {
      let res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`)
      }

      return await res.json();
   }

   getAllHeroes = async () => {
      const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
      return res.data.results.map(this._getObjectOfHeroes)
   }

   getHeroById = async () => {
      const _getRandomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

      const newHero = await this.getResource(`${this._apiBase}characters/${_getRandomId}?&${this._apiKey}`)

      return this._transformHero(newHero)
   }

   _getObjectOfHeroes = (res) => {

      return {
         name: res.name,
         description: res.description,
         thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
         homepage: res.urls[0].url,
         wiki: res.urls[1].url
      }
   }
   _transformHero = (res) => {
      return {
         name: res.data.results[0].name,
         description: res.data.results[0].description,
         thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
         homepage: res.data.results[0].urls[0].url,
         wiki: res.data.results[0].urls[1].url
      }
   }
}

export default MarvelService; 