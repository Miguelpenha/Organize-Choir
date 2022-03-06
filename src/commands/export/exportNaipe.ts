import fs from 'fs'
import path from 'path'

function exportNaipe(naipe: string): string[] {
    try {
        const cantoresNaipe = fs.readdirSync(path.resolve(process.env.PROJECT_PATH, naipe))
        const cantores: string[] = []

        cantoresNaipe.map(cantor => (
            fs.statSync(path.resolve(process.env.PROJECT_PATH, naipe, cantor)).isDirectory() && !cantor.includes(process.env.IGNORE_FILE) && cantores.push(cantor)
        ))

        return cantores
    } catch {

    }
}

export default exportNaipe