import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { clientsSum, getValue, sumOfValuesByType } from '../Data/Formulas';
import { names } from './../Data/names'



export const Result = ({ cards }) => {

    // const initialData = [
    //     { text: 'Выручка общая', value: '1111' },
    //     { text: 'Japanese princess to wed commoner..', value: '2222' },
    //     { text: 'Australian walks 100km after outback crash.', value: '333' },
    //     { text: 'Man charged over missing wedding girl.', value: '444' },
    //     { text: 'Los Angeles battles huge wildfires.', value: '5' },
    // ];

    const initialData = [
        {
            name: 'revenue',
            title: 'Выручка',
            value: 0
        },
        {
            name: 'Все затраты',
            title: 'Все затраты',
            value: 0
        },
    ]


    // const [state, setState] = useState({ product: false, traffic: false, kpi: false, pcost: false, vcost: false })
    const [data, setData] = useState(initialData)


    useEffect(() => {

        let newData = []

        if (cards.length > 0) {
            console.log('data', data)
            
            if (cards.find(item => item.name === names.kpi.c1)) {
                // newData = data.map(item => item.title === 'Выручка' ? {...item, value: clientsSum(cards)} : item)     

                newData = data.map(item => {

                    switch (item.title) {
                        case 'Выручка':
                            return {...item, value: clientsSum(cards)}
                            break;
                        case 'Выручка':
                            return {...item, value: sumOfValuesByType(cards, 'pcost')}
                            break;
                    
                        default:
                            break;
                    }

                    // item.title === 'Выручка' ? {...item, value: clientsSum(cards)} : item
                })     
            }
            newData
            
        }

        // setData(newData)  
    }, [cards])
    console.log(cards)




    // const calcState = cards => {

    //     const newState = {}

        // console.log({cards})

    //     cards.forEach(item => {
    //         switch (item.type) {
    //             case 'product':
    //                 newState.product = true
    //                 break;
    //             case 'kpi':
    //                 newState.kpi = true
    //                 break;
    //             case 'vcost':
    //                 newState.vcost = true
    //                 break;
    //             case 'pcost':
    //                 newState.pcost = true
    //                 break;
    //             default:
    //                 break;
    //         }
    //     })

    //     // console.log('new state', newState)

    //     setState({ newState })

    // }


    // useEffect(() => {
    //     console.log('cards in use', cards)
    //     if (cards) {
    //         calcState(cards)
    //     }
    // }, [])


    // console.log(state)
    // console.log('cards in render', cards)



    return (
        <div className='results'>
            <List
                dataSource={data}
                renderItem={item => <List.Item><List.Item.Meta title={item.title} /><div>{item.value}</div></List.Item>}
            />
        </div>
    )
}