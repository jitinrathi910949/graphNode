const CsvReaderService = require('../service/CsvReaderService');
const HttpStatus = require('http-status-codes');
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/')
  
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
let upload  = multer({ storage });
    upload = upload.single('file')

const CsvReaderController = {

    uploadCsvFile: async (req, res, next) => {

        try {
            upload(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    console.log("err-->> ",err);
                    
                  } else if (err) {
                    // An unknown error occurred when uploading.
                    console.log("err-->>>>",err);
                  }
            
                 
                  if(typeof(req.file)=="undefined"){
                      return res.status(422).json({msg:"Expecting a csv file",});
                  }
                  return CsvReaderService.readCsvFile(req, res);

            })
        

        //  res.status(HttpStatus.OK).json({
        //      message: "File Read successfully"
        //  })
        }
        catch(error) {
            res.status(HttpStatus.EXPECTATION_FAILED).json({
                message: "Something went wrong. Please try again"
            })
        }
            
    },
    getAll : async (req, res, next) =>{
      try {
        const result =  await CsvReaderService.getAll();
        return res.status(HttpStatus.OK).json({
          data: result,
          message: 'Data Fetched Successfully',});
      }
      catch(error) {
        res.status(HttpStatus.EXPECTATION_FAILED).json({
          message: "Something went wrong. Please try again"
        })
      }
    }
}
module.exports = CsvReaderController;