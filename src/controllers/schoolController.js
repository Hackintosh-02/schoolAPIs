import School from "../models/school.model.js";
import haversine from "haversine-distance";

export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newSchool = await School.create({ name, address, latitude, longitude });
        return res.status(201).json(newSchool);
    } catch (error) {
        return res.status(500).json({ error: "Failed to add school" });
    }
};

export const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }

        const schools = await School.findAll();
        
        if(schools.length == 0){
            return res.json({error : "No schools found!"});
        }
        const sortedSchools = schools
            .map((school) => {
                const distance = haversine(
                    { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                    { lat: school.latitude, lng: school.longitude }
                );
                return { ...school.toJSON(), distance };
            })
            .sort((a, b) => a.distance - b.distance);

        return res.json(sortedSchools);
    } catch (error) {
        return res.status(500).json({ error: "Failed to list schools" });
    }
};
