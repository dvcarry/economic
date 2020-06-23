const sumOfValues = (cards, name) => cards.filter(item => item[name]).reduce((acc, cur) => acc + cur[name], 0)

export const clientsSum = cards => {    
    return sumOfValues(cards, 'traffic_sum') * getValueByName(cards, 'Конверсия в регистрацию', 'indicator')
}

export const sumOfValuesByType = (cards, type) => {
    console.log('sum', cards, type)
    return cards.filter(item => item.type === type).reduce((acc, cur) => acc + cur.value, 0)
}

export const getValueByName = (cards, nameOfSearch, value) => {
    return cards.find(item => item.name === nameOfSearch)[value]    
}

export const fieldsToItem = fields => {
    let result = {}
    fields.forEach(item => {
        result[item.name[0]] = item.value
    })
    return result
}

export const itemToFields = item => {
    const result = []
    for (let key in item) {
      result.push({name: [key], value: item[key]})
    } 
    return result
}

export const getStateOfSumByType = (results, cards, type) => {
    return results.map(item => item.type === type ? {...item, value: sumOfValuesByType(cards, type)} : item)
}

export const getStateWithNewValue = (state, el, cards) => {
    return state.map(item => item.title === el.title ? {...item, value: el.value(cards)} : item)
}