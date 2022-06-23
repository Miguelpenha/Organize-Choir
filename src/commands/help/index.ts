import path from 'path'
import fs from 'fs'

function help() {
    const pathReadme = path.resolve(__dirname, '..', '..', '..', 'README.md')
    const readme = fs.readFileSync(pathReadme).toString('utf-8')

    console.log(readme)
}

export default help