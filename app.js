import express from "express"
import { readJSONFile, writeToFile, } from "./utils.js"
import bodyParser from "body-parser"


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/api/courses', async (req, res) => {
    const data = await readJSONFile()
    const {courses} = data
    res.json(courses);
})


app.get('/api/courses/:id', async (req, res) => {
    const data = await readJSONFile()
    let {courses} = data
    let course = courses.find(e=>{
        return e.id == parseInt(req.params.id)
    })

    course ? res.json(course) : res.send("no data found");
})


app.post('/api/courses', async (req, res) => {
    try {
        const body = req.body;
        let data = await readJSONFile()
        let { courses, id_track } = data
        const id = id_track + 1
        const newCourse = {
            id: id,
            name: body.name
        };
        courses.push(newCourse)
        data.courses = courses
        data.id_track = id
        await writeToFile(JSON.stringify(data, null, 2));
        res.json({ message: 'Success', data: newCourse });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred', details: error.message });
    }

})

app.put('/api/courses/:id', async (req, res) => {
    const data = await readJSONFile()
    let {courses, id_track} = data
    const body = req.body
    let course = ""
    courses.map(c =>{
        if(c.id === parseInt(req.params.id)){
            c.name = body.name
            course = c
        }
    })
    data.courses = courses
    await writeToFile(JSON.stringify(data, null, 2))
    res.json({ message: 'Course updated successfully', data: course })
})

app.delete('/api/courses/:id', async (req, res) => {
    const data = await readJSONFile()
    const courseId = req.params.id
    let {courses} = data
    const new_data = courses.filter(e => {
        return e.id != courseId
    })
    if (new_data.length < courses.length) {
        data.courses = new_data
        await writeToFile(JSON.stringify(data, null, 2));
        res.status(210).json({ message: 'Course deleted successfully', data: { id: courseId } })
    }
    else {
        res.status(404).json({ details: "Course not found" })
    }
})

app.listen(port, () => {
    console.log(`Week1-Intro app listening on port ${port}`)
})