


const sumOfValues = (cards, name) => cards.filter(item => item[name]).reduce((acc, cur) => acc + cur[name], 0)

export const getValueByName = (cards, nameOfSearch, value) => {
    // console.log(nameOfSearch)
    return cards.find(item => item.name === nameOfSearch)[value]
    
}

export const clientsSum = cards => {    
    return sumOfValues(cards, 'traffic_sum') * getValueByName(cards, 'Конверсия в регистрацию', 'indicator')
}


export const sumOfValuesByType = (cards, type) => cards.filter(item => item.type === type).reduce((acc, cur) => acc + cur.value, 0)

