const XLSX = require('xlsx')
const axios = require('axios')
const fs = require("fs")

export default function read_xlsx(filename) {
	var c_list = []
	axios.get(filename, {
			responseType: 'arraybuffer'
		})
		.then((res) => {
			var data = new Uint8Array(res.data)
			var wb = XLSX.read(data, {
				type: "array"
			})
			var sheets = wb.Sheets
      //console.log(XLSX.utils.sheet_to_json(sheets['Sheet1']))
			for (let key in sheets) {
				//读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
        var json_sheets = XLSX.utils.sheet_to_json(sheets[key])
        for (var c of json_sheets) {
          c_list.push(c['character'])
        }
			}
		}).catch(err => {
			console.log(err.toString())
		})
  //console.log(c_list)
	return c_list
}

function read_fs(filename) {
  var c_list = []
  var file = fs.readFileSync(filename)
  console.log(file)
  return file
}

//export { read_xlsx }