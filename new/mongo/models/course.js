const mongoose = require('mongoose')

const db = require('../db.js')        // 引入数据库连接文件

// 创建 CourseSchema
const CourseSchema = new mongoose.Schema({
  scheduletime: String,
  slots:Object
})

//建立模型
const CourseModel = db.model("Course", CourseSchema)

// 导出模型
module.exports = CourseModel