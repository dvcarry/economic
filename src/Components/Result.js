import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { clientsSum, getValue, sumOfValuesByType, formulas } from '../Data/Formulas';
import { names } from './../Data/names'
import { getStateOfSumByType, getStateWithNewValue } from '../Data/Helpers';



export const Result = ({ cards }) => {

    // const initialData = [
    //     {
    //         type: 'revenue',
    //         title: 'Выручка',
    //         value: 0
    //     },
    //     {
    //         type: names.types.pcost,
    //         title: names.titles.pcost,
    //         value: 0
    //     },
    // ]

    const data = [
        // formulas.vcostsum, 
        formulas.pcostsum, 
        formulas.ac, 
        formulas.cogsfix, 
        formulas.conversion, 
        formulas.sumofclicks,
        formulas.sumofclients,
        formulas.revenue,
        // formulas.revenue,
    ]
    
    const initialData = data.map(item => {
        return {title: item.title, value: 0}
        })

    const [results, setResults] = useState(initialData)

    useEffect(() => {

        let newData = initialData

        if (cards.length > 0) {
            data.forEach(item => {
                newData = getStateWithNewValue(newData, item, cards)
            })            
            setResults(newData)  
        }
        
    }, [cards])

    return (
        <div className='results'>
            <List
                dataSource={results}
                renderItem={item => <List.Item><List.Item.Meta title={item.title} /><div>{item.value}</div></List.Item>}
            />
        </div>
    )
}