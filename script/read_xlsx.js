const XLSX = require('xlsx')
const axios = require('axios')

function read_xlsx(filename) {
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
			for (let key in sheets) {
				//读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
				c_list.push(XLSX.utils.sheet_to_json(sheets[key]).length)
			}
		}).catch(err => {
			this.err = err
		})
	return c_list
}

module.exports = {
  read_xlsx: read_xlsx
}