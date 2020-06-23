import { names } from './names'


const sumOfValues = (cards, name) => cards.filter(item => item[name]).reduce((acc, cur) => acc + cur[name], 0)

export const getValueByName = (cards, nameOfSearch, value) => {
    return cards.find(item => item.name === nameOfSearch)[value]
}

const getValueByValue = (cards, value) => {
    return cards.find(item => item[value] === value)[value]
}

export const clientsSum = cards => {
    return sumOfValues(cards, 'traffic_sum') * getValueByName(cards, 'Конверсия в регистрацию', 'indicator')
}

export const sumOfValuesByType = (cards, type) => cards.filter(item => item.type === type).reduce((acc, cur) => acc + cur.value, 0)



export const formulas = {
    pcostsum: {
        title: 'Постоянные расходы',
        value: cards => sumOfValuesByType(cards, names.types.pcost)
    },
    ac: {
        title: 'Маркетинговый бюджет',
        value: cards => cards.filter(item => item.type === names.types.traffic).reduce((acc, cur) => acc + cur.cpa * cur.traffic_sum, 0)
    },
    cogspercent: {
        title: 'Переменные проценты',
        value: cards => cards.filter(item => item.type === names.types.vcost).reduce((acc, cur) => {
            if (cur.vcostdeps === names.cogs.percent) {
                acc += cur.value
            }
            return acc
        }, 0)
    },
    cogsfix: {
        title: 'Переменные фикс',
        value: cards => cards.filter(item => item.type === names.types.vcost).reduce((acc, cur) => {
            console.log(cur.vcostdeps)
            if (cur.vcostdeps === names.cogs.sum) {
                acc += cur.value
            }
            return acc
        }, 0)
    },
    cogs: {
        title: 'Переменные',
        value: cards => cards.filter(item => item.type === names.types.traffic).reduce((acc, cur) => acc + cur.cpa * cur.traffic_sum, 0)
    },
    conversion: {
        title: 'Конверсия в покупку',
        value: cards => {
            let cardsWithKpi = cards.filter(item => item.type === names.types.kpi)

            if (cardsWithKpi.find(item => item.typeconversion === names.kpi.c1)) {
                return cards.find(item => item.typeconversion === names.kpi.c1).value
            }

            return cardsWithKpi.filter(item => item.typeconversion === names.kpi.c2).reduce((a, b) => a * b.value * 0.01, 1) 
        }
    },
    sumofclicks: {
        title: 'Количество кликов',
        value: cards => cards.filter(item => item.type === names.types.traffic).reduce((acc, cur) => acc + cur.traffic_sum, 0)
    },
    sumofclients: {
        title: 'Количество клиентов',
        value: cards => formulas.sumofclicks.value(cards) * formulas.conversion.value(cards)
    },
    revenue: {
        title: 'Итоговая выручка',
        value: cards => cards.filter(item => item.type === names.types.product).reduce((acc, cur) => {
            acc += cur.price * cur.share * 0.01 * cur.payments * formulas.sumofclients.value(cards)
            return acc
        }, 0)       
    },
    cac: {
        title: 'Стоимость привлечения клиента',
        value: cards => formulas.ac.value(cards) / formulas.sumofclients.value(cards)
    },
    vcostsum: {
        title: 'Переменные расходы вне стоимости',
        value: cards => cards.filter(item => item.type === names.types.product)
    },
}