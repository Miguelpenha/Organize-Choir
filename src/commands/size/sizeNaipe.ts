import path from 'path'
import fs from 'fs'
import sizeCantor from './sizeCantor'

function sizeNaipe(naipe: string) {
    try {
        const caminho = path.resolve(process.env.PROJECT_PATH, naipe)
        const cantores = fs.readdirSync(caminho)
        let sizeGeral = 0

        cantores.map(cantor => sizeGeral += sizeCantor(caminho, cantor))
        
        return sizeGeral
    } catch {
        
    }
}

export default sizeNaipe