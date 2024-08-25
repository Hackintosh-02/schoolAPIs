import School from "../models/school.model.js";
import haversine from "haversine-distance";

const isValidLatitude = (latitude) => {
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
};

const isValidLongitude = (longitude) => {
    return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
};

export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validate that all fields are provided
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: "All fields (name, address, latitude, longitude) are required." });
        }
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: "Name must be a non-empty string." });
        }

        if (typeof address !== 'string' || address.trim() === '') {
            return res.status(400).json({ error: "Address must be a non-empty string." });
        }
        if (!isValidLatitude(parseFloat(latitude))) {
            return res.status(400).json({ error: "Invalid latitude. Must be a number between -90 and 90." });
        }

        if (!isValidLongitude(parseFloat(longitude))) {
            return res.status(400).json({ error: "Invalid longitude. Must be a number between -180 and 180." });
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
