const { names } = require("./names")

export const calcErrors = cards => {
    if (cards.filter(item => item.type === names.types.product).length > 0 && cards.filter(item => item.type === names.types.product).reduce((a, b) => a + b.share, 0) !== 100) {
        return 'Доли продуктов не равны 100%'
    }
    return null
}