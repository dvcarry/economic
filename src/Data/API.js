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


