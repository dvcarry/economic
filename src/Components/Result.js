import React, { useState, useEffect } from 'react';
import { List, Tabs } from 'antd';
import { clientsSum, getValue, sumOfValuesByType, formulas } from '../Data/Formulas';
import { names } from './../Data/names'
import { getStateOfSumByType, getStateWithNewValue } from '../Data/Helpers';

const { TabPane } = Tabs;

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
        formulas.conversion,
        formulas.sumofclicks,
        formulas.sumofclients,
        formulas.revenue,
        formulas.cac,
        formulas.cogs,
        formulas.sumoforders,
        formulas.revenuefirstorder,
        formulas.gross,
        formulas.averageorder,
        formulas.revenueperclient,
        formulas.cogsperclient,
        formulas.arpc,

    ]

    const array = [
        {
            title: 'Юнит-экономика',
            name: 'unit',
            fields: [
                names.formulas.revenueperclient,
                names.formulas.cac,
                names.formulas.cogsperclient,
                names.formulas.arpc,
                names.formulas.sumofclients,
                names.formulas.conversion,
            ]
        },
        {
            title: 'ОПУ',
            name: 'opu',
            fields: [
                names.formulas.revenue,
                names.formulas.cogs,
                names.formulas.ac,
                names.formulas.gross,
                // names.formulas.revenue,

            ]
        }
    ]

    const initialData = data.map(item => {
        return { title: item.title, value: 0 }
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

    console.log({results})

    return (
        <div className='results'>
            <Tabs>
                {/* <List
                    dataSource={results}
                    renderItem={item => <List.Item><List.Item.Meta title={item.title} /><div>{item.value}</div></List.Item>}
                /> */}


                {
                    array.map(item => (
                        <TabPane tab={item.title} key={item.name}>
                            <List
                                dataSource={item.fields}
                                // renderItem={el => <List.Item><List.Item.Meta title={el} /><div>{results.find(result => result.title === el).value}</div></List.Item>}                               

                                renderItem={el => <List.Item><List.Item.Meta title={el} /><div>{
                                    results.find(result => {                                
                                    return result.title === el
                                }).value.toLocaleString('ru')
                                }</div></List.Item>}
                            />
                        </TabPane>
                    ))
                }

            </Tabs>

        </div>
    )
}