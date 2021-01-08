const $scrollBox = document.querySelector('.scroll-box')
const $spinner = document.querySelector('.spinner-box')

let loading = false

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadCards()
      setTimeout(() => {
        observer.disconnect()
        observer.observe($spinner)
      }, 1000)
    }
  })
})

observer.observe($spinner)

async function loadCards() {
  if (loading) return
  loading = true
  const cards = await generateCards(10)
  cards.forEach((card, i) => {
    setTimeout(() => $scrollBox.insertBefore(card, $spinner), i * 100)
    if (i == cards.length - 1) {
      setTimeout(() => loading = false, i * 100)
    }
  })
}

async function generateCards(x = 10) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array(x).fill(0).map(() => {
        const $el = document.createElement('div')
        $el.className = 'item'
        $el.textContent = getRandomText()
        return $el
      }))
    }, 1000)
  })
}

function getRandomText() {
  const words = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","auctor","non","turpis","non","accumsan","cras","ac","vulputate","libero","dignissim","luctus","velit","nam","massa","nisi","mattis","ac","erat","a","volutpat","posuere","leo","pellentesque","id","purus","nisi","nunc","eget","sollicitudin","felis","ut","tempor","ligula","nunc","venenatis","lectus","sit","amet","mi","maximus","sed","fringilla","ipsum","convallis","nulla","feugiat","eros","ut","mattis","molestie","duis","scelerisque","molestie","ante","non","egestas","sed","et","lectus","feugiat","mi","iaculis","viverra","nulla","id","ipsum","sodales","lacinia","lacus","eu","molestie","est","nulla","in","mattis","sem","aenean","accumsan","sem","arcu","id","tincidunt","urna","consequat","a","aenean","posuere","elit","eu","faucibus","vestibulum","suspendisse","nec","dictum","orci","pellentesque","non","felis","at","urna","porttitor","faucibus","a","vel","massa"]
  const result = []
  const len = Math.floor(Math.random() * 15) + 5
  for (let i = 0; i < len; i += 1) {
    const index = Math.floor(Math.random() * words.length)
    const word = words.splice(index, 1)
    result.push(word)
  }
  return result.join(' ')
}
