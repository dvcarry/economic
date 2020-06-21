import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:3000/';

export const getItems = async () => {
    console.log('get')
    try {
        const { data } = await Axios.get('item')
        return data
    } catch (error) {
        console.log(error)
    }
}

export const addItem = async item => {
    console.log('put')
    try {
        const { data } = await Axios.post('item', item)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const editItem = async (cardId, fields) => {
    console.log('edit')
    try {
        const { data } = await Axios.put('item/' + cardId, fields)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteItem = async cardId => {
    console.log('delete')
    try {
        await Axios.delete('item/' + cardId)
        // return data
    } catch (error) {
        console.log(error)
    }
}


