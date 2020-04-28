const Graph  = require('../model/graph');
const csv = require('csv-parser');
const fs = require('fs');
let maxPrice = 0;


const calcDrawdown =(data={}) => {
maxPrice = Math.max(maxPrice, data.close);
const diffVal = maxPrice  - data.close;
const drawDown = -((Math.max(0, diffVal))/maxPrice)*100;


return drawDown;
}

const CsvReaderService = {
    readCsvFile: async (req, res) => {
        const results = [];
        const dataArray = [];
        const graphData =[]
         await fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            let updatedData = {...data}
            updatedData.drawDown = calcDrawdown(data);
            updatedData.date = new Date(data.date);
            results.push(updatedData)
            graphData.push({date: data.date, dropDown:  updatedData.drawDown})
            dataArray.push({date: updatedData.date, price: updatedData.close, turnover: updatedData.turnover, drawdown: updatedData.drawDown });
        
        })
        .on('end', () => {
            console.log(results);
            Graph.bulkCreate(dataArray, {
                updateOnDuplicate: ['date', 'turnover', 'drawdown']
            })

            res.status(200).json({
                message: 'Data Uploaded Successfully',
                data: graphData});
       
          })

},
getAll: async () => {
    
    const allData = await Graph.findAll();
    if(allData) {
        let result =[];
        allData.map(value => {
            result.push({date: new Date(value.date), dropDown:  value.drawdown})
        })
        return result;
    }

}
}

module.exports = CsvReaderService;
