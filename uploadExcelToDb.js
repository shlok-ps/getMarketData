exports.uploadMultipleFiles = async (req, res) => {
	const messages = [];

	for (const file of req.files) {
        try{
            let filePath = __basedir + "/uploads/" + file.filename;
            let rows = await readXlsxFile(filePath);
    
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);
    
            // Remove Header ROW
            rows.shift();
            
            const customers = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let customer = {
                    id: rows[i][0],
                    name: rows[i][1],
                    address: rows[i][2],
                    age: rows[i][3]
                }
    
                customers.push(customer);
            }
    
            uploadResult = await Customer.bulkCreate(customers);
    
            // It will now wait for above Promise to be fulfilled and show the proper details
            console.log(uploadResult);
    
            if (!uploadResult){
                const result = {
                    status: "fail",
                    filename: file.originalname,				
                    message: "Can NOT upload Successfully",
                }
    
                messages.push(result);
            } else {
                const result = {
                    status: "ok",
                    filename: file.originalname,
                    message: "Upload Successfully!",
                }
                messages.push(result);
            }                   
        }catch(error){
            const result = {
                status: "fail",
                filename: file.originalname,				
                message: "Error -> " + error.message
            }

            messages.push(result);
        }
	}

	return res.json(messages);
}