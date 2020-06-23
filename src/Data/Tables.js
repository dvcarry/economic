import { names } from './names'

export const dataTables = [
    {
        name: names.types.product,
        title: 'Продукт',
        desc: 'Указывается все продукты, которые могут быть ',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название продукта' },
            { name: 'price', type: 'number', label: 'Стоимость' },
            { name: 'share', type: 'percent', label: 'Доля от клиентов' },
            { name: 'payments', type: 'number', label: 'Среднее количество сделок на клиента' },
        ]
    },
    {
        name: names.types.kpi,
        title: 'Показатели',
        desc: 'Указывается все продукты, которые могут быть ',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название' },
            { name: 'typeconversion', type: 'select', typeofselect: 'kpi', label: 'Тип конверсии' },
            { name: 'value', type: 'percent', label: 'Значение' }
        ]
    },
    {
        name: names.types.traffic,
        title: 'Трафик',
        desc: 'Указывается все продукты, которые могут быть ',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название канала привлечения' },
            { name: 'cpa', type: 'number', label: 'Стоимость за клик' },
            { name: 'traffic_sum', type: 'number', label: 'Количество' },           
        ]
    },
    {
        name: names.types.vcost,
        title: 'Переменные расходы',
        desc: 'Указывается все продукты, которые могут быть ',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название' },
            { name: 'vcostdep', type: 'select', typeofselect: 'vcostdeps', label: 'От чего считается' },
            { name: 'vcostdeps', type: 'select', typeofselect: 'vcostdep', label: 'Измерение' },
            { name: 'value', type: 'number', label: 'Количество' },
        ]
    },
    {
        name: names.types.pcost,
        title: names.titles.pcost,
        desc: 'Указывается всеазывается все продукты, которые могу продукты, которые могут азывазывается все продукты, которые могуается все продукты, которые могубыть ',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название' },
            { name: 'value', type: 'number', label: 'Сумма за месяц' },
        ]
    }

]

export const selectValues = {
    kpi: [
        {name: 'Единая конверсия в покупку', value: 'C1' },
        {name: 'Составная конверсия в покупку', value: 'C2' },
    ],
    vcostdep: [
        {name: 'проценты', value: 'percent'},
        {name: 'сумма', value: 'number'},
    ],
    vcostdeps: [
        {name: 'выручка', value: 'revenu'},
        {name: 'заказ', value: 'order'},
        {name: 'лид', value: 'lead'},
    ],
}

export const tablesForTabs = dataTables.filter(item => item.status)

export const tablesNames = dataTables.reduce((acc, item) => (acc[item.name] = item.name, acc), {})
