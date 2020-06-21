


const sumOfValues = (cards, name) => cards.filter(item => item[name]).reduce((acc, cur) => acc + cur[name], 0)

const getValue = (cards, nameOfSearch, value) => {
    return cards.find(item => item[nameOfSearch])[value]
}

export const clientsSum = cards => {
    return sumOfValues(cards, 'traffic_sum') * getValue(cards, 'C1', 'indicator')
}