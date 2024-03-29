import { Stadium } from "../model/model.js";

const getStadiums = async (req, res) => {
    try {
        const stadiums = await Stadium.findAll({attributes:['id', 'name']});
        res.status(200).json({
            status: "success",            
            stadiums: stadiums,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
};

const addStadium = async (req, res) => {
    const {
        name,
        no_of_rows,
        seats_per_row
    } = req.body;
    
    try{
        // Check if all fields are empty
        if(!name || !no_of_rows || !seats_per_row){
            res.status(400).json({
                status: "fail",
                message: "Please fill all fields",
            });
            return;
        }

        // Check if stadium already exists
        const stadiumExists = await Stadium.findOne({
            where: {
                name: name
            }
        });

        if (stadiumExists) {
            res.status(400).json({
                status: "fail",
                message: "Stadium already exists",
            });
            return;
        }

        let stadium = await Stadium.create({
            name,
            no_of_rows,
            seats_per_row
        });
        res.status(200).json({
            status: "success",
            stadium: stadium,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
}

export { getStadiums, addStadium };
