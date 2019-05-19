
var chalk = require('chalk')
var glob = require('glob')

process.env.PROJECT_ENV = process.argv[process.argv.length - 1]

// 获取所有的projectList
var projectList = []
var projectSrcArray = glob.sync('./src/projects/*')
for (var x in projectSrcArray) {
    projectList.push(projectSrcArray[x].split('/')[3])
}
// 检测是否在输入的参数是否在允许的list中
var checkProject = function () {
    var project = process.env.PROJECT_ENV
    var checkTag = true

    // 检查projectList是否有重复
    var hash = {}
    var repeatList = []
    for (var l = 0; l < projectList.length; l++) {
        if (hash[projectList[l]]) {
            repeatList.push(projectList[l])
        }
        hash[projectList[l]] = true
    }
    if (repeatList.length > 0) {
        console.log(chalk.red('projectList 有重复：'))
        console.log(chalk.red(repeatList.toString()))
        checkTag = false
    }

    if(!process.env.PROJECT_ENV) {
        console.log(chalk.red(`参数错误，没有指定项目名!`))
        checkTag = false
    }

    if (projectList.indexOf(project) === -1) {
        console.log(chalk.red(`参数错误，没有找到指定的项目名：${project}`))
        checkTag = false
    }
    
    if(!checkTag){
        process.exit(1)
    }
}

exports.projectList = projectList
exports.checkProject = checkProject
