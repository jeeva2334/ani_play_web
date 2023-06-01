import axios from "axios"

const topAnime = `
query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(
        type: ANIME
        status: RELEASING
        sort: POPULARITY_DESC
      ) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
        status
        episodes
        description(asHtml: false)
        averageScore
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

const trending = `
query {
    Page(page: 1, perPage: 10) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
          extraLarge
        }
        trending
      }
    }
  }
`

const fetchImgBanner = `
query ($search: String) {
  Page {
    media(search: $search, type: ANIME) {
      id
      bannerImage
    }
  }
}
`

export const topSeasonal = async() => {
    try {
        const response = await axios.post('https://graphql.anilist.co', {
            query: topAnime,
            variables: {
                page: 1,
                perPage: 7
            }
        });
        const data = response.data.data.Page.media;
        return data;
    } catch (error) {
        console.error('error:', error);
        return null;
    }
}

export const topTrending = async() => {
    try {
      const response = await axios.post('https://graphql.anilist.co', {
          query: trending,
          variables: {
              page: 1,
              perPage: 7
          }
      });
      const data = response.data.data.Page.media;
      return data;
    } catch (error) {
      console.error('error:', error);
      return null;
    }
}

export const todayRelease = async(page) =>{
  try {
    const res1 = await axios("https://api.consumet.org/anime/gogoanime/recent-episodes?page="+1);
    const res2 = await axios("https://api.consumet.org/anime/gogoanime/recent-episodes?page="+2);
    const res3 = await axios("https://api.consumet.org/anime/gogoanime/recent-episodes?page="+3);
    const data1 = res1.data.results.map((item) => ({ episodeId: item.episodeId, id: item.id, image: item.image, title: item.title, episodeNumber: item.episodeNumber }));
    const data2 = res2.data.results.map((item) => ({ episodeId: item.episodeId, id: item.id, image: item.image, title: item.title, episodeNumber: item.episodeNumber }));
    const data3 = res3.data.results.map((item) => ({ episodeId: item.episodeId, id: item.id, image: item.image, title: item.title, episodeNumber: item.episodeNumber }));
    const nested =  [data1,data2,data3];
    return [].concat(...nested);
  } catch (error) {
    console.error('error:', error);
    return null;
  }
}

export const popular = async() => {
  try {
    const {data} = await axios.get('https://webdis-gtio.onrender.com/popular?page=1');
    const spliced = data.splice(0,6);
    return spliced
  } catch (error) {
    console.log(err);
  }
}

export const fetchDetails = async(id,setEpisodes) =>{
  try {
    const {data} = await axios.get(`https://api.consumet.org/anime/gogoanime/info/${id}`);
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchBanner = async(searchS) =>{
  try {
    const response = await axios.post('https://graphql.anilist.co', {
            query: fetchImgBanner,
            variables: {
              search:searchS
            }
      });
    const data = response.data.data.Page.media[0];
    return data
  } catch (error) {
    console.log(error);
  }
}

export const videoPlay = async(id) =>{
  try {
    const {data} = await axios.get("https://api.consumet.org/anime/gogoanime/watch/"+id);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const moreSearch = async(s) =>{
  try {
    if(s === "top-airing"){
      const res1 = await axios.get("https://api.consumet.org/anime/gogoanime/"+s+"?page="+1);
      const res2 = await axios.get("https://api.consumet.org/anime/gogoanime/"+s+"?page="+2);
      const res3 = await axios.get("https://api.consumet.org/anime/gogoanime/"+s+"?page="+3);
      const data1 = res1.data.results.map((item) => ({ title: item.title, id: item.id, image: item.image }));
      const data2 = res2.data.results.map((item) => ({ title: item.title, id: item.id, image: item.image }));
      const data3 = res3.data.results.map((item) => ({ title: item.title, id: item.id, image: item.image }));
      const nested =  [data1,data2,data3];
      return [].concat(...nested)
    }else if (s === "anime-movies") {
      console.log("anime")
      const res1 = await axios.get("https://webdis-gtio.onrender.com/"+s+"?page="+1);
      const res2 = await axios.get("https://webdis-gtio.onrender.com/"+s+"?page="+2);
      const res3 = await axios.get("https://webdis-gtio.onrender.com/"+s+"?page="+3);
      console.log(res1.data)
      const data1 = res1.data.map((item) => ({ title: item.animeTitle, id: item.animeId, image: item.animeImg,releasedDate: item.releasedDate }));
      const data2 = res2.data.map((item) => ({ title: item.animeTitle, id: item.animeId, image: item.animeImg,releasedDate: item.releasedDate }));
      const data3 = res3.data.map((item) => ({ title: item.animeTitle, id: item.animeId, image: item.animeImg,releasedDate: item.releasedDate }));
      const nested =  [data1,data2,data3];
      console.log([].concat(...nested))
      return [].concat(...nested)
    }
  } catch (error) {
    console.log(error)
  }
}

export const search = async(searc) =>{
  try {
    const {data} = await axios.get("https://api.consumet.org/anime/gogoanime/"+searc+"?page=1");
    return data
  } catch (error) {
    console.log(error)
  }
}