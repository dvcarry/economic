import React from 'react';
import { List } from 'antd';
import { clientsSum } from '../Data/Formulas';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export const Result = cards => {  
    
    return (
        <div>
            <List
                dataSource={data}
                renderItem={item => <List.Item><List.Item.Meta title={item}/><div>More</div></List.Item>}
            />
            <p>{clientsSum}</p>
        </div>
    )
}