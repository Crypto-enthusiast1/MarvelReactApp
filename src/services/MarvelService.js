import useHttp from '../hooks/http.hook'

const useMarvelService = () => {

   const { loading, error, request, clearError } = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=e00523b13d7dc4415650fcb181018a25';
   const _offset = 210;

   const getAllHeroes = async (offset = _offset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_getObjectOfHeroes)
   }

   const getHeroById = async () => {
      const _getRandomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

      const newHero = await request(`${_apiBase}characters/${_getRandomId}?&${_apiKey}`)

      return _getObjectOfHeroes(newHero.data.results[0])
   }

   const getHeroWithComicsById = async (id) => {
      const hero = await request(`${_apiBase}characters/${id}?&${_apiKey}`)

      return _getObjectOfHeroes(hero.data.results[0])

   }

   const _getObjectOfHeroes = (res) => {

      return {
         name: res.name,
         description: res.description,
         thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
         homepage: res.urls[0].url,
         wiki: res.urls[1].url,
         id: res.id,
         comics: res.comics.items
      }


   }

   return { loading, error, clearError, request, getAllHeroes, getHeroById, getHeroWithComicsById }
}

export default useMarvelService; 