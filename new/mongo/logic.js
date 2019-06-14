const CourseModel = require('./models/course.js')

async function SaveCourse(courseList){
	await CourseModel.deleteMany()
	let CourseEntityList = []
	courseList.forEach(course=>{
		const scheduletime = course.scheduletime
		const slots = course.slots
		const CourseEntity = new CourseModel({
			scheduletime,
			slots,
		})
		CourseEntityList.push(CourseEntity)
	})
	CourseModel.insertMany(CourseEntityList)
}

async function QueryCourse(){
    return await CourseModel.find().select({_id:0,__v:0})
}

module.exports = {
    SaveCourse,
    QueryCourse,
}