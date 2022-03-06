import { IcreatedFolders } from './types'
import path from 'path'
import fs from 'fs'

function createFolderNaipe(naipe: string): IcreatedFolders[] {
    try {
        const createdFolders: IcreatedFolders[] = []
        const caminho = path.resolve(process.env.PROJECT_PATH, naipe)

        try {
            fs.mkdirSync(caminho)

            createdFolders.push({
                path: caminho,
                created: true
            })
        } catch {
            createdFolders.push({
                path: caminho,
                created: false
            })
        }

        return createdFolders
    } catch {
        
    }
}

export default createFolderNaipe