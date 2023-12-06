import fs from 'fs'

import movieRecords from './movie-data'
import newGenreData from './genre-data'
import oldGenreData from './genre-data.old'

const genres = {
  old: oldGenreData.genres,
  new: newGenreData.data.genres
}

const findGenreName = (genreId: string) => {
  // console.log('- Find Ge/nre Name for ID: ', genreId)
  // console.log(genres.old.slice(0,5))

  const matchingRecord = genres.old.find(genreRecord => genreRecord.id === genreId)
  
  if (!matchingRecord) {
    throw new Error('no matching record: ' + genreId)
  }
  
  return matchingRecord.name
  
}

const genreFixed = movieRecords.records.map(record => {
  const genres = record.genres.map(genre => findGenreName(genre))

  return {
    ...record,
    genres
  }
})

const genreShifted = genreFixed.map(m => {
  // console.log('\n---' + m.title)
  const genreShifts = m.genres.map(g => {
    // console.log(g)

    let match = genres.new.find(gn => gn.name === g)

    if (g === 'Historical Drama' || g === 'Historical Fiction') {
      match = genres.new.find(gn => gn.name === 'Historical')
    }

    if (g === 'Super-Hero') {
      match = genres.new.find(gn => gn.name === 'Super Hero')
    }

    if (g === 'Documentary') {
      match = genres.new.find(gn => gn.name === 'Biographical')
    }

    if (!match) {
      throw new Error('no match for : ' + g)
    }

    const { id, level, name } = match

    return {
      id,
      level,
      name
    }
  });

  return {
    ...m,
    genres: genreShifts
  }
  // console.log(genres.new[0])
})

// genreShifted.forEach(record => {
//   console.log(record)
// })

try {
  fs.writeFileSync('./updated.json', JSON.stringify(genreShifted))
} catch (e) {
  console.log(e)
}
