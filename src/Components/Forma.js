import React, { useEffect } from 'react'
import { Form, Input, Select, InputNumber, Button } from 'antd'
import { dataTables, selectValues } from '../Data/Tables'
const { Option } = Select;

export const Forma = ({ type, onChange, fields, modal }) => {

    const [form] = Form.useForm()

    let inputFields = null
    if (type) {
        inputFields = dataTables
            .filter(item => item.name === type)[0]
            .fields
            .map(item => {

                let inside

                switch (item.type) {
                    case 'input':
                        inside = (
                            <Input
                                name={item.name}
                                size='large'
                                allowClear
                            />
                        )
                        break;
                    case 'currency':
                        inside = (
                            <Select>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        )
                        break;
                    case 'select':
                        const options = selectValues[item.typeofselect].map(item => {
                            return (
                                <Option key={item.value} value={item.name}>{item.name}</Option>
                            )
                        })

                        inside = (
                            <Select
                                size='large'
                            >
                                {options}
                            </Select>
                        )
                        break;
                    case 'number':
                        inside = (
                            <InputNumber
                                type='number'
                                size="large"
                                style={{ width: 150 }}
                                min={0}
                                name={item.name}
                            // placeholder={item.placeholder}
                            />
                        )
                        break;
                    case 'percent':
                        inside = (
                            <InputNumber
                                // defaultValue={5}
                                type='number'
                                size="large"
                                style={{ width: 150 }}
                                min={0}
                                max={100}
                                step={0.1}
                                name={item.name}
                            // placeholder={item.placeholder}
                            />
                        )
                        break;

                    // case 'dependent':
                    //     inside = (

                    //         ({ getFieldValue }) =>
                    //         getFieldValue('gender') === 'other' ? (
                    //           <Form.Item
                    //             name="customizeGender"
                    //             label="Customize Gender"
                    //             rules={[
                    //               {
                    //                 required: true,
                    //               },
                    //             ]}
                    //           >
                    //           <InputNumber
                    //           type='number'
                    //           size="large"
                    //           style={{ width: 150 }}
                    //           min={0}
                    //           max={100}
                    //           step={0.1}
                    //           name={item.name}
                    //       />
                    //           </Form.Item>
                    //         ) : null
                            
                            
                            

                    //     )
                    //     break;
                    
                        default:
                        break;
                }

                return (                    
                    <Form.Item
                        name={item.name}
                        key={item.name}
                        label={item.label}
                        rules={[{ required: true }]}
                        shouldUpdate={item.type === 'dependent' ? (prevValues, currentValues) => prevValues.gender !== currentValues.gender : false}
                    >
                        {inside}

                    </Form.Item>
                )
            })

    }

    useEffect(() => {
        if (!modal) {
            form.resetFields();
        }
        form.setFieldsValue(fields)
    }, [modal])


    return (
        <Form
            name='forma'
            fields={fields}
            form={form}
            layout='vertical'
            // validateTrigger='onChange'
            hideRequiredMark
            onFieldsChange={(changedFields, allFields) => {
                onChange(allFields);
            }}
        >
            {inputFields}
        </Form>
    )
}