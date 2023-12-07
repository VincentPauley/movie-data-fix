import fs from 'fs'

const records = fs.readFileSync('updated.json')

const { data } = JSON.parse(records.toString())

console.log(`Need to fix ${data.length} records.`)

const adjustRanking = (currentVal: number) => {
  switch(currentVal) {
    case 1:
      return 100;
    case 2:
      return 95;
    case 3:
      return 92;
    case 4:
      return 88;
    case 5:
      return 85;
    case 6:
      return 80;
    case 7:
      return 75;
    case 8:
      return 60;
    case 9:
      return 50;
    default:
      throw new Error('no match for : ' + currentVal)
  }
}

const modified = data.map((record: any) => {
  const { vinnieRanking, hollyRanking } = record

  let ratings: any[] = []

  if (vinnieRanking) {
    ratings.push({
      reviewer: 'vinnie',
      rating: adjustRanking(vinnieRanking)
    })
  }

  if (hollyRanking) {
    ratings.push({
      reviewer: 'holly',
      rating: adjustRanking(hollyRanking)
    })
  }

  const { title, year, rated, genres } = record

  const rankingsRecord = {
    title,
    year,
    rated,
    genres,
    ratings,
    synopsis: '',
    seasonality: [],
    directors: []
  }

  return rankingsRecord
});

try {
  fs.writeFileSync('./completed-records.json', JSON.stringify({ date: new Date().toISOString(), data: modified }))
} catch (e) {
  console.log(e)
}
