const fs = require('fs')
const { argv } = require("process");


const args = argv.slice(2)

fs.readFile('employees.csv', 'utf8', (err, data) => {

    const id = args[0] || undefined
    const columnName = args[1] || undefined

    if(!id){
        console.log('Employee ID is required')
        return
    }

    if(err){
        console.log(err.message)
        return
    }

    //get columns names
    const keys = data.split('\n')[0].split(',')
    
    //get array of employees' objects
    result = data.split('\n').slice(1).map(row => {

        let entries = row.split(',').map((value, index) => [keys[index], value])

        return Object.fromEntries(columnName ? entries.filter(entry => [columnName, 'id'].includes(entry[0])) : entries)
    }).filter(employee => employee.id === id)

    result = result[0]

    if(columnName && result)
        delete result.id

    if(!result){
        console.log(`Employee with id ${id} does not exist`)
        return
    }

    if(columnName && !result[columnName]){
        console.log(`Column ${columnName} does not exist`)
        return
    }

    console.log(result)
})