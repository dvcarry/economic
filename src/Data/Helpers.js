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