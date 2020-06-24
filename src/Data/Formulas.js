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
        value: cards => cards.filter(item => item.type === names.types.pcost).reduce((acc, cur) => acc + cur.value, 0)
    },
    ac: {
        title: 'Маркетинговый бюджет',
        value: cards => cards.filter(item => item.type === names.types.traffic).reduce((acc, cur) => acc + cur.cpa * cur.traffic_sum, 0)
    },
    // cogspercent: {
    //     title: 'Переменные проценты',
    //     value: cards => cards.filter(item => item.type === names.types.vcost).reduce((acc, cur) => {
    //         if (cur.vcostdeps === names.cogs.percent) {                
    //             acc += cur.value * formulas.revenue.value(cards) * 0.01
    //         }
    //         return acc
    //     }, 0)
    // },
    // cogsfix: {
    //     title: 'Переменные фикс',
    //     value: cards => cards.filter(item => item.type === names.types.vcost).reduce((acc, cur) => {
    //         console.log(cur.vcostdeps)
    //         if (cur.vcostdeps === names.cogs.sum) {
    //             acc += cur.value
    //         }
    //         return acc
    //     }, 0)
    // },

    cogs: {
        title: 'Переменные затраты',
        desc: 'Это разные затраты',
        value: cards => cards.filter(item => item.type === names.types.vcost).reduce((acc, cur) => {
            switch (cur.vcostdep) {
                case names.cogs.percent:
                    acc += cur.value * formulas.revenue.value(cards) * 0.01
                    break;
                case names.cogs.sum:
                    acc += cur.value * formulas.sumoforders.value(cards)
                    break;
                case names.cogs.sumfirstorder:
                    acc += cur.value * formulas.sumofclients.value(cards)
                    break;
                case names.cogs.percenfirstorder:
                    acc += cur.value * formulas.revenuefirstorder.value(cards) * 0.01
                    break;            
                default:
                    break;
            }         
            return Math.round(acc)
        }, 0)
    },

    conversion: {
        title: 'Конверсия в покупку',
        value: cards => {
            let cardsWithKpi = cards.filter(item => item.type === names.types.kpi)

            if (cardsWithKpi.find(item => item.typeconversion === names.kpi.c1)) {
                return cards.find(item => item.typeconversion === names.kpi.c1).percent
            }

            if (cardsWithKpi.filter(item => item.typeconversion === names.kpi.c2).length > 0) {
                return cardsWithKpi.filter(item => item.typeconversion === names.kpi.c2).reduce((a, b) => a * b.percent * 0.01, 1)
            }

            // return 'нет данных'
             
        }
    },
    sumofclicks: {
        title: 'Количество кликов',
        value: cards => cards.filter(item => item.type === names.types.traffic).reduce((acc, cur) => acc + cur.traffic_sum, 0)
    },
    sumofclients: {
        title: 'Количество клиентов',
        value: cards => formulas.sumofclicks.value(cards) * formulas.conversion.value(cards) * 0.01
    },
    sumoforders: {
        title: 'Количество сделок',
        value: cards => cards.filter(item => item.type === names.types.product).reduce((acc, cur) => {
            acc += cur.share * 0.01 * cur.payments * formulas.sumofclients.value(cards)
            return acc
        }, 0)   
    },
    revenue: {
        title: 'Итоговая выручка',
        value: cards => cards.filter(item => item.type === names.types.product).reduce((acc, cur) => {
            acc += cur.price * cur.share * 0.01 * cur.payments * formulas.sumofclients.value(cards)
            return Math.round(acc)
        }, 0)       
    },
    revenuefirstorder: {
        title: 'Выручка от первого заказа',
        value: cards => cards.filter(item => item.type === names.types.product).reduce((acc, cur) => {
            acc += cur.price * cur.share * 0.01 * formulas.sumofclients.value(cards)
            return acc
        }, 0)       
    },
    cac: {
        title: 'Стоимость привлечения клиента',
        value: cards => Math.round(formulas.ac.value(cards) / formulas.sumofclients.value(cards))
    },
    gross: {
        title: 'Валовая прибыль',
        value: cards => Math.round(formulas.revenue.value(cards) - formulas.ac.value(cards) - formulas.cogs.value(cards))
    },
    averageorder: {
        title: names.formulas.averageorder,
        value: cards => formulas.revenue.value(cards) / formulas.sumoforders.value(cards)
    },
    revenueperclient: {
        title: names.formulas.revenueperclient,
        desc: 'Это разные затраты',
        value: cards => Math.round(formulas.revenue.value(cards) / formulas.sumofclients.value(cards))
    },
    cogsperclient: {
        title: names.formulas.cogsperclient,
        value: cards => Math.round(formulas.cogs.value(cards) / formulas.sumofclients.value(cards))
    },
    arpc: {
        title: names.formulas.arpc,
        value: cards => formulas.revenueperclient.value(cards) - formulas.cogsperclient.value(cards) - formulas.cac.value(cards)
    },
}