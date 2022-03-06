import { IrenamedFiles } from './types'
import path from 'path'
import fs from 'fs'
import renameCantor from './renameCantor'

function renameNaipe(naipe: string): IrenamedFiles[] {
    try {
        const caminho = path.resolve(process.env.PROJECT_PATH, naipe)
        const cantores = fs.readdirSync(caminho)
        const renamedFiles: IrenamedFiles[] = []

        cantores.map(cantor => {
            renameCantor(caminho, cantor).map(file => 
                renamedFiles.push(file)
            )
        })

        return renamedFiles
    } catch {
        return []
    }
}

export default renameNaipe