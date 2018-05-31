import Firebase from 'firebase/app'
import 'firebase/database'

Firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com'
})

const api = Firebase.database().ref('/v0')

function fetch (child) {
  console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        console.log(`fetched ${child}.`)
        console.log(val)
        resolve(val)
      }, reject)
    })
  }
}

function fakeFetchListData (type) {
  var data = []
  var count = type !== 'top' ? type !== 'new' ? type !== 'show' ? type !== 'ask' ? type !== 'job' ? 130 : 310 : 250 : 370 : 190 : 110
  for (var i = 1; i <= count; i++) {
    data.push({
      by: 'author' + i,
      descendants: 28,
      id: 17175634 + i,
      score: i,
      title: type + ' title ' + i,
      type: 'story ' + i,
      url: `https://www.theatlantic.com/health/archive/2017/11/url${i}/545786/?single_page=true`
    })
  }
  console.log(data)
  return Promise.resolve(data)
}

export function fetchListData (type) {
  return fakeFetchListData(type)
  // return fetchIdsByType(type)
  //   .then((ids) => fetchItems(ids))
}

export function fetchIdsByType (type) {
  return api.cachedIds && api.cachedIds[type] ? Promise.resolve(api.cachedIds[type]) : fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
